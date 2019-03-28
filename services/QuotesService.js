const sha256 = require('sha256')

const QuotesService = (QuotesRepository, BlockChainService, HashesService, QuotesPublisher, Logger) => ({
  getUnhashedQuotesAndWriteThemToBlockchain: async () => {
    logger.info('Looking up new unhashed transactions...')
    const unhashedQuotes = await QuotesRepository.findAllUnhashedQuotes()

    if (unhashedQuotes.length === 0) {
      logger.info('No unhashed transactions found...')
      return
    }

    logger.info('Calculating hash...')
    const hash = sha256(unhashedQuotes.reduce((acc, val) => acc + JSON.stringify(val)))
    logger.info('Writing hash to db... ', hash)
    const hashId = await HashesService.createHash(hash) 

    logger.info('Writing hash to blockchain...', hash, hashId)
    const transaction = await BlockChainService.writeHashToBlockChain(hash, hashId)
    logger.info('Transaction: ', transaction)

    logger.info('Updating quotes hash value...')
    const quotesIds = unhashedQuotes.map(quote => quote.id)
    await QuotesRepository.updateHashes(quotesIds, hashId)

    const updatedQuotes = await QuotesRepository.findQuotesByHashId(hashId)
    return QuotesPublisher.send(updatedQuotes)
  }
})

module.exports = QuotesService
const sha256 = require('sha256')

const QuotesService = (QuotesRepository, BlockChainService, HashesService) => ({
  getUnhashedQuotesAndWriteThemToBlockchain: async () => {
    console.log('Looking up new unhashed transactions...')
    const unhashedQuotes = await QuotesRepository.findAllUnhashedQuotes()

    if (unhashedQuotes.length === 0) {
      console.log('No unhashed transactions found...')
      return
    }

    console.log('Calculating hash...')
    const hash = sha256(unhashedQuotes.reduce((acc, val) => acc + JSON.stringify(val)))
    console.log('Writing hash to db... ', hash)
    const hashId = await HashesService.createHash(hash) 

    console.log('Writing hash to blockchain...', hash, hashId)
    const transaction = await BlockChainService.writeHashToBlockChain(hash, hashId)
    console.log('Transaction: ', transaction)

    console.log('Updating quotes hash value...')
    const quotesIds = unhashedQuotes.map(quote => quote.id)
    return QuotesRepository.updateHashes(quotesIds, hashId)
  }
})

module.exports = QuotesService
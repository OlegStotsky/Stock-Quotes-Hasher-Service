const sha256 = require('sha256')

const QuotesService = (QuotesRepository, BlockChainService, HashesService) => ({
  getUnhashedQuotesAndWriteThemToBlockchain: async () => {
    const unhashedQuotes = await QuotesRepository.findAllUnhashedQuotes()

    const hash = sha256(unhashedQuotes.reduce((acc, val) => acc + JSON.stringify(val)))
    const hashId = await HashesService.createHash(hash) 

    await BlockChainService.writeHashToBlockChain(hash, hashId)

    const quotesIds = unhashedQuotes.map(quote => quote.id)
    return QuotesRepository.updateHashes(quotesIds, hashId)
  }
})

module.exports = QuotesService
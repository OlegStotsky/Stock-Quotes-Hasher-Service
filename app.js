const Application = (QuotesService) => ({
  start: () => {
    setInterval(QuotesService.getUnhashedQuotesAndWriteThemToBlockchain, 1000*10)
  }
})

module.exports = Application
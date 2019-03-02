const recursiveTimeout = async (fn, timeout) => {
  await fn()
  setTimeout(fn, 1000)
}

const Application = (QuotesService) => ({
  start: () => {
    recursiveTimeout(QuotesService.getUnhashedQuotesAndWriteThemToBlockchain, 1000*10)
  }
})

module.exports = Application
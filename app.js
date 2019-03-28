const recursiveTimeout = async (fn, timeout) => {
  await fn()
  setTimeout(() => recursiveTimeout(fn, timeout), timeout)
}

const Application = (QuotesService) => ({
  start: () => {
    recursiveTimeout(QuotesService.getUnhashedQuotesAndWriteThemToBlockchain, 1000*10)
  }
})

module.exports = Application

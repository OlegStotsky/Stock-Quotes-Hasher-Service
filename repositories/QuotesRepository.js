const QuotesRepository = (db, formatter, HashesRepository) => ({
  findAllUnhashedQuotes: async () => {
    const query = 'SELECT * FROM Quote WHERE hash_id IS NULL'
    const result = await db.query(query)

    return result
  },

  updateHashes: async (quotesIds, hashId) => { 
    const rawQuery = `UPDATE Quote SET hash_id = ? WHERE id IN (${quotesIds.join(',')})`
    const formattedQuery = formatter.format(rawQuery, [hashId])

    return db.query(formattedQuery)
  }
})

module.exports = QuotesRepository
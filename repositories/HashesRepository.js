const HashesRepository = (db, formatter) => ({
  insertOne: (hash) => {
    const rawQuery = 'INSERT INTO Hash(val) VALUES(?)'
    const formattedQuery = formatter.format(rawQuery, [hash])

    return db.query(formattedQuery)
  }
})

module.exports = HashesRepository
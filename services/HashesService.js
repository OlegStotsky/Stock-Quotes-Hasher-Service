const HashService = (HashRepository) => ({
  createHash: (hash) => {
    return HashRepository.insertOne(hash).then(({ insertId }) => insertId)
  }
})

module.exports = HashService
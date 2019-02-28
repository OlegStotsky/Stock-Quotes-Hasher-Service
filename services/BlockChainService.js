const BlockChainService = (eosjs) => ({
  writeHashToBlockChain: (hash, id) => {
    return eosjs.transaction({
      actions: [{
        account: 'quoteshashes',
        name: 'upsert',
        authorization: [{
          actor: 'quoteshashes',
          permission: 'active'
        }],
        data: {
          id,
          hash 
        }
      }]
    })
  }
})

module.exports = BlockChainService
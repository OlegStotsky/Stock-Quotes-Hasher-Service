const BlockChainService = (eosjs) => ({
  writeHashToBlockChain: (hash, id) => {
    return eosjs.transaction({
      actions: [{
        account: 'trulynewhash',
        name: 'upsert',
        authorization: [{
          actor: 'trulynewhash',
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
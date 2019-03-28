const amqplib = require('amqplib')
const mysql = require('mysql')
const Eosjs = require('eosjs')
const util = require('util')

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
})
connection.connect()
connection.query = util.promisify(connection.query)

const eosjs = Eosjs({
  chainId: process.env.EOS_CHAIN_ID, 
  keyProvider: [process.env.EOS_PRIVATE_KEY],
  httpEndpoint: process.env.EOS_NODE_URL,
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  sign: true
})

const BlockChainService = require('./services/BlockChainService')(eosjs)

const HashesRepository = require('./repositories/HashesRepository')(connection, mysql)
const HashesService = require('./services/HashesService')(HashesRepository)

const Logger = require('./logger')

amqplib.connect('amqp://quotes-message-queue').then(rabbitMQConnection => {
  const QuotesPublisherKlass = require('./publishers/QuotesPublisher')
  const QuotesPublisher = new QuotesPublisherKlass(rabbitMQConnection)
  
  const QuotesRepository = require('./repositories/QuotesRepository')(connection, mysql)
  const QuotesService = require('./services/QuotesService.js')(QuotesRepository, BlockChainService, HashesService, QuotesPublisher, Logger)
  
  const Application = require('./app')(QuotesService)
  
  Application.start()
})

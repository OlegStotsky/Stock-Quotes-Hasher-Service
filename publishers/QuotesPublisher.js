class QuotesPublisher {
  constructor(rabbitMQConnection) {
    this.connection = rabbitMQConnection
  }

  async send(data) {
    const channel = await this.connection.createChannel()
    const doesChannelExist = await channel.assertQueue('quotes')

    return channel.sendToQueue('quotes', Buffer.from(JSON.stringify(data)))
  }
}

module.exports = QuotesPublisher
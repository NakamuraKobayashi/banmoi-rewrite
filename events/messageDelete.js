function messageDelete (message) {
    let banmoi = message.client;

    banmoi.snipes.set(
        message.channel.id,
        {
            content: message.content, //snipe the message that was deleted
            author: message.author, //get the message author the the deleted message
            image: message.attachments.first() ? message.attachments.first().proxyURL : null //get the deleted image if there is one
        }
    )
}

module.exports = {
    name: "messageDelete",
    func: messageDelete
}
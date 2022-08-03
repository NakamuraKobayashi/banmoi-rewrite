const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'snipe', //name of the command
    description: 'Xem tin nhắn xóa gần đây',
    userPerms: ["SEND_MESSAGES"],
    clientPerms:['EMBED_LINKS'],
    run: async(client, message, args) => {
        const msg = client.snipes.get(message.channel.id) //find the deleted message in message channel
        if(!msg) {
            return message.channel.send("⁉️| Không thấy tin nhắn nào!")
            .then(message => {setTimeout(() => message.delete(), 3000)
        
            })
        } //if there is no deleted message, return this msg

        const embed = new MessageEmbed()
        .setDescription(`**Đã tìm thấy ở <#${message.channel.id}>**\n\n` + '> Bởi: ' + `${msg.author}` + '\n > Nội dung: \n' + msg.content)
        .setTimestamp()
        .setColor("RANDOM")

        if(msg.image) embed.setImage(msg.image) //if the deleted message has image, then set the image in the embed to it
        let msg1 = await message.channel.send({ embeds: [embed] })
        await msg1.react("❌")
        .then(async(message) => {
        
        
        let collector = msg1.createReactionCollector(
          (reaction, user) => user.id === message.author.id
        );
        collector.on("collect", async (reaction, user) => {
          if (reaction._emoji.name === "❌") {
            return msg1.delete();
          }
        })
        })
        
        
    }
}

const { MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js")


module.exports = {
 name: 'avatar',
 description: "Lấy avatar",
 aliases: ['avt'],
category: 'Thông tin ℹ',
options: [
    {
        name: "user",
        description: "What bug are u reporting?",
        type: "USER",
        required: true,
    }
],
 run: async(client, interaction, args) => {
 
 let user = interaction.options.getMember("user")
 let embed = new MessageEmbed()
 .setAuthor(`Avatar của ${user.name}`)

 .addField('PNG', `\n[\`LINK\`](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })})`, true, true)
 .addField('JPG', `\n[\`LINK\`](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "jpg" })})`, true, true)
 .addField('WEBP', `\n[\`LINK\`](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "webp" })})`, true, true)

 .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
 .setThumbnail(interaction.guild.iconURL())
 .setColor('RANDOM')
 .setTimestamp()
 interaction.reply({ embeds: [embed]})
    }
}
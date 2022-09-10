const { MessageEmbed } = require("discord.js")
const pm = require('ms');

module.exports = {

  name: "ping",
  description: "Check ping bot và nhiều thứ khác",



  run: async function(client, interaction, args) {

    const msg = await interaction.reply("<a:load:1003146806496067654> | Checking...");

     const botLatency = pm(interaction.createdTimestamp)
    const shardLatency = pm(interaction.guild.shard.ping);


    const embed = new MessageEmbed()
      .setAuthor('🏓 | Pong!')
      .addFields({
        name: 'Message Latency',
        value: `\`\`\`prolog\n${botLatency}\`\`\``,
        inline: true
      }, {
        name: `Shard | ${interaction.guild.shard.id} Latency`,
        value: `\`\`\`prolog\n${shardLatency}\`\`\``,
        inline: true
      }, {
        name: 'Websocket ping',
        value: `\`\`\`prolog\n${client.ws.ping}\`\`\``,
        inline: true
      })
      .setColor(`#b89653`)
setTimeout(() => {

    interaction.editReply({ embeds: [embed], allowedMentions : {parse: []} })
},1000)
  }
}
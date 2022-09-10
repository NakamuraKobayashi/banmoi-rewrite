const { MessageEmbed } = require("discord.js")
const pm = require('ms');

async function ping(client, message, args) {

    const msg = await message.channel.send("<a:load:1003146806496067654> | Checking...");

    const botLatency = pm(msg.createdTimestamp - message.createdTimestamp)
    const shardLatency = pm(message.guild.shard.ping);

    message.react('🏓')

    const embed = new MessageEmbed()
        .setAuthor('🏓 | Pong!')
        .addFields(
            {
                name: 'Message Latency',
                value: `\`\`\`prolog\n${botLatency}\`\`\``,
                inline: true
            },
            {
                name: `Shard | ${message.guild.shard.id} Latency`,
                value: `\`\`\`prolog\n${shardLatency}\`\`\``,
                inline: true
            },
            {
                name: 'Websocket ping',
                value: `\`\`\`prolog\n${client.ws.ping}\`\`\``,
                inline: true
            }
        )
        .setColor(`#b89653`)

    setTimeout(() => {
        msg.delete()
        message.reply({ embeds: [embed], allowedMentions : {parse: []} })
    }, 1000)
}

module.exports = {
    name: "ping",
    description: "Check ping bot và nhiều thứ khác",
    categories:'latvat',
    aliases:['p'],
    userPerms: ["SEND_MESSAGES"],
    clientPerms:['EMBED_LINKS'],
    run: ping
}
const { MessageEmbed } = require("discord.js");

async function ban(client, message, args) {
    try {

        if (!args[0]) {
            return message.reply(`**Hãy đề cập một người dùng bạn muốn Cấm khỏi máy chủ**`)
                .then(message => {
                    setTimeout(() => message.delete(), 3000);
                })
        }
        
        let banMember =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
            ) ||
            message.guild.members.cache.find(
                ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
            );

        if (!banMember) {
            return message.reply(`**Người này không có trong máy chủ này**`)
                .then(message => {
                    setTimeout(() => message.delete(), 3000);
                })
        }

        if (banMember === message.member) {
            return message.reply(`**Người này không có trong máy chủ này**`)
                .then(message => {
                    setTimeout(() => message.delete(), 3000);
                })
        }

        const reason = args.slice(1).join(" ");

        if (!banMember.bannable) {
            return message.reply(`**Không thể cấm người này**`)
                .then(message => {
                    setTimeout(() => message.delete(), 3000);
                })
        }

        try {
            message.guild.members.ban(banMember);
            banMember
                .send(
                    "Xin chào, bạn đã bị Cấm khỏi máy chủ **" +
                    message.guild.name +
                    "\nLý do - **" +
                    reason || 'Không có lý do hoặc có thể là bạn đen hoặc do nhầm lẫn :D'
                )
                .catch(() => null);
        } catch {
            message.guild.members.ban(banMember);
        }

        if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                    `**${banMember.user.username}** đã bị Cấm khỏi máy chủ, lý do: ${reason}`
                );
            message.channel.send({embeds:[sembed]});
        } else {
            let sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** Đã bị Cấm khỏi máy chủ`);
            message.channel.send({embeds:[sembed2]});
        }

        let channel = await client.data.fetch(`modlog_${message.guild.id}`);

        if (channel == null) return;
        if (!channel) return;

        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField(`**Lệnh**`, "BAN")
            .addField(`**Người bị cấm**`, banMember.user.username)
            .addField(`**ID**`, `${banMember.id}`)
            .addField(`**Người cấm**`, message.author.username)
            .addField(`**Lý do**`, `${reason || log.noReason}`)
            .addField(`**Ngày**`, `<t:${parseInt(message.createdTimestamp / 1000)}:R>`)
            .setTimestamp();

        let sChannel = message.guild.channels.cache.get(channel);
        if (!sChannel) return;

        sChannel.send({embeds:[embed]});
    } catch (e) {
      return message.channel.send(`**${e.message}**`);
    }
}

module.exports = {
    name: "ban",
    aliases: ["b", "banish"],
    category: "moderation",
    description: "Cấm một ai đó ra khỏi máy chủ",
    usage: "ban <@user> <reason>",
    args: true,
    userPerms: ["BAN_MEMBERS",'MODERATE_MEMBERS','ADMINISTRATOR'],
    clientPerms:['BAN_MEMBERS','MODERATE_MEMBERS','ADMINISTRATOR'],
    run: ban
};

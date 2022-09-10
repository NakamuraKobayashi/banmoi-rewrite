const {MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ban',
    description: 'Ban người nào đó ra khỏi server',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Lý do ban',
            type: 'STRING',
            require: false,
        },
        {
            name: 'days',
            description: 'Ngày xoá tin nhắn',
            type: 'INTEGER',
            minValue: 0,
            maxValue: 7,
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply('> Bạn không có quyền ban!');
        const member = interaction.options.getUser('user');
        if (member.id === interaction.member.id) return interaction.reply('Bạn không thể ban chính mình');
        const reason = interaction.options.getString('reason');
        const days = interaction.options.getInteger('days');
        const mentionedPosition = member.roles.highest.position //the highest role of the mentioned member
        const memberPosition = interaction.member.roles.highest.position //highest role of you
        const botPosition = interaction.guild.me.roles.highest.position
        if(memberPosition <= mentionedPosition) { //if your role is lower or equals to the mentioned member u wanna ban
            const banErr = new MessageEmbed()
            .setDescription('**Bạn không thể ban user này vì có role cao hơn hoặc bằng bạn!**')
            return interaction.reply({ embeds: [banErr] })
        }
        try {
            interaction.guild.members.ban(member.id, { reason, days })
            interaction.reply(`> Đã ban thành công ${member} vì lí  do ${reason||'Không cung cấp'}`)
            await member.send(`> Bạn đã bị ban khỏi ${interaction.guild.name}\n Vì:${reason||'Không có lí do'}`)
        } catch (err) {
            interaction.reply('Có lỗi khi ban!');
            console.error(err);
        }
    },
};
const {MessageEmbed } = require("discord.js");

module.exports = {
    name: 'timeout',
    description: 'Đặt thời gian chờ cho một thành viên',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn đặt thời gian chờ',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Lý do đặt thời gian chờ',
            type: 'STRING',
            require: false
        },
        {
            name: 'time',
            description: 'Thời gian chờ',
            type: 'NUMBER',
            require: true,
            choices: [
                {
                    name: "1 phút",
                    value: 60
                },
                {
                    name: "5 phút",
                    value: 300
                },
                {
                    name: "10 phút",
                    value: 600
                },
                {
                    name: "1 giờ",
                    value: 3600
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply('> Bạn không có quyền sử dụng lệnh này!');
        const member = interaction.options.getUser('user');
        if (member.id === interaction.member.id) return interaction.reply('Bạn không thể đặt thời gian chờ chính mình');
        const reason = interaction.options.getString('reason');
        const time = interaction.options.getInteger('time');
        const mentionedPosition = member.roles.highest.position //the highest role of the mentioned member
        const memberPosition = interaction.member.roles.highest.position //highest role of you
        const botPosition = interaction.guild.me.roles.highest.position
        if(memberPosition <= mentionedPosition) { //if your role is lower or equals to the mentioned member u wanna ban
            const banErr = new MessageEmbed()
            .setDescription('**Bạn không thể đặt thời gian chờ người dùng này vì có vai trò cao hơn hoặc bằng bạn!**')
            return interaction.reply({ embeds: [banErr] })
        }
        try {
            interaction.member.timeout(time * 60 * 1000, reason)
            interaction.reply(`> Đã đặt thời gian chờ cho ${member} vì lí do: **${reason||'Không cung cấp'}**`)
            await member.send(`> Bạn đã bị vào trạng thái thời gian chờ trong máy chủ **${interaction.guild.name}**\n Vì:**${reason||'Không có lí do'}**`)
        } catch (err) {
            interaction.reply('Đã xảy ra lỗi khi đặt thời gian chờ!');
            console.error(err);
        }
    },
};
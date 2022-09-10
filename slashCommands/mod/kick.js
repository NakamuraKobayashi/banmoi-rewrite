const {MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'Kick người nào đó ra khỏi server',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Lý do kick',
            type: 'STRING',
            require: false,
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.followUp('❌|Bạn không có quyền kick!');
        const user = interaction.options.getUser('user');
        if (user.id === interaction.user.id) return interaction.followUp('Bạn không thể kick chính mình');
        const reason = interaction.options.getString('reason');
        const kick = new MessageEmbed()
        .setDescription(`Đã kick thành công ${user}\n Vì:\`${reason|'Không có lí do'}\``)
        try {
            interaction.guild.members.kick(user.id, reason);
            interaction.followUp('Thao tác thành công!');
        } catch (err) {
            interaction.reply('❌|Có lỗi khi kick!');
            console.error(err);
        }
    },
};
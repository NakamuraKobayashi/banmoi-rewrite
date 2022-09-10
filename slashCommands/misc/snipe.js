const { MessageEmbed,MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    name: 'snipe', //name of the command
    description: 'Xem tin nhắn xóa gần đây',
    userPerms: ["SEND_MESSAGES"],
    clientPerms:['EMBED_LINKS'],
    run: async(client, interaction, args) => {
        const msg = client.snipes.get(interaction.channel.id) //find the deleted message in message channel
        if(!msg) {
            return interaction.reply({content:"⁉️| Không thấy tin nhắn nào!",ephemeral: true})
           
        }

        const embed = new MessageEmbed()
        .setDescription(`> **Đã tìm thấy ở <#${interaction.channel.id}>**\n\n` + '> Bởi: ' + `${msg.author}` + '\n > Nội dung: \n' + msg.content)
        .setTimestamp()
        .setColor("RANDOM")

        if(msg.image) embed.setImage(msg.image) 
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('xd')
					.setLabel('🗑️')
					.setStyle('PRIMARY'),
			);
        const message= await interaction.channel.send({ embeds: [embed],components: [row] })
        
        await interaction.reply({content:`✅|Thao tác thành công\n React vào \`🗑️\` để xóa`,ephemeral: true})
        
        const collector = message.createMessageComponentCollector({ componentType: 'BUTTON' });
        collector.on('collect', i => {
            if (i.user.id === interaction.user.id) {
               message.delete()
            } else {
                i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
        });
    }
}

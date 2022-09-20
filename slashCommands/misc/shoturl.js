let fetch = require("node-fetch");
let Discord= require("discord.js");
module.exports = {
        name: "shorturl",
        usage: `shorturl <url>`,
        options: [
            {
                name: 'query',
                description: 'Link',
                type: 'STRING',
                required: true,
            }
          ],
        run: async (client, message, args) => {
        
//code

const url = interaction.options.getString('query');
const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
		const body = await res.text();
		if(body === `Hãy đưa một link để rút gọn`){
			return interaction.reply(`Hãy đưa một link để rút gọn`);
		}

		
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Click vào đây!')
                .setStyle('LINK'),
        );
const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setDescription(body)
            .addFields(
                {name:'Click vào link để đi đến',value:body,inline:true}
            )
   
    interaction.reply({embeds:[embed],components: [row]})
}}
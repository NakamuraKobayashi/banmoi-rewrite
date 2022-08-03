let fetch = require("node-fetch");
let Discord= require("discord.js");
module.exports = {
        name: "shorturl",
        usage: `shorturl <url>`,
        category: "misc",
        description: "",
        premium: true,
        userPerms: ["SEND_MESSAGES"],
    clientPerms:['EMBED_LINKS'],
        args: true,
        run: async (client, message, args) => {
        //const server_lang = await client.data.get(`serverlang_${message.guild.id}`);
        //const lang = require(`../../language/${server_lang || "vi"}/misc/shorturl.json`);
//code
const url = args.join(" ")

const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
		const body = await res.text();
		if(!url){
			return message.channel.send(`Hãy đưa một link để rút gọn`);
		}

		
const row = new Discord.MessageActionRow()
.addComponents(
    new Discord.MessageButton()
        .setStyle('LINK')
        .setEmoji('🔗')
        .setLabel(`Nhấn vào đây`)
        .setURL(body)
)
const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setDescription(body);
		 
    await message.channel.send(
        {embeds:[embed],
        components:[row]}
        )
          
            

}}
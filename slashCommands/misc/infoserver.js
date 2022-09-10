const {MessageEmbed} = require('discord.js');
const moment = require("moment")
module.exports = {
    name: 'serverinfo',
    description: 'serverinfo command',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
     run: async(client, interaction, args) => {
        let boosts = interaction.guild.premiumSubscriptionCount;
        var boostlevel = 0;
        if (boosts >= 2) boostlevel = "1";
        if (boosts >= 7) boostlevel = "2";
        if (boosts >= 14) boostlevel = "3 / ∞";
  

       interaction.followUp({
         embeds: [
           new MessageEmbed()
             .setThumbnail(interaction.guild.iconURL())
             .addField("Owner", `\`${(await interaction.client.users.fetch(interaction.guild.ownerId)).tag}\``, true)
            .addField("Số Boosts", "\`" + interaction.guild.premiumSubscriptionCount + "\`", true)
            .addField("Boost-Level", "\`" + boostlevel + "\`", true)
             .addField(
                `ℹ️Thông tin member`,
                `Tổng: \`${interaction.guild.memberCount}\` \n<:member:997674256051748894>Số người: \`${
                  interaction.guild.members.cache.filter((member) => !member.user.bot).size
                }\` \n<:Bot:999512321120551102>Bots: \`${
                  interaction.guild.members.cache.filter((member) => member.user.bot).size
                }\``
              )
             .addField("<:emoji:997675986743201913>Emojis: ", "\`" + interaction.guild.emojis.cache.size + "\`", true)
            .addField("<:Role:999931256953372762>Roles: ", "\`" + interaction.guild.roles.cache.size + "\`", true)
            .addField("<:channel:997674645933269033>Số kênh", "\`" + interaction.guild.channels.cache.size + "\`", true)
            .addField("<:ChannelText:999502503903236137>Kênh Văn Bản", "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size + "\`", true)
            .addField("<:voice:999502505555787826>Kênh Thoại", "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size + "\`", true)
            .addField("Ngày tạo:", "\`" + moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(interaction.guild.createdTimestamp).format("hh:mm:ss") +"`", true)
             .setColor("BLUE")
             .setFooter(
               `Requested by ${interaction.user.tag}`,
               interaction.user.displayAvatarURL({ dynamic: true })
             ),
         ],
       });
     }
}
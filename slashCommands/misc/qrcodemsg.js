const Color = "RANDOM", Discord = require("discord.js");

module.exports = {
  name: "qr",
  aliases: ["qrcode", "qr-code"],
  category: "misc",
  options: [
    {
        name: 'query',
        description: 'Gửi lại ảnh QR cho text hoặc ảnh bạn gửi!',
        type: 'STRING',
        required: true,
    }
  ],
  description: "Gửi lại ảnh QR cho text hoặc ảnh bạn gửi!",

  run: async (client, interaction, args) => {
    const text = interaction.options.getString('query');
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(encodeURI(`https://chart.googleapis.com/chart?chl=${text}&chs=200x200&cht=qr&chld=H%7C0`))
    .setTimestamp();


    return interaction.reply({embeds:[Embed]});
  }
};
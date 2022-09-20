const Discord = require("discord.js");

async function qr(client, message, args) {
    const Msg = args.join("+");
    const Embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(encodeURI(`https://chart.googleapis.com/chart?chl=${Msg}&chs=200x200&cht=qr&chld=H%7C0`))
        .setTimestamp();

    message.delete()

    return message.channel.send({embeds:[Embed]});
}

module.exports = {
    name: "qr",
    aliases: ["qrcode", "qr-code"],
    category: "misc",
    userPerms: ["SEND_MESSAGES"],
    clientPerms:['EMBED_LINKS'],
    args: true,
    premium: true,
    description: "Gửi lại ảnh QR cho text hoặc ảnh bạn gửi!",
    usage: "qr <nội_dung_tin_nhắn>",
    run: qr
};
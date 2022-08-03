
const db = require("quick.db");

module.exports = {
  name: "length",
  category: "misc",
  description: "Độ dài lệnh :/",
  usage: "length <msg>",
  args: true,
  userPerms: ["SEND_MESSAGES"],
    clientPerms:['EMBED_LINKS'],
  run: async (client, message, args, del, member) => {
    //const server_lang = await client.data.get(`serverlang_${message.guild.id}`);
    //const lang = require(`../../language/${server_lang || "vi"}/misc/length.json`);
    message.delete();
    const usa = args.join(" ");
    if (!usa)
      return message.channel
        .send(`${message.author}, ${lang.missingArgument}`)
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
    return message.channel.send(`Độ dài chuỗi từ: \`${args.join(" ").length}\``);
  }
};
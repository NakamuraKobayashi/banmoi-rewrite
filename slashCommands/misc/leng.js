
const db = require("quick.db");

module.exports = {
  name: "length",
  category: "misc",
  description: "Độ dài lệnh :/",
  usage: "length <msg>",
  args: true,
  options: [
    {
        name: 'query',
        description: 'Nội dung muốn đo',
        type: 'STRING',
        required: true,
    }
  ],
  run: async (client, interaction, args) => {
    const e =  args
    .join(" ")
    .length
    return interaction.reply(`độ dài : \`${e}\``);
  }
};

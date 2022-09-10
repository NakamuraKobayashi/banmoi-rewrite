

const mapping = {
  " ": "   ",
  "0": ":zero:",
  "1": ":one:",
  "2": ":two:",
  "3": ":three:",
  "4": ":four:",
  "5": ":five:",
  "6": ":six:",
  "7": ":seven:",
  "8": ":eight:",
  "9": ":nine:",
  "!": ":grey_exclamation:",
  "?": ":grey_question:",
  "#": ":hash:",
  "?": ":grey_question:",
  "*": ":asterisk:",
  "đ":'<:d_:1017988564161663027>'
};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

module.exports = {
name: "emojify",
usage: " <text>",
options: [
  {
      name: 'query',
      description: 'Nội dung muốn chuyển thành emoji',
      type: 'STRING',
      required: true,
  }
],
  description: "Trả về văn bản đã cung cấp ở dạng biểu tượng cảm xúc||Có dùng Tiếng Việt nhưng không dấu 🐧||.",
  run: async (client, interaction,args) => {
  const e =  args
        .join(" ")
        .split("")
        .map(c => mapping[c] || c)
        .join("")
    

    interaction.reply(
      e
    );
  }
};
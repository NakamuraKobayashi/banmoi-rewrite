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
    "*": ":asterisk:"
};

const normal_latin = "abcdefghijklmnopqrstuvwxyz".split()

async function emojify(client, message, args) {
    await message.delete();

    let result = "";

    for (let c of args.join(" ").split("")) {
        if (mapping[c]) {
            result += mapping[c];
            continue;
        }

        if (c in normal_latin) {
            result += ` :regional_indicator_${c}:`;
        }
    }

    message.channel.send(result);
}

module.exports = {
    name: "emojify",
    aliases: [],
    category: "misc",
    usage: "emojify <text>",
    userPerms: ["SEND_MESSAGES"],
    clientPerms:['EMBED_LINKS'],
    args: true,
    description: "Trả về văn bản đã cung cấp ở dạng biểu tượng cảm xúc.",
    run: emojify
};

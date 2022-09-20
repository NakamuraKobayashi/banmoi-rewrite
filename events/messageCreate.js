async function messageCreate(message) {
    if (message.author.bot) return;

    let banmoi = message.client;
    const prefix = 'moi!';

    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length == 0) return;
    let command = banmoi.commands.get(cmd);
    if (!command) command = banmoi.commands.get(banmoi.aliases.get(cmd));


    if (command.ownerOnly) {
        if(!banmoi.config.OWNERID.includes(message.author.id)) {
            return message.reply(`${message.member} You can't access owner commands`);
        }
    } 

    if (!message.member.permissions.has(command.userPerms || [])) return message.channel.send(`Bạn không có quyền \`${command.userPerms || []}\` để dùng lệnh này`)

    if (!message.guild.me.permissions.has(command.banmoiPerms || [])) return message.channel.send(`Bot không đủ quyền  \`${command.banmoiPerms || []}\` để thực thi lệnh`)

    try {
        command.run(banmoi, message, args, prefix)
    }
    catch (error) {
        console.log(error)
        // lmeo lỗi code kìa haha
        // no need anticrash.js anymore
    }
}

module.exports = {
    name: "messageCreate",
    func: messageCreate
}
const client = require('../index.js');
// const db = require('../database');
const {Collection} = require('discord.js')
client.on('messageCreate', async message => {
if(message.author.bot) return;


  const prefix = 'moi!';


  if(!message.content.startsWith(prefix)) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));

      if(command) {
        //OWNER ONLY
        if(command.ownerOnly) {
          if(!client.config.OWNERID.includes(message.author.id)) {
            message.reply(`${message.member} You can't access owner commands`)
            return;
          }
        } 
    }
    if(command) {

      //USER PERMISSION
      if(!message.member.permissions.has(command.userPerms || [])) return message.channel.send(`Bạn không có quyền \`${command.userPerms || []}\` để dùng lệnh này`)
  
      //BOT PERMISSION
      if(!message.guild.me.permissions.has(command.clientPerms || [])) return message.channel.send(`Bot không đủ quyền  \`${command.clientPerms || []}\` để thực thi lệnh`)
  
    }

  try {
    command.run(client, message, args, prefix)
  }
  catch (error) {
    console.log(error)
    // lmeo lỗi code kìa haha
    // no need anticrash.js anymore
  }
}
);

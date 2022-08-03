const { Client,Collection, Discord } = require('discord.js')

const fs = require('fs')
const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    shards: 'auto',
      intents: 32767, allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
  });
  const dotenv = require('dotenv')
const envFile = dotenv.config()


const token = process.env['token']
  
  module.exports = client;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.interactions = new Collection()
client.slashCommands = new Collection();
client.anticrash = new Collection();
client.config = require('./config.json');
client.events = new Collection();
// require("./handlers")(client);
['command','anticrash','slashCommand'].forEach(handler => require(`./handlers/${handler}`)(client))

client.snipes = new Map() //create a new map
client.on('messageDelete', function(message, channel) {
  client.snipes.set(message.channel.id, { //get the channel of message
    content: message.content, //snipe the message that was deleted
    author: message.author, //get the message author the the deleted message
    image: message.attachments.first() ? message.attachments.first().proxyURL : null //get the deleted image if there is one
  })
})
client.login(token);
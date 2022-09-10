
const { MessageEmbed } = require("discord.js")
const prettyMilliseconds = require('ms');
const fetch = require('node-fetch');
const db = require('quick.db')
const client = require("../index");

client.on("interactionCreate", async (interaction) => {

    if (interaction.isCommand()) {
        

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Đã gặp lỗi vui lòng thử lại!" });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        
  if (interaction.isButton()){
    


    // Context Menu Handling
    if (interaction.isContextMenu()) {
       
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
}

const fetchBlacklist = await db.get(`blacklist_${interaction.user.id}`) // fetch the interaction user if they are blacklisted

if(fetchBlacklist) {
    return interaction.reply({ content: `> **Sorry <@${interaction.user.id}> but you are currently blacklisted from using this bot**`})
}
        cmd.run(client, interaction, args);
    }
  })

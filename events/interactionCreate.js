async function interactionCreate(interaction) {
    // Slash Command Handling

    let banmoi = interaction.client;

    if (interaction.isCommand()) {
            await interaction.deferReply({ ephemeral: false }).catch(() => {});

            const cmd = banmoi.slashCommands.get(interaction.commandName);
            if (!cmd) return interaction.followUp({ content: "Đã gặp lỗi vui lòng thử lại!" });

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

        if (interaction.isButton()) {
            const Reds = ["memes"];
            switch (interaction.customId) {
                case 'nextMeme': {
                    const Rads = Reds[Math.floor(Math.random() * Reds.length)];
                    const res = await fetch(`https://www.reddit.com/r/${Rads}/random/.json`);
                    const json = await res.json();
                    if (!json[0]) return interaction.followUp(`Testing`);
                    const data = json[0].data.children[0].data;

                    const meme_but = new MessageEmbed()
                        .setColor('RANDOM')
                        .setURL(`https://reddit.com${data.permalink}`)
                        .setTitle(data.title)
                        .setDescription(`Author : ${data.author}`)
                        .setImage(data.url)
                        .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
                        .setTimestamp();

                    const meme_butt = new MessageButton();
                    meme_butt.setLabel('Next Meme');
                    meme_butt.setCustomId('nextMeme');
                    meme_butt.setStyle('SUCCESS');

                    const row = new MessageActionRow().addComponents(meme_butt);

                    interaction.reply({ embeds: [meme_but], components: [row] });
                }
            }

            // Context Menu Handling
            if (interaction.isContextMenu()) {
                await interaction.deferReply({ ephemeral: false });
                const command = banmoi.slashCommands.get(interaction.commandName);
                if (command) command.run(banmoi, interaction);
            }
        }

        // see events/messageCreate.js L:38
        try {
            cmd.run(banmoi, interaction, args);
        }
        catch (error) {
            console.log(error)
        }

    }
}

module.exports = {
    name: "interactionCreate",
    func: interactionCreate
}
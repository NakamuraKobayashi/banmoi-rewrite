const { MessageEmbed, MessageActionRow, MessageSelectMenu, Message } = require('discord.js');
const fs = require('fs');


module.exports = {
    name: 'help', // name of the command
    userPerms: ["SEND_MESSAGES"],
    clientPerms:['EMBED_LINKS'],
    description: 'Show all available bot commands', // description of the command
    run: async (client, message, args,prefix) => {
        if(args.length === 0) { // if no arguments in the messages, means argument length is equals to 0
            const dirs = []; // define dirs variable as an empty array
            const categories =  []; // define categories variable as an empty array
    
            fs.readdirSync('./commands/').forEach((dir) => { // use readirSync function from fs module
                let commands = fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js')); // read each "category" folders inside "commands" folder and then filter out js files
                const cmds = commands.map((command) => { // map the commands files
                    let file = require(`../../commands/${dir}/${command}`);
                    return { // return an object with properties
                        name: dir, // category name,
                        commands: { // command object with name, description and aliases properties
                            name: file.name, // command name
                            description: file.description, // command description
                            aliases: file.aliases // command aliases
                        }
                    }
                });
    
                categories.push(cmds.filter(cat => cat.name === dir)); // push the categories of commands to the "categories" array
            });
    
    
            let page = 0; // define the page variable as 0
            const emojis = { // an object which stores the emoji for each category for the menu options & embed 
                "info": "<:info:997673849246203945>",
                "fun": "<:CommunityEntertainment:1000589373047324792>",
                "Mod": "<:Moderator:1000588191113424927>",
                "utility": "<a:utility:1000588711639121920>",
                "Dev(Bot)":"<a:Developer:998796532537114654>",
                "GiveAways":"<:giveaways:1000604650409558037>",
                "Music":"<a:music:1000630934263050280>",
                "Reaction":"<:MessageReaction:1000636651170709554>",
                "Image":"<:image:1000637934967472168>",
                "Feature":"<:feature:1000640613793923122>",
                "Activity":"<:IconActivity:1000641239273709598>",
                "Test":"<:Test:1000643427043655712>"
            };
    
            const description = { // an object which stores the description for each category for the embed
                "info": "Lệnh về thông tin",
                "utility": "Các lệnh lặt vặt ",
                "fun": "Lệnh về trờ chơi hoặc tính năng thú vị",
                "Mod": "Các lệnh cho người quản lí",
                "Dev(Bot)":"Các lệnh đặc biệt(Chủ bot)",
                "Music":"Lệnh về nhạc",
                "Reaction":"Phản ứng",
                "GiveAways":"Lệnh giveaways",
                "Image":"Ảnh",
                "Feature":"Tính năng",
                "Activity":"Hoạt động trong voice>",
                "TesT":"Cách tính năng đang trong quá trình thử nghiệm"
            }
    
            const menuOptions = [ // an array for the options of the dropdown menu (will push other options objects into it later)
                {
                    label: 'home',
                    description: 'Home page',
                    emoji: '🏠',
                    value: 'home'
                }
            ]
    
            categories.forEach(cat => { // push all category name to "dirs" array
                dirs.push(cat[0].name);
            });
    
            /* Help Embed */
            const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Help Menu')
            .setDescription(`Prefix của bot là: \`${prefix}\`\nSChọn vào mục bên dưới để xem tất cả cách lệnh sãn có`)
    
            dirs.forEach((dir) => { // for each dir in the dirs array
                embed.addField( 
                    `${emojis[dir] || ''} ${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`, // field name included emoji and category name with first letter capitalized
                    `${description[dir] ? description[dir] : `${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()} Commands`}` // description taken from the description object, if the category isn't in the description object, then it will be a default text that we set
                ) // add a field to the help menu home page.
    
                menuOptions.push({ // push the menu select options for each category into the "menuOptions" array
                    label: `${dir}`, // label of the select menu option
                    description: `${dir} commands page`, // description of the select menu option
                    emoji: `${emojis[dir] || ''}`, // emoji of the select menu option
                    value: `${page++}` // the value of the select menu option which increase one for every select menu option using the ++ operator
                })
            });
    
            const row = new MessageActionRow().addComponents( // create a new MessageActionRow and add components
                new MessageSelectMenu() // make a new MessageSelectMenu
                .setCustomId('select') // custom id of the select menu
                .setPlaceholder('Click to see my category') // the placeholder of the select menu
                .addOptions(menuOptions) // add the "menuOptions" array which includes all categories of select menu options
            );
    
            var msg = await message.reply({ embeds: [embed], components: [row], fetchReply: true }); // send the embed with await for edit embed later
    
            const filter = i => !i.user.bot; // filter bot from using the dropdown menu
            const collector = message.channel.createMessageComponentCollector({ // create a message component collector 
                filter, // apply the filter
                componentType: 'SELECT_MENU', // type of the collector is select menu
                time: 30000 // time of the collector is 30s
            });
    
            collector.on('collect', async (i) => {
                if(i.user.id !== message.author.id) return i.reply({ content: `This help page is not for you! Use the command \`${prefix}help\` yourself!`, ephemeral: true }); // if click menu user is not the message author then return an ephemeral message
                i.deferUpdate(); // use this so your select menu won't load slowly when u select an option
    
                const value = i.values[0]; // the value that collector collects
    
                if(i.customId !== 'select') return; // if collected value's component custom id is not equals to "select" then return
    
                if(value && value !== 'home') { // if there is value collected and the value is not equals to "home"
                    embed.fields = []; // set the fields to empty
                    embed.setTitle(`${emojis[categories[value][0].name] ? emojis[categories[value][0].name] : ''} Help Menu | ${categories[value][0].name}`) // set the title as category name and the emoji in the front
    
                    categories[value].forEach(cmd => { // use the colected value as the index of the element of the categories array. For each commands of that category....
                        embed.addField( // add a field to the embed
                            `\`${prefix}${cmd.commands.name}\``, // field name is the command name
                            `${cmd.commands.description || 'No descriptinon'}`, // value is the description of the command
                            true // set field inline to true
                        )
                    });
                    
                    msg = await msg.edit({ embeds: [embed], components: [row], fetchReply: true }); // edit the embed
                }
    
                if(value === 'home') { // if the collected value is equals to "home"
                    embed.fields = []; // set the embed fields to empty
                    embed.setTitle('Help Menu')
    
                    dirs.forEach(dir => { // for each dir in the dirs array
                        embed.addField( // add field to the help embed
                            `${emojis[dir] || ''} ${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`, // emoji and category name with first letter capitallized
                            `${description[dir] ? description[dir] : `${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()} commands` }` // description of the category
                        )
                    });
    
                    msg = await msg.edit({ embeds: [embed], components: [row], fetchReply: true }); // edit the embed
                }
    
            });
    
            collector.on('end', async () => { // when the collector stopped 
                msg = await msg.edit({ embeds: [embed], components: [], fetchReply: true }); // remove the select menu from the embed
            });
    
        } else { // if there is arguments in ur message
            // What we are doing now - e.g. c!help core and c!help ping

            let categs = []; // declare "categs" variable as empty array for the categories
            let fields = []; // declare "fields" variable as empty array for the fields of the category help page

            fs.readdirSync('./commands/').forEach((dir) => { // for each folders inside commands folder
                if(dir.toLowerCase() !== args.join(' ').toLowerCase()) return; // if folder name is not equals to the category you want to search in help command then return
                const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js')); // get the js files inside each category folder

                const cmds = commands.map((command) => { // map commands file
                    let file = require(`../../commands/${dir}/${command}`); // include the command file with the require() function
                    if(!file.name) return; // if the file did not export the command name, then return

                    let name = file.name;
                    return { // return object with command name and description property
                        name: `${name}`, // name of the command
                        description: client.commands.get(name).description // get the command description by command name, from the commands collection
                    }
                });

                cmds.map(c => {
                    if(c == undefined) return; // if a command data is undefined then return
                    fields.push({ // push the fields of the embed to the "fields" array
                        name: `\`${prefix + c.name}\``, // prefix and the name of the command as field name
                        value: c.description ? c.description : 'No Description', // description of the command as field value
                        inline: true // set inline for the field to true
                    })
                });

                categs.push(dir.toLowerCase()); // push categories to categs array
            });

            const command = client.commands.get(args.join(' ').toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args.join(' ').toLowerCase())); // find if commands collection or aliases inside command data includes the arguments of your message

            if(categs.includes(args.join(' ').toLowerCase())) { // if the categs array includes the category name you search
                const categEmbed = new MessageEmbed()
                .setTitle(`${args.join(' ').charAt(0).toUpperCase() + args.join(' ').slice(1)} Commands!`)
                .setDescription(`Use \`${prefix}help <command>\` to get details of a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                .addFields(fields) // fields that has all the commands of that category you searched
                .setColor('RED')
                return message.reply({ embeds: [categEmbed] });
            }

            if(!command) { // if can't find that command from collection
                const failEmbed = new MessageEmbed()
                .setDescription(`${message.author}, Invalid command! Use \`${prefix}help\` to see all mycommands!`)
                .setColor('RED')
                return message.reply({ embeds: [failEmbed] });
            }

            const cmdEmbed = new MessageEmbed()
            .setTitle('Command Details')
            .addField('Command:', `${command.name}`) // command name
            .addField('Aliases', command.aliases ? (command.aliases.length > 0 ? `\`${command.aliases.join("`, `")}\`` : 'No aliases') : 'No aliases') // if there is aliases array, then show, else show no aliases in the value of the field
            .addField('Usage', command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `${prefix}${command.name}`) // if there is usage exported in command file, make prefix + command + usage as the value of the field, else just display prefix + command name
            .addField('Command Description:', command.description ? command.description : 'No description') // if there is description of the command, then show in field value, else show "No description" in the field value
            .setTimestamp()
            .setColor('BLUE');
            return message.reply({ embeds: [cmdEmbed] });
        }
        
    },
}
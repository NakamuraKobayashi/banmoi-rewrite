const db = require('quick.db')

module.exports = {
    name: 'blacklist',
    description: 'restrict a user from using slash commands',
    options: [{
        type: 'SUB_COMMAND',
        name: 'add',
        description: 'Add a user to your blacklist list',
        options: [{
            type: 'USER',
            name: 'user',
            description: 'Tag the user that you want to blacklist',
            required: true
        }]
    }, {
        type: 'SUB_COMMAND',
        name: 'remove',
        description: 'Remove a user out of your blacklist list',
        options: [{
            type: 'USER',
            name: 'user',
            description: 'Tag the user that you want to un-blacklist',
            required: true
        }]
    }, {
        type: 'SUB_COMMAND',
        name: 'list',
        description: 'List all of the users that is blacklisted'
    }],
    run: async (client, interaction) => {

        try {

           

            // GLOBAL DECLARATIONS
            const sbc = interaction.options.getSubcommand() // get the subcommand

            const user = await interaction.options.getUser('user') // get the user option

            const yourID = '869473483615264768' // your discord id
            const fetchOwner = await client.users.fetch(yourID) // fetch the developer of the bot to tag them for bootyful message


            // BLACKLIST
            if (sbc === 'add') {
                /* -------------- CODE -------------- */
                const userDB = await db.get(`blacklist_${user.id}`) // fetch the database

                if (interaction.user.id !== yourID) return interaction.reply({ content: `> **Only ${fetchOwner.tag} can use this command**`,ephemeral: true }) // if the user interaction isn't you return an error
                if (user.id === yourID) return interaction.editReply({ content: '> **You can\'t blacklist this user**',ephemeral: true }) // return an error if the blacklister is trying to blacklist you, i'm just gonna put my id since im gonna use this command in the future


                if (userDB) {
                    return interaction.reply({ content: `> **<@${fetchOwner.id}> You have already blacklisted this user**`,ephemeral: true })
                } else {
                    const banDate = Number(String(Date.now()).slice(0, -3))
                    await db.set(`blacklist_${user.id}`, banDate) // blacklist the user
                    return interaction.reply({ content: `> **<@${fetchOwner.id}> You have successfully blacklisted <@${user.id}>**`,ephemeral: true }) // return successfully message
                }

                /* -------------- END OF CODE -------------- */
            }

            // UNBLACKLIST
            if (sbc === 'remove') {
                const userDB = await db.get(`blacklist_${user.id}`) // fetch the database

                if (!userDB) {
                    return interaction.reply({ content: `> **<@${user.id}> is not blacklisted**`,ephemeral: true }) // the tagged user isnt blacklisted
                } else {
                    await db.delete(`blacklist_${user.id}`)
                    return interaction.reply({ content: `> **I have successfully removed <@${user.id}> from blacklist list**`,ephemeral: true })
                }
            }

            // LIST
            if (sbc === 'list') {
                const fetchDB = await db.fetchAll() // fetching the blacklisted users

                let blacklistList = 'lol'; // the message the are going to be sent

                if (fetchDB.length === 0) {
                    blacklistList += '> ┠╴***There are no blacklisted user***' // there are no blacklisted user
                } else {
                    blacklistList += (await Promise.all(fetchDB.map(async (user, count) => { // map all of the blacklisted users
                        const fetchUser = await client.users.fetch(user.ID.split('_')[1]) 

                        return `> **${count+1}** ┠╴***${fetchUser.tag} ━  <t:${user.data}:F>***`
                    }))).join('\n')
                }

                return interaction.reply({ content: blacklistList,ephemeral: true })
            }


        } catch (err) {
            console.log(err)
            interaction.reply({ content: '> **An error occurred, try again the command later.**',ephemeral: true })
        }

    }
}
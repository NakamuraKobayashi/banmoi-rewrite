const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Commands");
table.setHeading('Commands', 'Load');

function add_commands(client) {
    readdirSync('./commands/').forEach(
        dir => {
            const commands = readdirSync(
                `./commands/${dir}/`
            ).filter(
                file => file.endsWith('.js')
            );

            for (let file of commands) {

                let command = require(`../commands/${dir}/${file}`);

                if (command.name) {
                    client.commands.set(command.name, command);
                    table.addRow(
                        file,
                        'OK'
                    )
                } else {
                    table.addRow(
                        file,
                        'Error - Missing a help.name or it is not a string...'
                    );
                }
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(
                        alias => client.aliases.set(
                            alias, command.name
                        )
                    );
                }
                
            }
        }
    );

    console.log(
        table.toString()
    );
}

function add_events(client) {
    const events = readdirSync('./events/').filter(
        (file) => file.endsWith('.js')
    );

    for (let file of events) {
        let event = require(`../events/${file}`);
        if (event.name) {
            client.events.set(event.name, event);
            console.log(`${event.name} Events load`);
        }
    }
}

module.exports = {
    add_commands,
    add_events
}
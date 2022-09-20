const { readdirSync } = require("fs");
const ascii = require("ascii-table");

function load_slash_commands() {

    let table = new ascii("Slash Commands");
    table.setHeading('Slash Command', ' Load status');

    let slash_commands = []

    readdirSync("./slashCommands/").forEach(dir => {
        const commands = readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let command = require(`../slashCommands/${dir}/${file}`);
            if (command.name) {
                slash_commands.push(command);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `🚫`);
                continue;
            }
        }
    });

    return {
        table,
        slash_commands
    }
}

module.exports = {
    load_slash_commands
}
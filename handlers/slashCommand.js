let slash = []
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Slash Commands");
table.setHeading('Slash Command', ' Load status');
module.exports = (client) => {
    readdirSync("./slashCommands/").forEach(dir => {
        const commands = readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../slashCommands/${dir}/${file}`);
            if (pull.name) {
                client.slashCommands.set(pull.name, pull);
                slash.push(pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `🚫`);
                continue;
             }
          }
    });
    console.log(table.toString());
client.on("ready",async ()=> {
    await client.application.commands.set(slash)
 })
}
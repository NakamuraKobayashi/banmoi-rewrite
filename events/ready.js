const { load_slash_commands } = require("../handlers/slashCommand")

async function ready(banmoi) {
    console.log(`Logged in as ${banmoi.user.tag}!`);

    result = load_slash_commands()
    console.log(result.table.toString())
    await banmoi.application.commands.set(result.slash_commands)
}

module.exports = {
    name: "ready",
    func: ready
}
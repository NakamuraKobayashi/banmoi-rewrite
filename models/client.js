const { Client, Collection } = require('discord.js')
const fs = require("fs")


class Banmoi extends Client {

    commands = new Collection();
    aliases = new Collection();
    categories = fs.readdirSync("./commands/");
    interactions = new Collection()
    slashCommands = new Collection();
    anticrash = new Collection();
    config = require('../config.json');
    events = new Collection();
    snipes = new Map()
}

module.exports = {
    Banmoi
}
const { Banmoi } = require("./models/client")

const { add_commands, add_events } = require("./handlers/command")

const banmoi = new Banmoi(
	{
		partials: ["MESSAGE", "CHANNEL", "REACTION"],
		shards: 'auto',
		intents: 32767, allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
	}
);

add_commands(banmoi)
add_events(banmoi)

const token = process.env['token']

banmoi.login(token);

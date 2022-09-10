const beautify = require('beautify')
const {MessageEmbed } = require('discord.js')

module.exports = {
	name: 'eval',
	description:
		"Evaluates the code you put in but it's only available for the my Developer and no one else!!!!!",
	ownerOnly: true,
	options: [
		{
			type: 'STRING',
			description: 'Code to evaluate',
			name: 'code',
			required: true
		}
	],

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction, args) => {
		try {
			if (
				args
					.join(' ')
					.toLowerCase()
					.includes('token')
			) {
				return interaction.editReply(
					'Are you crazy ;-; You are going to give out your token public. I stopped it hopefully...'
				)
			}

			const toEval = args.join(' ')
			await eval(toEval)
			const evaluated = eval(toEval)

			let embed = new MessageEmbed()
				.setColor('#F4B3CA')
				.setTimestamp()
				
				.setTitle('Eval')
				.addField(
					'To Evaluate',
					`\`\`\`js\n${beautify(args.join(' '), { format: 'js' })}\n\`\`\``
				)
				.addField('Evaluated:', `\`\`\`fix\n${evaluated || '??'}\`\`\``)
				.addField('Type of:', `\`\`\`${typeof evaluated || '?'}\`\`\``)

			interaction.editReply({ embeds: [embed] })
		} catch (e) {
			let emed1 = new MessageEmbed()
				.setTitle(` • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				interaction.followUp({embeds:[emed1]})

			

			interaction.followUp({
				embeds: [
					{
						description: ` Error, try again later \n Error: ${e} \n `,
						
					}
				]
			})
		}
	}
}

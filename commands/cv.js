const Discord = require('discord.js');

module.exports = {
	name: 'cv',
	description: 'Calculate artifact CV',
	execute(message, args) {
		if (args.length == 2 && !isNaN(args[0]) && !isNaN(args[1])) {
            let crate = parseFloat(args[0]);
            let cdmg = parseFloat(args[1]);
            let cv = parseFloat((crate * 2) + cdmg);

            const cvEmbed = new Discord.MessageEmbed()
                .setColor('0x0099ff')
                .setTitle('CV Calculation')
                .addFields(
                    {
                        name: 'Critical Rate',
                        value: `${crate}`,
                        inline: true,
                    },
                    {
                        name: 'Critical Damage',
                        value: `${cdmg}`,
                        inline: true,
                    },
                    {
                        name: 'CV',
                        value: `${cv}`,
                        inline: true,
                    },
                )
                .setTimestamp()

            return message.channel.send(cvEmbed);

		} else {
			return message.channel.send(`Insert Crit Rate and Crit Damage!`).then(msg =>{
                msg.delete({timeout : 10000})
            });
		}
	},
};
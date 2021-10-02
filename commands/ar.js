const ar = require('../data/ar.json');

module.exports = {
	name: 'ar', 
	description: 'To count estimated days to reach certain Adventure Rank',
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
                        name: 'Current AR',
                        value: `${crate}`,
                        inline: true,
                    },
                    {
                        name: 'Current EXP',
                        value: `${cdmg}`,
                        inline: true,
                    },
                    {
                        name: 'Wanted AR',
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
const Discord = require('discord.js');

module.exports = {
	name: 'cv',
	description: 'Calculate artifact CV',
    args: true,
    usage: '<Crit Rate> <Crit Damage>',
	execute(message, args) {
		if (args.length == 2 && !isNaN(args[0]) && !isNaN(args[1])) {
            let crate = parseFloat(args[0]);
            let cdmg = parseFloat(args[1]);
            let cv = parseFloat((crate * 2) + cdmg);

            if (cv <= 10) {
                quality = "Your artifact is GARBAGE!";
            } else if (cv > 10 && cv <= 20) {
                quality = "Your artifact is AVERAGE!";
            } else if (cv > 20 && cv <= 30) {
                quality = "Your artifact is DECENT!";
            } else if (cv > 30 && cv <= 40) {
                quality = "Your artifact is VERY GOOD!";
            } else if (cv > 40 && cv <= 50) {
                quality = "Your artifact is JEWEL!";
            } else if (cv > 50 && cv <= 60) {
                quality = "Your artifact is GODSENT";
            } else {
                quality = "Your artifact didn't exist";
            }

            const cvEmbed = new Discord.MessageEmbed()
                .setTitle(quality)
                .setColor('0x0099ff')
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

		}
	},
};
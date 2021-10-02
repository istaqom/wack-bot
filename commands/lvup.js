const Discord = require('discord.js');

module.exports = {
	name: 'lvup',
	description: 'Show level up material',
	execute(message) {
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

        // return message.channel.send({ embed: lvEmbed });
    }
};
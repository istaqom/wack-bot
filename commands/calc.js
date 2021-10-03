const strMath = require('string-math');
const Discord = require('discord.js');

module.exports = {
    name : 'calc',
    aliases : ['c'],
    descrition : 'To calculate',
    execute(message, args) {
        if (args.length) {
            try {
                calculate = strMath(`${args.replace(/\s/g,'')}`)

                const calcEmbed = new Discord.MessageEmbed()
                    .setColor('0x0099ff')
                    .setDescription(`${args} = ${calculate}`)

                return message.channel.send(calcEmbed)
            } catch(err) {
                return message.channel.send(`Uh-oh something went wrong`).then(msg =>{
                    msg.delete({timeout : 10000})
                });
            }
        } else {
            return message.channel.send(`Gimme somethin to calculate m8`).then(msg =>{
                msg.delete({timeout : 10000})
            });
        }
    }
};
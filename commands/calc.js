const strMath = require('string-math');
const Discord = require('discord.js');

module.exports = {
    name : 'calc',
    args : true,
    usage : '<something to calculate>',
    aliases : ['c'],
    descrition : 'To calculate',
    execute(message, args) {
        if (args.length) {
            try {
                noSpaceArgs = args.toString().replace(/\s/g,'');
                calculate = strMath(`${noSpaceArgs}`)

                const calcEmbed = new Discord.MessageEmbed()
                    .setColor('0x0099ff')
                    .setDescription(`${noSpaceArgs} = ${calculate}`)

                return message.channel.send(calcEmbed)
            } catch(err) {
                console.log(err)
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
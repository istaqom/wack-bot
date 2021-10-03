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
                noSpaceArgs = args.toString().replace(/[, A-Za-z]+/g,'').trim();
                calculate = strMath(`${noSpaceArgs}`)

                const calcEmbed = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setDescription(`${noSpaceArgs} = ${calculate}`)

                return message.channel.send(calcEmbed)
            } catch(err) {
                console.log(`${err} ${noSpaceArgs}`)
                return message.channel.send(`Uh-oh something went wrong`).then(msg =>{
                    msg.delete({timeout : 10000})
                });
            }
        }
    }
};
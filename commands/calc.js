const strCalc = require('string-calculator');

module.exports = {
    name : 'calc',
    descrition : 'To calculate',
    execute(message, args) {
        if (!args.length) {
            try {
                calculate = strCalc(`${args}`)
                return message.channel.send(`${calculate}`)
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
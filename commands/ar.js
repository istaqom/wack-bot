const ar = require('../data/ar.json');
const Discord = require('discord.js');

module.exports = {
	name: 'ar',
    args : true,
    usage : "<Current AR> <Target AR> <EXP>",
	description: 'To count estimated days to reach certain Adventure Rank',
	execute(message, args) {
		if (args.length == 3 && !isNaN(args[0]) && !isNaN(args[1]) && !isNaN(args[2])) {
            const curAR = args[0];
            const tarAR = args[1];
            const curEXP = parseInt(args[2]);

            const resin = 180;
            const exp_20 = 100;

            const exp_resin_day = resin / 20 * exp_20;
            const daily = 500 + (4 * 250);

            const exp_day = daily + exp_resin_day;

            try {
                total = ar[tarAR] - ar[curAR] - curEXP;
                total = total.toFixed(2);
                estDay = total / exp_day;

                const embed = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .addFields(
                        {
                            name : 'Total EXP Needed',
                            value : `${total}`,
                            inline : true
                        },
                        {
                            name : 'Estimated Days',
                            value : `${estDay}`,
                            inline : true
                        }
                    )
                    .setFooter("Estimated days is Daily Commision + 180 Resin per day")
                    .setTimestamp()

                return message.channel.send(embed);

            } catch(err) {
                console.log(err);
                return message.channel.send(`Uh-oh something went wrong`).then(msg =>{
                    msg.delete({timeout : 10000})
                });
            }
		}
	},
};
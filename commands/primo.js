const Discord = require("discord.js");

module.exports = {
    name: 'primo',
	description: 'Calculate primo you can save for daily',
    args: true,
    usage: '<Starting Primogems> <End date (DD/MM/YYYY format)>',
    execute(message, args) {
        const dateInput = args[1].split("/");
        const dateToday = new Date();
        var m = dateToday.getMonth()+1;
        var d = dateToday.getDay();
        var y = dateToday.getFullYear();

        dateToday = new Date(y, m, d)
        const dateEnd = new Date(dateInput[2], dateInput[1], dateInput[0]);

        if (dateEnd.getTime() > dateToday.getTime()) {
            return message.channel.send("What the hell, you can rewind time?");
        }

        const diffTime = dateEnd.getTime() - dateToday.getTime();
        const diffDay = diffTime / (1000 * 3600 * 24);

        const totalPrimo = diffDay * 60;
        const totalPull = totalPrimo / 160;

        const embed = new Discord.MessageEmbed()
            .setTitle(`You saved a total of ${totalPrimo} Primogems`)
            .setDescription(`You can do ${totalPull} pulls!`)
            .setTimestamp()

        return message.channel.send(embed);
    }
}
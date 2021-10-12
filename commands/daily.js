const dailyData = require("../data/daily.json");
const Discord = require("discord.js");

module.exports = {
  name: "daily",
  description: "Check daily domain material",
  alias: ["d"],
  execute(message, args) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var word = "";

    if (args.length == 0) {
      var todayDateTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Singapore",
      });
      todayDateTime = new Date(todayDateTime);

      if (days[todayDateTime.getDay()] == "Monday" || days[todayDateTime.getDay()] == "Thursday") {
        todayData = dailyData["senkam"];

        word = `**Weapon**\n`;
        word += `**Mondstadt :** ${todayData["weapons"]["mondstadt"]}\n`;
        word += `**Liyue :** ${todayData["weapons"]["liyue"]}\n`;
        word += `**Inazuma :** ${todayData["weapons"]["inazuma"]}\n`;

        word = `**Books**\n`;
        word += `**Mondstadt :** ${todayData["books"]["mondstadt"]}\n`;
        word += `**Liyue :** ${todayData["books"]["liyue"]}\n`;
        word += `**Inazuma :** ${todayData["books"]["inazuma"]}\n`;

      } else if (days[todayDateTime.getDay()] == "Tuesday" || days[todayDateTime.getDay()] == "Friday") {
        todayData = dailyData["seljum"];

        word = `**Weapon**\n`;
        word += `**Mondstadt :** ${todayData["weapons"]["mondstadt"]}\n`;
        word += `**Liyue :** ${todayData["weapons"]["liyue"]}\n`;
        word += `**Inazuma :** ${todayData["weapons"]["inazuma"]}\n`;

        word = `**Books**\n`;
        word += `**Mondstadt :** ${todayData["books"]["mondstadt"]}\n`;
        word += `**Liyue :** ${todayData["books"]["liyue"]}\n`;
        word += `**Inazuma :** ${todayData["books"]["inazuma"]}\n`;

      } else if (days[todayDateTime.getDay()] == "Wednesday" || days[todayDateTime.getDay()] == "Saturday") {
        todayData = dailyData["rasab"];

        word = `**Weapon**\n`;
        word += `**Mondstadt :** ${todayData["weapons"]["mondstadt"]}\n`;
        word += `**Liyue :** ${todayData["weapons"]["liyue"]}\n`;
        word += `**Inazuma :** ${todayData["weapons"]["inazuma"]}\n`;

        word = `**Books**\n`;
        word += `**Mondstadt :** ${todayData["books"]["mondstadt"]}\n`;
        word += `**Liyue :** ${todayData["books"]["liyue"]}\n`;
        word += `**Inazuma :** ${todayData["books"]["inazuma"]}\n`;

      } else if (days[todayDateTime.getDay()] == "Sunday") {

      }

    } else if (args.length != 0) {
    }

    var embed = new Discord.MessageEmbed()
        .setColor("#2ECC71")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`${days[todayDateTime.getDay()]} Materials`)
        .setDescription(word)
        .setTimestamp()

    return message.channel.send(embed);

  }
};

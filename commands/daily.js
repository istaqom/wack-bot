const dailyData = require("../data/daily.json");
const Discord = require("discord.js");

module.exports = {
  name: "daily",
  description: "Check daily domain material",
  usage: "<Day Name>",
  aliases: ["d"],
  execute(message, args) {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var todayDateTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Singapore",
    });
    todayDateTime = new Date(todayDateTime);

    if (typeof args[0] !== "undefined") {
      dayInput = String(args[0]);
      dayInput = dayInput.toLowerCase().trim();
      if (dayInput == "senin" || dayInput == "kamis") {
        todayData = dailyData["senkam"];
        daysName = "Monday/Thursday";
      } else if (dayInput == "selasa" || dayInput == "jumat") {
        todayData = dailyData["seljum"];
        daysName = "Tuesday/Friday";
      } else if (dayInput == "rabu" || dayInput == "sabtu") {
        todayData = dailyData["rasab"];
        daysName = "Wednesday/Saturday";
      } else if (dayInput == "minggu") {
        todayData = dailyData["minggu"];
        daysName = "Sunday";
      } else {
        return message.channel.send("There is no such day").then((msg) => {
          msg.delete({ timeout: 10000 });
        });
      }
    } else {
      if (
        days[todayDateTime.getDay()] == "Monday" ||
        days[todayDateTime.getDay()] == "Thursday"
      ) {
        todayData = dailyData["senkam"];
      } else if (
        days[todayDateTime.getDay()] == "Tuesday" ||
        days[todayDateTime.getDay()] == "Friday"
      ) {
        todayData = dailyData["seljum"];
      } else if (
        days[todayDateTime.getDay()] == "Wednesday" ||
        days[todayDateTime.getDay()] == "Saturday"
      ) {
        todayData = dailyData["rasab"];
      } else if (days[todayDateTime.getDay()] == "Sunday") {
        todayData = dailyData["minggu"];
      }
    }

    if (typeof todayData !== "undefined") {
      var word = `**Weapon**\n`;
      word += `**Mondstadt :** ${todayData["weapons"]["mondstadt"]}\n`;
      word += `**Liyue :** ${todayData["weapons"]["liyue"]}\n`;
      word += `**Inazuma :** ${todayData["weapons"]["inazuma"]}\n\n`;

      word += `**Books**\n`;
      word += `**Mondstadt :** ${todayData["books"]["mondstadt"]}\n`;
      word += `**Liyue :** ${todayData["books"]["liyue"]}\n`;
      word += `**Inazuma :** ${todayData["books"]["inazuma"]}\n`;

      var embed = new Discord.MessageEmbed()
        .setColor("#2ECC71")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`${(typeof args[0] == "undefined") ? days[todayDateTime.getDay()] : daysName} Materials`)
        .setDescription(word)
        .setTimestamp();

      return message.channel.send(embed);
    }
  },
};

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
    } else {
      dayInput = "";
    }

    if (
      days[todayDateTime.getDay()] == "Monday" ||
      days[todayDateTime.getDay()] == "Thursday" ||
      dayInput.toLowerCase().trim() == "senin" ||
      dayInput.toLowerCase().trim() == "kamis"
    ) {
      todayData = dailyData["senkam"];
    } else if (
      days[todayDateTime.getDay()] == "Tuesday" ||
      days[todayDateTime.getDay()] == "Friday" ||
      dayInput.toLowerCase().trim() == "selasa" ||
      dayInput.toLowerCase().trim() == "jumat"
    ) {
      todayData = dailyData["seljum"];
    } else if (
      days[todayDateTime.getDay()] == "Wednesday" ||
      days[todayDateTime.getDay()] == "Saturday" ||
      dayInput.toLowerCase().trim() == "rabu" ||
      dayInput.toLowerCase().trim() == "sabtu"
    ) {
      todayData = dailyData["rasab"];
    } else if (
      days[todayDateTime.getDay()] == "Sunday" ||
      dayInput.toLowerCase().trim() == "minggu"
    ) {
      todayData = dailyData["minggu"];
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
        .setTitle(`${days[todayDateTime.getDay()]} Materials`)
        .setDescription(word)
        .setTimestamp();

      return message.channel.send(embed);
    }
  },
};

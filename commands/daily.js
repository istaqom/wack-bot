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
      if (dayInput == "monday" || dayInput == "thursday") {
        todayData = dailyData["senkam"];
        daysName = "Monday/Thursday";
      } else if (dayInput == "tuesday" || dayInput == "friday") {
        todayData = dailyData["seljum"];
        daysName = "Tuesday/Friday";
      } else if (dayInput == "wednesday" || dayInput == "saturday") {
        todayData = dailyData["rasab"];
        daysName = "Wednesday/Saturday";
      } else if (dayInput == "sunday") {
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
      var weapon = `**Mondstadt :** ${todayData["weapons"]["mondstadt"]}\n`;
      weapon += `**Liyue :** ${todayData["weapons"]["liyue"]}\n`;
      weapon += `**Inazuma :** ${todayData["weapons"]["inazuma"]}\n\n`;

      var book = `**Mondstadt :** ${todayData["books"]["mondstadt"]}\n`;
      book += `**Liyue :** ${todayData["books"]["liyue"]}\n`;
      book += `**Inazuma :** ${todayData["books"]["inazuma"]}\n`;

      var embed = new Discord.MessageEmbed()
        .setColor("#2ECC71")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`${(typeof args[0] == "undefined") ? days[todayDateTime.getDay()] : daysName} Materials`)
        .addFields(
          {name: "Weapon", value: weapon ,inline: true},
          {name: "Books", value: book ,inline: true},
        )
        .setTimestamp();

      if (todayData["image"] != "None") {
        embed.attachFiles([todayData["image"]]);
        embed.setImage(`attachment://${todayData["image"].split('\\').pop().split('/').pop()}`);
      }

      return message.channel.send(embed);
    }
  },
};

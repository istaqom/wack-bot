const axios = require("axios");
const formData = require("form-data");
const Discord = require("discord.js");

module.exports = {
  name: "rate",
  description: "Send an image to be rated by the bot",
  execute(message) {
    message.attachments.forEach((attachment) => {
      var word = "";
      var cdmg = 0.0;
      var crate = 0.0;
      var er = 0.0;
      var em = 0;
      var atkPercent = 0.0;
      var atk = 0;
      var defPercent = 0.0;
      var def = 0;
      var hpPercent = 0.0;
      var hp = 0;
      var artifactUser = "";

      var imgURL = attachment.url;
      let urlComp = "http://api.resmush.it/ws.php";
      axios({
        method: "post",
        url: urlComp,
        params: {
          img: imgURL,
        },
      })
        .then(function (response) {
          console.log(response.data.dest);
          compressedImg = response.data.dest;
          let url = "https://api.ocr.space/parse/image";

          var form = new formData();
          form.append("url", compressedImg);
          form.append("language", "eng");
          form.append("filetype", "png");
          form.append("scale", "true");
          form.append("OCREngine", "2");

          var options = {
            headers: {
              apikey: `${process.env.OCRAPI}`,
              ...form.getHeaders(),
            },
          };

          axios
            .post(url, form, options)
            .then((res) => {
              var dataResult = res.data.ParsedResults[0].ParsedText.split("\n");
              var mainStat = 0;

              console.log(dataResult);

              for (item of dataResult) {
                var folCond = item.startsWith("Flower of Life");
                var podCond = item.startsWith("Plume of Death");
                var soeCond = item.startsWith("Sands of Eon");
                var goeCond = item.startsWith("Goblet of Eonothem");
                var colCond = item.startsWith("Circlet of Logos");

                if (folCond) {
                  word += "**Type : **Flower of Life\n";
                } else if (podCond) {
                  word += "**Type : **Plume of Death\n";
                } else if (soeCond) {
                  word += "**Type : **Sands of Eon\n";
                } else if (goeCond) {
                  word += "**Type : **Goblet of Eonothem\n";
                } else if (colCond) {
                  word += "**Type : **Circlet of Logos\n";
                }

                /* Stats Condition */

                var critRateCond =
                  item.includes("CRIT Rate+") ||
                  item.startsWith("CRIT Rate") ||
                  item.startsWith("CRIT RATE");
                var critDMGCond =
                  item.includes("CRIT DMG+") ||
                  item.startsWith("CRIT DMG") ||
                  item.startsWith("CRIT DMG");
                var erCond =
                  item.includes("Recharge+") || item.startsWith("Energy");
                var emCond =
                  item.includes("Mastery+") || item.startsWith("Elemental");
                var atkCond = item.includes("ATK+") || item.startsWith("ATK");
                var defCond = item.includes("DEF+") || item.startsWith("DEF");
                var hpCond = item.includes("HP+") || item.startsWith("HP");

                /* Elemental Condition */

                var physicalCond = item.startsWith("Physical DMG");
                var electroCond = item.startsWith("Electro DMG");
                var hydroCond = item.startsWith("Hydro DMG");
                var geoCond = item.startsWith("Geo DMG");
                var pyroCond = item.startsWith("Pyro DMG");
                var anemoCond = item.startsWith("Anemo DMG");
                var cryoCond = item.startsWith("Cryo DMG");
                var dendroCond = item.startsWith("Dendro DMG");

                if (
                  (critRateCond ||
                    critDMGCond ||
                    emCond ||
                    erCond ||
                    atkCond ||
                    defCond ||
                    hpCond ||
                    physicalCond ||
                    electroCond ||
                    hydroCond ||
                    geoCond ||
                    pyroCond ||
                    anemoCond ||
                    cryoCond ||
                    dendroCond) &&
                  mainStat == 0
                ) {
                  // console.log(item)
                  // word += `\*\*Main Stat : \*\*\n`;
                  if (critRateCond) {
                    word += `\*\*Crit Rate\*\*`;
                  } else if (critDMGCond) {
                    word += `\*\*Crit DMG\*\*`;
                  } else if (emCond) {
                    word += `\*\*Elemental Mastery\*\*`;
                  } else if (erCond) {
                    word += `\*\*Energy Recharge\*\*`;
                  } else if (atkCond) {
                    if (item.includes("%")) {
                      word += `\*\*ATK%\*\*`;
                    } else {
                      word += `\*\*ATK\*\*`;
                    }
                  } else if (defCond) {
                    if (item.includes("%")) {
                      word += `\*\*DEF%\*\*`;
                    } else {
                      word += `\*\*DEF\*\*`;
                    }
                  } else if (hpCond) {
                    if (item.includes("%")) {
                      word += `\*\*HP%\*\*`;
                    } else {
                      word += `\*\*HP\*\*`;
                    }
                  } else if (physicalCond) {
                    word += `\*\*Physical DMG Bonus\*\*`;
                  } else if (electroCond) {
                    word += `\*\*Electro DMG Bonus\*\*`;
                  } else if (hydroCond) {
                    word += `\*\*Hydro DMG Bonus\*\*`;
                  } else if (geoCond) {
                    word += `\*\*Geo DMG Bonus\*\*`;
                  } else if (pyroCond) {
                    word += `\*\*Pyro DMG Bonus\*\*`;
                  } else if (anemoCond) {
                    word += `\*\*Anemo DMG Bonus\*\*`;
                  } else if (cryoCond) {
                    word += `\*\*Cryo DMG Bonus\*\*`;
                  } else if (dendroCond) {
                    word += `\*\*Dendro DMG Bonus\*\*`;
                  }
                  mainStat += 1;
                  continue;
                } else if (mainStat == 1) {
                  let stats = item
                    .replace(/[A-Za-z.]+/g, "")
                    .replace(/[,]/g, ".");
                  if (/\d/.test(stats)) {
                    word += ` \*\*:\*\* ${stats}\n\n`;
                    mainStat += 1;
                  }
                }

                if (item.includes("Equipped")) {
                  itemSeparator = item.split(":");
                  artifactUser = `Equipped by${itemSeparator[1]}`;
                }

                if (
                  (critRateCond ||
                    critDMGCond ||
                    emCond ||
                    erCond ||
                    atkCond ||
                    defCond ||
                    hpCond) &&
                  mainStat == 2
                ) {
                  // console.log(item);

                  try {
                    if (critRateCond) {
                      itemSeparator = item.split("+");
                      itemRegex = itemSeparator[1]
                        .replace(/\,/g, ".")
                        .replace(/\%/g, "");
                      crate = parseFloat(itemRegex);
                    } else if (critDMGCond) {
                      itemSeparator = item.split("+");
                      itemRegex = itemSeparator[1]
                        .replace(/\,/g, ".")
                        .replace(/\%/g, "");
                      cdmg = parseFloat(itemRegex);
                    } else if (erCond) {
                      itemSeparator = item.split("+");
                      itemRegex = itemSeparator[1]
                        .replace(/\,/g, ".")
                        .replace(/\%/g, "");
                      er = parseFloat(itemRegex);
                    } else if (emCond) {
                      itemSeparator = item.split("+");
                      itemRegex = itemSeparator[1]
                        .replace(/\,/g, ".")
                        .replace(/\%/g, "");
                      em = parseInt(itemRegex);
                    } else if (atkCond) {
                      itemSeparator = item.split("+");
                      if (itemSeparator[1].includes("%")) {
                        itemRegex = itemSeparator[1]
                          .replace(/\,/g, ".")
                          .replace(/\%/g, "");
                        atkPercent = parseFloat(itemRegex);
                      } else {
                        itemRegex = itemSeparator[1]
                          .replace(/\,/g, ".")
                          .replace(/\%/g, "");
                        atk = parseFloat(itemRegex);
                      }
                    } else if (defCond) {
                      itemSeparator = item.split("+");
                      if (itemSeparator[1].includes("%")) {
                        itemRegex = itemSeparator[1]
                          .replace(/\,/g, ".")
                          .replace(/\%/g, "");
                        defPercent = parseFloat(itemRegex);
                      } else {
                        itemRegex = itemSeparator[1]
                          .replace(/\,/g, ".")
                          .replace(/\%/g, "");
                        def = parseFloat(itemRegex);
                      }
                    } else if (hpCond) {
                      itemSeparator = item.split("+");
                      if (itemSeparator[1].includes("%")) {
                        itemRegex = itemSeparator[1]
                          .replace(/\,/g, ".")
                          .replace(/\%/g, "");
                        hpPercent = parseFloat(itemRegex);
                      } else {
                        itemRegex = itemSeparator[1]
                          .replace(/\,/g, ".")
                          .replace(/\%/g, "");
                        hp = parseFloat(itemRegex);
                      }
                    }
                  } catch (err) {
                    continue;
                  }
                }
              }

              if (crate != 0.0) {
                word += `\*\*Crit Rate :\*\* ${Math.abs(crate)}%\n`;
              }
              if (cdmg != 0.0) {
                word += `\*\*Crit DMG :\*\* ${Math.abs(cdmg)}%\n`;
              }
              if (er != 0.0) {
                word += `\*\*Energy Recharge :\*\* ${Math.abs(er)}%\n`;
              }
              if (em != 0) {
                word += `\*\*Elemental Mastery :\*\* ${Math.abs(em)}\n`;
              }
              if (atkPercent != 0.0) {
                word += `\*\*ATK% :\*\* ${Math.abs(atkPercent)}%\n`;
              }
              if (atk != 0) {
                word += `\*\*ATK :\*\* ${Math.abs(atk)}\n`;
              }
              if (defPercent != 0.0) {
                word += `\*\*DEF% :\*\* ${Math.abs(defPercent)}%\n`;
              }
              if (def != 0) {
                word += `\*\*DEF :\*\* ${Math.abs(def)}\n`;
              }
              if (hpPercent != 0.0) {
                word += `\*\*HP% :\*\* ${Math.abs(hpPercent)}%\n`;
              }
              if (hp != 0) {
                word += `\*\*HP :\*\* ${Math.abs(hp)}\n`;
              }

              var cv = (crate * 2 + cdmg).toFixed(2);

              word += `\n\*\*CV :\*\* ${cv} `;

              if (cv <= 10) {
                word += "**(Garbage)**\n";
              } else if (cv > 10 && cv <= 20) {
                word += "**(Average)**\n";
              } else if (cv > 20 && cv <= 30) {
                word += "**(Decent)**\n";
              } else if (cv > 30 && cv <= 40) {
                word += "**(Very Good)**\n";
              } else if (cv > 40 && cv <= 50) {
                word += "**(Jewel)**\n";
              } else if (cv > 50 && cv <= 60) {
                word += "**(Godsent)**\n";
              } else {
                word += "**(didn't exist)**\n";
              }

              const embed = new Discord.MessageEmbed()
                .setColor("#2ECC71")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setTitle(artifactUser)
                .setDescription(word)
                .setTimestamp();

              return message.channel.send(embed);
            })
            .catch((error) => {
              console.error(error);
              return message.channel
                .send(`Uh-oh something went wrong`)
                .then((msg) => {
                  msg.delete({ timeout: 10000 });
                });
            });
        })
        .catch(function (error) {
          console.log(error);
          return message.channel
            .send(`Uh-oh something went wrong`)
            .then((msg) => {
              msg.delete({ timeout: 10000 });
            });
        });
    });
  },
};

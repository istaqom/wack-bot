const axios = require('axios');
const formData = require('form-data');
const Discord = require('discord.js');

module.exports = {
    name: "rate",
    description: "Send an image to be rated by the bot",
    execute(message){
        message.attachments.forEach(attachment => {

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
                method: 'post',
                url: urlComp,
                params: {
                    img: imgURL
                }
            })
            .then(function (response) {
                console.log(response.data.dest);
                compressedImg = response.data.dest;
                let url = "https://api.ocr.space/parse/image";

                var form = new formData();
                form.append('url', compressedImg);
                form.append('filetype', 'png');
                form.append('scale', 'true');
                form.append('OCREngine', '2');

                var options = {
                    headers: {
                        apikey: `${process.env.OCRAPI}`,
                        ...form.getHeaders()
                    }
                }

                axios.post(url, form, options)
                    .then(res => {

                        var dataResult = res.data.ParsedResults[0].ParsedText.split("\n");
                        var mainStat = 0;

                        // console.log(dataResult)

                        for (item of dataResult) {
                            var folCond = item.startsWith("Flower of Life");
                            var podCond = item.startsWith("Plume of Death");
                            var soeCond = item.startsWith("Sands of Eon");
                            var goeCond = item.startsWith("Goblet of Eonothem");
                            var colCond = item.startsWith("Circlet of Logos");

                            if (folCond) {
                                word += "\*\*Type : \*\*Flower of Life\n";
                            } else if (podCond) {
                                word += "\*\*Type : \*\*Plume of Death\n";
                            } else if (soeCond) {
                                word += "\*\*Type : \*\*Sands of Eon\n";
                            } else if (goeCond) {
                                word += "\*\*Type : \*\*Goblet of Eonothem\n";
                            } else if (colCond) {
                                word += "\*\*Type : \*\*Circlet of Logos\n";
                            }

                            /* Stats Condition */

                            var critRateCond = item.includes(("Crit Rate")) || item.startsWith("Crit Rate");
                            var critDMGCond = item.includes(("Crit DMG")) || item.startsWith("Crit DMG");
                            var erCond = item.startsWith("Energy");
                            var emCond = item.startsWith("Elemental");
                            var atkCond = item.includes("ATK") || item.startsWith("ATK");
                            var defCond = item.includes("DEF") || item.startsWith("DEF");
                            var hpCond = item.includes("HP") || item.startsWith("HP");

                            /* Elemental Condition */

                            var physicalCond = item.startsWith("Physical DMG");
                            var electroCond = item.startsWith("Electro DMG");
                            var hydroCond = item.startsWith("Hydro DMG");
                            var geoCond = item.startsWith("Geo DMG");
                            var pyroCond = item.startsWith("Pyro DMG");
                            var anemoCond = item.startsWith("Anemo DMG");
                            var cryoCond = item.startsWith("Cryo DMG");
                            var dendroCond = item.startsWith("Dendro DMG");

                            if ((critRateCond || critDMGCond || emCond || erCond || atkCond || defCond || hpCond || physicalCond || electroCond || hydroCond || geoCond || pyroCond || anemoCond || cryoCond || dendroCond) && mainStat == 0) {
                                // console.log(item)
                                word += `\*\*Main Stat : \*\*`;
                                if (critRateCond) {
                                    word += `Crit Rate\n\n`;
                                } else if (critDMGCond) {
                                    word += `Crit DMG\n\n`;
                                } else if (emCond) {
                                    word += `Elemental Mastery\n\n`;
                                } else if (erCond) {
                                    word += `Energy Recharge\n\n`;
                                } else if (atkCond) {
                                    if (item.includes("%")) {
                                        word += `ATK%\n\n`;
                                    } else {
                                        word += `ATK\n\n`;
                                    }
                                } else if (defCond) {
                                    if (item.includes("%")) {
                                        word += `DEF%\n\n`;
                                    } else {
                                        word += `DEF\n\n`;
                                    }
                                } else if (hpCond) {
                                    if (item.includes("%")) {
                                        word += `HP%\n\n`;
                                    } else {
                                        word += `HP\n\n`;
                                    }
                                } else if (physicalCond) {
                                    word += `Physical DMG Bonus\n\n`;
                                } else if (electroCond) {
                                    word += `Electro DMG Bonus\n\n`;
                                } else if (hydroCond) {
                                    word += `Hydro DMG Bonus\n\n`;
                                } else if (geoCond) {
                                    word += `Geo DMG Bonus\n\n`;
                                } else if (pyroCond) {
                                    word += `Pyro DMG Bonus\n\n`;
                                } else if (anemoCond) {
                                    word += `Anemo DMG Bonus\n\n`;
                                } else if (cryoCond) {
                                    word += `Cryo DMG Bonus\n\n`;
                                } else if (dendroCond) {
                                    word += `Dendro DMG Bonus\n\n`;
                                }
                                mainStat += 1;
                                continue;
                            }

                            if (item.includes("Equipped")) {
                                itemSeparator = item.split(":");
                                artifactUser = `Equipped by${itemSeparator[1]}`;
                            }

                            if ((critRateCond || critDMGCond || emCond || erCond || atkCond || defCond || hpCond) && mainStat == 1) {

                                console.log(item);

                                try {
                                    if (critRateCond) {
                                        itemSeparator = item.split("+");
                                        itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                        crate = parseFloat(itemRegex)
                                    } else if (critDMGCond) {
                                        itemSeparator = item.split("+");
                                        itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                        cdmg = parseFloat(itemRegex)
                                    } else if (erCond) {
                                        itemSeparator = item.split("+");
                                        itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                        er = parseFloat(itemRegex)
                                    } else if (emCond) {
                                        itemSeparator = item.split("+");
                                        itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                        em = parseInt(itemRegex)
                                    } else if (atkCond) {
                                        itemSeparator = item.split("+");
                                        if (itemSeparator[1].includes("%")) {
                                            itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                            atkPercent = parseFloat(itemRegex);
                                        } else {
                                            itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                            atk = parseFloat(itemRegex);
                                        }
                                    } else if (defCond) {
                                        itemSeparator = item.split("+");
                                        if (itemSeparator[1].includes("%")) {
                                            itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                            defPercent = parseFloat(itemRegex);
                                        } else {
                                            itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                            def = parseFloat(itemRegex);
                                        }
                                    } else if (hpCond) {
                                        itemSeparator = item.split("+");
                                        if (itemSeparator[1].includes("%")) {
                                            itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                            hpPercent = parseFloat(itemRegex);
                                        } else {
                                            itemRegex = itemSeparator[1].replace(/\,/g, ".").replace(/\%/g, "");
                                            hp = parseFloat(itemRegex);
                                        }
                                    }
                                } catch(err) {
                                    continue;
                                }
                            }
                        }

                        word += "\*\*Sub Stat\*\*\n"

                        if (crate != 0.0) {
                            word += `\*\*Crit Rate :\*\* ${crate}%\n`;
                        } 
                        if (cdmg != 0.0) {
                            word += `\*\*Crit DMG :\*\* ${cdmg}%\n`;
                        } 
                        if (er != 0.0) {
                            word += `\*\*Energy Recharge :\*\* ${er}%\n`;
                        }
                        if (em != 0) {
                            word += `\*\*Elemental Mastery :\*\* ${em}\n`;
                        }
                        if (atkPercent != 0.0) {
                            word += `\*\*ATK% :\*\* ${atkPercent}%\n`;
                        }
                        if (atk != 0) {
                            word += `\*\*ATK :\*\* ${atk}\n`;
                        }
                        if (defPercent != 0.0) {
                            word += `\*\*DEF% :\*\* ${defPercent}%\n`;
                        }
                        if (def != 0) {
                            word += `\*\*DEF :\*\* ${def}\n`;
                        }
                        if (hpPercent != 0.0) {
                            word += `\*\*HP% :\*\* ${hpPercent}%\n`;
                        }
                        if (hp != 0) {
                            word += `\*\*HP :\*\* ${hp}\n`;
                        }

                        var cv = ((crate * 2) + cdmg).toFixed(2);

                        word += `\n\*\*CV :\*\* ${cv}\n\n`;
            
                        if (cv <= 10) {
                            word += "\*\*Your artifact is GARBAGE!\*\*\n";
                        } else if (cv > 10 && cv <= 20) {
                            word += "\*\*Your artifact is AVERAGE!\*\*\n";
                        } else if (cv > 20 && cv <= 30) {
                            word += "\*\*Your artifact is DECENT!\*\*\n";
                        } else if (cv > 30 && cv <= 40) {
                            word += "\*\*Your artifact is VERY GOOD!\*\*\n";
                        } else if (cv > 40 && cv <= 50) {
                            word += "\*\*Your artifact is JEWEL!\*\*\n";
                        } else if (cv > 50 && cv <= 60) {
                            word += "\*\*Your artifact is GODSENT!\*\*\n";
                        } else {
                            word += "\*\*Your artifact didn't exist\*\*\n";
                        }

                        const embed = new Discord.MessageEmbed()
                            .setColor("#2ECC71")
                            .setTitle(artifactUser)
                            .setDescription(word)
                            .setTimestamp()

                        return message.channel.send(embed);
                    })
                .catch(error => {
                    console.error(error)
            })
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }
}
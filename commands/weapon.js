module.exports = {
    name: 'weapon',
	description: 'Show weapon material',
    args: true,
    usage: "<stars>",
    aliases: ['weap'],
    execute(message, args){
        if (args.length != 0) {
            if (args[0] == "3") {
                return message.channel.send("Image by Adiim EF", {
                    files: [{
                        attachment: './images/3-Star Weapon EXP.jpg',
                        name: '3-Star Weapon EXP.jpg'
                    }]
                });
            } else if (args[0] == "4") {
                return message.channel.send("Image by Adiim EF", {
                    files: [{
                        attachment: './images/4-Star Weapon EXP.jpg',
                        name: '4-Star Weapon EXP.jpg'
                    }]
                });
            } else if (args[0] == "5") {
                return message.channel.send("Image by Adiim EF", {
                    files: [{
                        attachment: './images/5-Star Weapon EXP.jpg',
                        name: '5-Star Weapon EXP.jpg'
                    }]
                });
            }
        }
    }
}
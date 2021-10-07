module.exports = {
    name: 'weapon',
	description: 'Show weapon material',
    args: true,
    usage:"<stars>",
    execute(message, args){
        if (!args.length) {
            if (args[0] == "4") {
                return message.channel.send({files: ["../images/4-Star Weapon EXP.jpg"]});
            } else if (args[0] == "5") {
                return message.channel.send({files: ["../images/5-Star Weapon EXP.jpg"]});
            }
        }
    }
}
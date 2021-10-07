module.exports = {
    name: 'lvup',
	description: 'Show level up material',
    execute(message){
        return message.channel.send({files: ["../images\\Character EXP.jpg"]});
    }
}
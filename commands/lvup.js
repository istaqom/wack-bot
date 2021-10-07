module.exports = {
    name: 'lvup',
	description: 'Show level up material',
    execute(message){
        return message.channel.send("Image by Adiim EF", {
            files: [{
                attachment: '../images/Character EXP.jpg',
                name: 'Character EXP.jpg'
            }]
        });
    }
}
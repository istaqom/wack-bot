const LvUp = require('../data/lvup.json');
var Table = require('cli-table');

function numFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

module.exports = {
	name: 'lvup',
	description: 'Show level up material',
	execute(message) {
        var table = new Table({
            head: ['Level', 'EXP', 'Mora', "HW"]
          , colWidths: [7, 11, 11, 5]
        });
        
        for (var prop in LvUp) {
            lvData = [];
            for (value in LvUp[prop]){
                if (prop == "level") {
                    lvData.push(LvUp[prop][value]);
                } else {
                    lvData.push(numFormat(LvUp[prop][value]));
                }
            }
            table.push(lvData);
        }

        return message.channel.send(`${String.fromCharCode(96,96,96)}${table.toString()}${String.fromCharCode(96,96,96)}`);
    }
};
const ascend = require('../data/ascend.json');
var Table = require('cli-table');

function numFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

module.exports = {
	name: 'ascend',
	description: 'Show ascend cost',
	execute(message) {
        var table = new Table({
            head: ['Level', 'Mora', 'Boss', 'Stone', "Type"],
            colWidths: [6, 8, 5, 6, 8],
            chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
                    'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
                    'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
                    'right': '' , 'right-mid': '' , 'middle': '' },
            style: { 'padding-left': 0, 'padding-right': 0 }
        });
        
        for (var prop in ascend) {
            ascData = [];
            ascData.push(prop);
            for (value in ascend[prop]){
                if (prop == "stone_type") {
                    ascData.push(ascend[prop][value]);
                } else {
                    ascData.push(numFormat(ascend[prop][value]));
                }
            }
            table.push(ascData);
        }

        return message.channel.send(`${String.fromCharCode(96,96,96)}${table.toString()}${String.fromCharCode(96,96,96)}`);
    }
};
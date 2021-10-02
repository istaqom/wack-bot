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
            head: ['Level', 'EXP', 'Mora', "Hero's Wit"]
          , colWidths: [10, 12, 12, 12]
        });
        var arrData = [0, 0, 0];
        
        for (var prop in LvUp) {
            lvlData = []
        
            lvlData.push(`${numFormat(LvUp[prop]["level"])}`);
            lvlData.push(`${numFormat(LvUp[prop]["exp"])}`);
            lvlData.push(`${numFormat(LvUp[prop]["mora"])}`);
            lvlData.push(`${numFormat(LvUp[prop]["hero wit"])}`);
        
            table.push(lvlData);
        
            arrData[0] += LvUp[prop]["exp"];
            arrData[1] += LvUp[prop]["mora"];
            arrData[2] += LvUp[prop]["hero wit"];
        }
        
        table.push(['Total', `${numFormat(arrData[0])}`, `${numFormat(arrData[1])}`, `${numFormat(arrData[2])}`]);
        
        return message.channel.send('.\n' + table.toString());
    }
};
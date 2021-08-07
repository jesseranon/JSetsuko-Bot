const h = require('../helpers/helpers2.js');

module.exports.run = (bot, message, args) => {
        var uwuEmbed = h.createEmbed(bot);

        var fieldTitle = `\`!uwu`;
        var fieldDes = ``;
        if (args[0] == 'toggle') {
            fieldTitle += ` toggle\``;
            this.help.toggle = !this.help.toggle;
            if (this.help.toggle) {
                fieldDes += `My UwU's have been activated ${this.help.description}`;
            } else {
                fieldDes += `My UwU's have been snatched ${this.help.description}`;
            }
        } else if (!args.length || !this.help.toggle) {
            fieldTitle += `\``;
            fieldDes += `${this.help.description}`;
        } else if (this.help.toggle) {
            // change all r and l's in args to w's and return them in a message.
            fieldTitle += ` (message)\``;
            var res = '';
            var i = 0;
            while (i < args.length) {
                res += `${args[i].split('l').join('w')
                    .split('r').join('w')
                    .split('L').join('W')
                    .split('R').join('W')} `;
                i ++;
            }
            fieldDes += `${res}`;
        } else {
            fieldTitle += ` help\``;
            fieldDes += `${this.help.usage}`;
        }

        h.setEmbed(message, uwuEmbed, {title: fieldTitle, dx: fieldDes});
};

module.exports.help = {
    name: "uwu",
    description: "OwO!",
    toggle: false,
    usage: "\`!uwu toggle\` me UwU",
    aliases: ["owo"],
}
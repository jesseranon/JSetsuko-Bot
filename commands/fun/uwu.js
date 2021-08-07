module.exports.run = (message, embed, args) => {
        var fieldTitle = `\`!uwu`;
        var fieldDes = ``;
        if (args[0] == 'toggle') {
            fieldTitle += ` toggle\``;
            this.toggle = !this.toggle;
            if (this.help.toggle) {
                fieldDes += `My UwU's have been activated ${this.help.description}`;
            } else {
                fieldDes += `My UwU's have been snatched ${this.help.description}`;
            }
        } else if (!args.length || !this.toggle) {
            fieldTitle += `\``;
            fieldDes += `${this.description}`;
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
        embed.setTitle(fieldTitle).setDescription(fieldDes);
        message.reply(embed);
        embed.setDescription('');
};

module.exports.help = {
    name: "uwu",
    description: "OwO!",
    toggle: false,
    usage: "\`!uwu toggle\` me UwU",
    aliases: ["owo"],
}
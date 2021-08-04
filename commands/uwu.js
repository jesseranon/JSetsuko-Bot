module.exports = {
    name: "uwu",
    description: "OwO!",
    toggle: false,
    help: "\`!uwu toggle\` me UwU",
    memberfacing: true,
    execute(message, embed, args) {
        var fieldTitle = `\`!uwu`;
        var fieldDes = ``;
        if (args[0] == 'toggle') {
            fieldTitle += ` toggle\``;
            this.toggle = !this.toggle;
            if (this.toggle) {
                fieldDes += `My UwU's have been activated ${this.description}`;
            } else {
                fieldDes += `My UwU's have been snatched ${this.description}`;
            }
        } else if (!args.length || !this.toggle) {
            fieldTitle += `\``;
            fieldDes += `${this.description}`;
        } else if (this.toggle) {
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
            fieldDes += `${this.help}`;
        }
        embed.setTitle(fieldTitle).setDescription(fieldDes);
        message.reply(embed);
        embed.setDescription('');
    },
};
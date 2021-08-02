module.exports = {
    name: "uwu",
    description: "OwO!",
    toggle: false,
    help: "\`!uwu toggle\` me UwU",
    execute(message, args) {
        console.log(`Executing !uwu with message content: ${message.content}`);
        console.log(`Executing !uwu with # of args: ${args.length}`);
        if (args[0] == 'toggle') {
            this.toggle = !this.toggle;
            if (this.toggle) {
                message.channel.send(`My UwU's have been activated ${this.description}`)
            } else {
                message.channel.send(`My UwU's have been snatched ${this.description}`)
            }
        } else if (!args.length || !this.toggle) {
            message.channel.send(this.description);
            return;
        } else if (this.toggle) {
            // change all r and l's in args to w's and return them in a message.
            var res = '';
            var i = 0;
            while (i < args.length) {
                res += `${args[i].split('l').join('w')
                    .split('r').join('w')
                    .split('L').join('W')
                    .split('R').join('W')} `;
                i ++;
            }
            message.channel.send(res);
        } else {
            message.reply(this.help);
        }
    },
};
module.exports = {
    name: "retsuko",
    description: "eye candy, if you know how to ask nicely",
    help: "Try asking nicely. \`!retsuko please\`",
    pics: {
        "bot-avatar": "https://i.imgur.com/TVigIM3.png",
        "jetsuko-avatar": "https://i.imgur.com/tFLOKur.png",
        "atbest": "https://i.imgur.com/tQF8ORx.png",
        "atwork": "https://i.imgur.com/MapTvhP.png",
        "atlunch": "https://i.imgur.com/GyhKuG2.png",
        "atplay": "https://i.imgur.com/t1z5JIg.png",
        "atrest": "https://i.imgur.com/cEZDbbj.png",
        "atpanic": "https://i.imgur.com/HxOKJ3V.png",
        "please": "UwU"
    },
    execute(message, embed, args='') {
        console.log(message.content);
        var fieldTitle = `\`!retsuko`;
        if (!args[0] in this.pics || !args.length) {
            fieldTitle += ` help\``;
            // send picture if argument matches
            console.log(`setting help description`);
            embed.setDescription(`${this.help}`);
        } else {
            fieldTitle += ` ${args[0]}\``;
            if (args[0] == 'please') {
                console.log(`setting description`);
                embed.setDescription(`${this.pics["please"]}`);
            } else {
                console.log(`setting image`)
                embed.setImage(this.pics[args[0]]);
            }
        }
        embed.setTitle(fieldTitle);
        message.reply(embed);
        embed.setDescription('').setImage('');
    },
};
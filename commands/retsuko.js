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
        "rage": "https://i.imgur.com/HEBmeGH.jpg",
        "please": "https://i.imgur.com/Y8UFhGz.png"
    },
    execute(message, embed, args='') {
        var fieldTitle = `\`!retsuko`;
        if (args[0] in this.pics == false || !args.length) {
            fieldTitle += ` help\``;
            // send picture if argument matches
            embed.setDescription(`${this.help}`);
        } else {
            fieldTitle += ` ${args[0]}\``;
            if (args[0] == 'please') {
                embed.setDescription(`${this.pics["please"]}`);
            } else {
                embed.setImage(this.pics[args[0]]);
            }
        }
        embed.setTitle(fieldTitle);
        message.reply(embed);
        embed.setDescription('').setImage('');
    },
};
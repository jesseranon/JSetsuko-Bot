const h = require('../helpers/helpers2.js');

module.exports.run = (bot, message, args) => {

        var rEmbed = h.createEmbed(bot);

        var fieldTitle = `\`!retsuko`;
        if (args[0] in this.help.pics == false || args[0] == 'help') {
            fieldTitle += ` help\``;
            // send picture if argument matches
            rEmbed.setDescription(`${this.help.usage}`);
        } else {
            fieldTitle += ` ${args[0]}\``;
            rEmbed.setImage(this.help.pics[args[0]]);
        }
        h.setEmbed(message, rEmbed, {title: fieldTitle});
};

module.exports.help = {
    name: "retsuko",
    description: "eye candy, if you know how to ask nicely",
    usage: "Try asking nicely. \`!retsuko please\`",
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
    aliases: ["r", "<3"],
};
module.exports = {
    name: "retsuko",
    description: "eye candy, if you know how to ask nicely",
    help: "\`!retsuko please\`",
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
    execute(message, args) {
        if (!args[0] in this.pics || !args.length) {
            // send picture if argument matches
            message.reply(this.help);
        } else {
            message.channel.send(this.pics[args[0]]);
        }
    },
};
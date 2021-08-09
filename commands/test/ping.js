const h = require('../helpers/helpers2.js');

module.exports.run = (bot, message, args=[]) => {
        var pingEmbed = h.createEmbed(bot);
        if (args[0] == 'help') return message.channel.send(this.help.description);
        h.setEmbed(message, pingEmbed, {title: `\`!ping\``, dx: `Pong! Love, ${message.guild} ${message.channel}`, cid: bot.guildsmanaged[message.guild.id]["botchannel"]});
};

module.exports.help = {
    name: 'ping',
    description: 'This is for testing',
    usage: `ping`,
    aliases: ["p"],
};
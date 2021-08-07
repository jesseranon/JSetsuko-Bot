module.exports.run = (message, embed, args) => {
        if (args == 'help') return message.channel.send(this.help.description);
        message.channel.send('Pong.');
};

module.exports.help = {
    name: 'ping',
    description: 'This is for testing',
    usage: `ping`,
    aliases: ["p"],
};
module.exports = {
    name: 'ping',
    description: 'Ping!',
    memberfacing: true,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};
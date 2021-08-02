module.exports = {
    name: "avatar",
    description: "Look at someone's avatar.",
    help: "\`!avatar me or @user\`",
    execute(message, args) {
        if (args[0] == 'me') {
            message.channel.send(message.author.displayAvatarURL());
        } else if (message.mentions.members.size) {
            message.channel.send(message.mentions.users.first().displayAvatarURL());
        } else {
            message.reply(this.help);
        }
    },
};
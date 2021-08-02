const fs = require('fs');

module.exports = {
    name: "help",
    description: ``,
    execute(message, embed, args='') {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        if (this.description == '') {
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                if (command.name != 'help') {
                    this.description += `\`!${command.name}\` => ${command.description}\n`;
                }
            }
        }
        embed.setTitle(`\`@JSetsuko-Bot\` or \`!help\``).setDescription(`${this.description}`);
        message.reply(embed);
        //reset embed
        embed.setDescription('');
    },
};
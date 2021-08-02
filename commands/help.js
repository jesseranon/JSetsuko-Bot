const fs = require('fs');

module.exports = {
    name: "help",
    description: ``,
    execute(message, args='') {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        if (this.description == '') {
            console.log(`Generating help description`);
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                if (command.name != 'help') {
                    this.description += `${command.name} => ${command.description}\n`;
                }
            }
        }
        message.reply(this.description);
    },
};
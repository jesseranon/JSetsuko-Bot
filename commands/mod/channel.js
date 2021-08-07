module.exports.run = (bot, message, args) => {

        console.log(`*****MOD TOOLS: ${this.name} evoked in ${message.guild.name} by ${message.author.tag}.*****`); // for logging

        var fieldTitle = `\`!channel`;
        if (args.length == 3) {

            const act = args.shift();
            if (act != 'create' && act != 'delete') {
                fieldTitle += ` create|delete\``;
                embed.setTitle(fieldTitle).setDescription(`next argument must be called with either create or delete`);
                message.reply(embed);
                embed.setTitle('').setDescription('');
                return;
            }

            const t = args.shift();
            const ts = ['text', 'voice', 'category']
            if (!ts.includes(t)) {
                fieldTitle += ` ${act} (type)\``;
                embed.setTitle(fieldTitle).setDescription(`next argument must be a valid type: text | voice | category`);
                message.reply(embed);
                embed.setTitle('').setDescription('');
                return;
            }

            const cname = args.shift();
            // check for {type} channel with {cname} in guild
            const gc = message.guild.channels.cache.find(channel => channel.name.toLowerCase() == cname && channel.type == t);
            fieldTitle = `\`${message.content}\``;
            embed.setTitle(fieldTitle);
            switch (act) {
                case 'create':
                    if (gc) {
                        embed.setDescription(`${t} channel ${cname} already exists. Leaving it alone.`);
                        message.reply(embed);
                        embed.setTitle('').setDescription('');
                        return;
                    }
                    //create
                    message.guild.channels.create(cname, {type: t})
                        .then(a => {
                            embed.setDescription(`${t} channel ${a.name} created by ${message.author}`);
                            message.reply(embed);
                            embed.setTitle('').setDescription('');
                        })
                        .catch(err=>console.log(err));
                    break;
                case 'delete':
                    if (!gc) {
                        embed.setDescription(`${t} channel ${cname} doesn't exist. My business here is done.`);
                        message.reply(embed);
                        embed.setTitle('').setDescription('');
                        return;
                    }
                    gc.delete()
                        .then(a => {
                            embed.setDescription(`${t} channel ${a.name} deleted by ${message.author}`);
                            message.reply(embed);
                            embed.setTitle('').setDescription('');
                        })
                        .catch(err=>console.log(err));
                    //delete
                    break;
                default:
                    console.log(`channel failed to catch an act: ${act}`);
                    return;
            }
            
            
        } else {
            fieldTitle += ` help\``;
            embed.setTitle(fieldTitle).setDescription(this.help);
            message.reply(embed);
            embed.setTitle('').setDescription('');
        }

};

module.exports.help = {
    name: "channel",
    description: "Mod tool for managing channels",
    usage: "\`!channel (create|delete) (type) (name)\` use 3 arguments",
    aliases: ["c"],
};
const Discord = require('discord.js');
const { prefix, token, creatorid } = require('./config.json')
const client = new Discord.Client();

//initiate client
client.once('ready', () => {
    console.log('Ready!');
});

// Command/Argument banks
const commands = {
    "avatar": {"user": true, "help": " shows a user's avatar", "tip": "me or @user"},
    "retsuko": {
        "user": false,
        "bot-avatar": "https://i.imgur.com/TVigIM3.png",
        "jetsuko-avatar": "https://i.imgur.com/tFLOKur.png",
        "atbest": "https://i.imgur.com/tQF8ORx.png",
        "atwork": "https://i.imgur.com/MapTvhP.png",
        "atlunch": "https://i.imgur.com/GyhKuG2.png",
        "atplay": "https://i.imgur.com/t1z5JIg.png",
        "atrest": "https://i.imgur.com/cEZDbbj.png",
        "atpanic": "https://i.imgur.com/HxOKJ3V.png",
        "please": "UwU",
        "help": " eye candy, if you know how to ask nicely",
        "tip": "please"
    }, //will change UwU to return random image
    "uwu": {"user": false, "toggle": false, "help": "OwO undew constwuction", "tip": "secwet code"}
}

// Generate help embed
var helpEmbed = new Discord.MessageEmbed()
    .setTitle('\`@JSetsuko-Bot\`')
    .setDescription('A sexy unicorn bot')
    .setThumbnail(commands["retsuko"]["bot-avatar"])
    .setAuthor(`Jetsuko`, commands["retsuko"]["jetsuko-avatar"])
    .setColor('ORANGE');

// Add fields to help embed
for (let k in commands) {
    let kommand = commands[k];
    if (typeof commands[k] !== 'string') {
        helpEmbed.addField(`\`!${k} ${kommand["tip"]}\``, `=> ${kommand["help"]}`);
    } else {
        if (commands[k]["user"]) {

        } else {
            helpEmbed.addField(`\`!${k}\``, `=> ${kommand}`);
        }
    }
}

//listen for messages sent in all channels the bot is in
client.on('message', message => {

    //shorten message sending syntax
    function msg(a) {
        message.channel.send(a);
    }

    const err = console.error;

    //listen for message that starts with bot mention
    if (message.content.startsWith(`<@!`) && message.mentions.has(client.user)) {
        if (message.author.id == creatorid) {
            message.reply(`buy 20 outfits right now and get ten percent off <3`)
                .then(sent => console.log(`Your wish is my command, Retsuko`))
                .catch(err);
        }
        message.reply(helpEmbed)
            .then(sent => console.log(`Sent a reply to ${message.author.username}`))
            .catch(err);

    } else {

        //cull non-commands
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        console.log(message.content); //for troubleshooting

        //message function for de-cluttering code
        if (Object.keys(commands).includes(message.content.slice(prefix.length)
            .trim().split(/ +/).shift().toLowerCase())) { 
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();        

            // Generate response where (a) is a command and (b) is a subject
            function out(a,b) {
                const rembed = new Discord.MessageEmbed()
                    .setColor('ORANGE');
                switch (a) {
                    case 'avatar':
                        rembed.setImage(b.displayAvatarURL({dynamic:true, size:128}));
                        if (b == message.author) {
                            b = 'me';
                        } else {
                            b = `@${b.username}`;
                        }
                        rembed.setTitle(`\`!avatar ${b}\``);
                        return rembed;
                    case 'retsuko':
                        if (Object.keys(commands[a]).includes(b)) {
                            if (commands[a][b].includes('.png')) {
                                rembed.setImage(commands[a][b]);
                            } else {
                                rembed.setDescription(commands[a][b]);
                            }   
                        } else {
                            b = "help"
                            rembed.setDescription(commands[a]["help"]);
                        }
                        rembed.setTitle(`\`!retsuko ${b}\``)
                        return rembed;
                    default:
                        console.log("Somehow snuck this command past the command catcher");
                        break;
                }
            }

            // processing for subject - need to clean this up
            if (args.length) {
                    let subject = args[0];
                    //console.log(`Argument passed in as ${subject}`);
                    if (subject == 'me') {
                        subject = message.author;
                    } else if (message.mentions.members.size) {
                        subject = message.mentions.users.first();
                        if (!subject) {
                            msg(`Naughty naughty. I don't use roles or rooms (yet)`);
                            return;
                        }
                    } else if (subject) {
                        
                    }
                    msg(out(command,subject));
                }  

            } else {
                msg(`For a list of things I can do, mention me using \`@JSetsuko-Bot\``);
            }
    }
});

//login
client.login(token);

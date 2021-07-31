const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const client = new Discord.Client();
var scraper = require('images-scraper');

const google = new scraper({
    puppeteer: {
        headless: false,
    },
});

(async () => {
    const results = await google.scrape('retsuko', 50);
    console.log('results', results);
})();

// Command/Argument banks
const commands = {
    "ping": "pong",
    "beep": "boop",
    "foo": "bar",
    "avatar": {"user": true, "help": " returns a user's avatar"},
    "bop": {"user": true, "help": " boops a user in the snoot"},
    "jsetsuko-bot": "", 
    "retsuko": {"user": false, "help": " returns a random image of Retsuko"} //scrape a random image of Retsuko from Bing?
}

// Generate jsetsuko-bot help text
let help = ""
for (let k in commands) {
    if (typeof commands[k] !== 'string') {
        help += "\n\n!" + k + commands[k]["help"];
    } else if (k == "jsetsuko-bot") {

    } else {
        help += "\n\n!" + k + " returns " + commands[k];
    }
}
commands["jsetsuko-bot"] += help;

//initiate client
client.once('ready', () => {
    console.log('Ready!');
});

//listen for incoming messages
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log(message.content);

    //message function for de-cluttering code
    function msg(a) {
        message.channel.send(a);
    }

    if (Object.keys(commands).includes(message.content.slice(prefix.length).trim().split(/ +/).shift().toLowerCase())) { 
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();        

        //where (a) is a command and (b) is a subject
        function out(a,b) {
            switch (a) {
                case 'avatar':
                    return b.displayAvatarURL({dynamic:true, size:128});
                case 'bop':
                    return `<@${message.author.id}> bopped <@${b.id}> in the snoot`;
                default:
                    console.log("Somehow snuck this command past the command catcher");
                    break;
            }
        }

        if (typeof commands[command]=='string') {
            msg(`${commands[command]}`);
        } else if (!commands[command]["user"]) {
            console.log(`called a command that doesn't instantly return a string nor requires an argument`);
            console.log(`that command is ${command}`);
        } else {
            if (args.length) {
                let subject = args[0];
                //console.log(`Argument passed in as ${subject}`);
                if (subject == 'me') {
                    subject = message.author;
                } else if (message.mentions.users) {
                    subject = message.mentions.users.first();
                    if (!subject) {
                        msg(`Naughty naughty. I don't use roles or rooms (yet)`);
                        return;
                    }
                } else {
                    msg('No valid arguemnt passed');
                    return;
                }
                msg(out(command,subject));
            }  
        }

    } else {
        msg(`For a list of things I can do, use the command \`!jsetsuko-bot\``);
    }
});

//login
client.login(token);

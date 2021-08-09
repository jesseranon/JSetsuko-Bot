# JSetsuko-Bot

This is a bot created for Discord with the assistance of Node.js and Discord.js.  Other info will be added as this bot is expanded.

Features
- This bot will listen for commands from Discord users in the channels it has access to.

- Embedded responses to differentiate bot responses

- Responses include:
1. simple text responses 
2. display a user's avatar
3. display a picture from a curated album
4. uwufy text

- Operational Mod Tools:
1. kick
2. ban
3. unban
4. create/delete text/voice/category channels
5. message edit/delete tracking
6. new member role assignment

- Future plans (ideas):
1. moderation -> giving/removing a user a role, storing information for use of a warning/kick/ban system, move user, responses for certain operations re-directed to a dedicated bot room for audit (other Mod Tool events, etc. to prevent server TOS violations)
2. a web scraper or webhook for interaction
3. a simple game that can be initiated with a command
4. a database for user milestones
5. one-bot welcome wagon
6. "bah god! it's @non-bot-user's entrance music!" 

config.json - Removed to protect private information.  Contains the following key-value pair in its json Object that is used for commands:

- "prefix": "!",
- "permissions": {"mod-tool": "PERMISSION_FLAG"}
- guild information - includes roles, channels information

- users.json - Removed to protect private information.  Will be used to store information for future moderation commands.

new-branch

I want to re-factor my code so that I can organize my commands into different folders as well as adding aliases for flexibility.  I also want to put my helpers into a separate folder because I've found that I am repeating a lot of things in my commands, especially when it comes to embeds.  This will require changing the way the commands Collection is built, as well as changing the commands themselves.

I found the following for inspiration and did some reading into 'fs' and 'path' to get some understanding on how they pulled and structured their commands and module exports: https://gist.github.com/zedxos/c5fcf33a30213e0a08db4f46498816d4
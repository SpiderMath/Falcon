require("dotenv").config();

const { CommandoClient } = require("discord.js-commando");
const path = require("path");

const client = new CommandoClient({
    commandPrefix: "!",
    owner: "548038495617417226",
    invite:
        "https://discord.com/api/oauth2/authorize?client_id=799543154692718602&permissions=8&scope=bot",
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["general", "General Command Group"],
        ["games", "Games from CodeVert"],
        ["moderation", "Moderators group"],
        ["music", "Music Commands Group"],
        ["events", "Events from CodeVert"],
        ["notify", "Notify devs about Bugs and Features"],
        ["nsfw", "NSFW Content Group"],
        ["misc", "Miscellanious Commands"],
        ["fun", "Fun Commands from CodeVert"],
        ["search", "Search anything from CodeVert"],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        ping: false,
        prefix: true,
        commandState: true,
        unknownCommand: false,
    })
    .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
    console.log(`[READY] Logged in as ${client.user.tag}!`);
});

client.on("error", console.error);

client.login(process.env.TOKEN);

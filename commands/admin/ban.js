const Discord = require("discord.js");
const { confirmation } = require("reconlx");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class BanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: [],
            group: "moderation",
            memberName: "ban",
            description: "Bans a user you want to ban!",
            details: oneLine`
                Bans a user you want to ban!
            `,
            examples: ["!ban <user>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const args = message.content.split(" ").slice(2);

            console.log(args.join(" "))

            if (!message.member.hasPermission("BAN_MEMBERS"))
                return message.channel.send(
                    "**You need `BAN_MEMBERS` permission to use this command**"
                );

            const targetUser = message.mentions.members.first() || (await message.guild.members.fetch('133990844666609664')).user

            const confirmEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle("Banning A User")
                .setColor("#ff2424")
                .setDescription(`**Are you sure you want to ban  ${targetUser}\n\nReason:  \`${args.join(" ")}\`\n\n This Action is irreversable.\n\n React with ✅ if you want to ban this user. And react with ❌ if you want to cancel this request.\n You have 30 seconds to apply the command.**`)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())

            message.channel.send(confirmEmbed).then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ["✅", "❌"], 30000);

                if (emoji === "✅") {
                    message.channel.send("SimBan")
                }
                if (emoji === "❌") {
                    message.channel.send("SimCancel")
                }
            })
        } catch (err) {
            console.error(err);
        }
    }
};

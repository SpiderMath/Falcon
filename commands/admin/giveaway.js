const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const ms = require("ms");

module.exports = class GiveawayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "giveaway",
            aliases: ["gway", "gw", "giveaway-start"],
            group: "moderation",
            memberName: "giveaway",
            description:
                "Giveaway anything in the right way using this command",
            details: oneLine`
                Giveaway anything in the right way using this command
            `,
            examples: ["!giveaway 10d Nitro $9.99"],
            clientPermissions: ["MANAGE_CHANNELS"],
            args: [
                {
                    key: "prize",
                    type: "string",
                    prompt: "What should be the prize of the giveaway?",
                },
                {
                    key: "timing",
                    type: "string",
                    prompt: "What should be the time of the giveaway",
                },
                {
                    key: "winners",
                    type: "string",
                    prompt: "How many winners will be there",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { prize, timing, winners }) {
        const duration = timing;

        this.client.giveaways.start(message.channel, {
            time: ms(duration),
            prize: prize,
            winnerCount: winners,
            hostedBy: message.author,
            messages: {
                giveaway: "Giveaway",
                giveawayEnd: "Giveaway Ended",
                timeRemaining: "Time Remaining **{duration}**",
                inviteToParticipate: "React with 🎉 to join the giveaway",
                winMessage: "Congrats {winners}, you have  won the giveaway",
                embedFooter: "Giveaway Time!",
                noWinner: "Could not determine a winner",
                hostedBy: "Hosted by {user}",
                winners: "winners",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false,
                },
            },
        });
    }
};

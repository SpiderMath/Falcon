const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const axios = require("axios").default;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "decode",
            aliases: [],
            group: "general",
            memberName: "decode",
            description: "Convert something into Decode",
            details: oneLine`
                Convert something into Decode
            `,
            examples: ["!decode <text/anything>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const args = message.content.split(" ").slice(1);

        const url = `http://some-random-api.ml/binary?decode=${args.join(" ")}`;

        try {
            axios.request(url).then(function (response) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Decoding Binary")
                    .setDescription(response.data.text);

                message.channel.send(embed);
            });
        } catch (e) {
            return message.channel.send(
                `**An error occured, please try again and put binary codes this time.**`
            );
        }
    }
};

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const DisTube = require("distube");
const { formatNumber } = require("../../util/Util");

const client = new commando.Client();

const distube = new DisTube(client, {
    youtubeCookie: "",
    searchSongs: false,
    emitNewSongOnly: false,
    highWaterMark: 1 << 25,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    customFilters: {
        clear: "dynaudnorm=f=200",
        bassboost: "bass=g=20,dynaudnorm=f=200",
        "8d": "apulsator=hz=0.08",
        vaporwave: "aresample=48000,asetrate=48000*0.8",
        nightcore: "aresample=48000,asetrate=48000*1.25",
        phaser: "aphaser=in_gain=0.4",
        purebass: "bass=g=20,dynaudnorm=f=200,asubboost",
        tremolo: "tremolo",
        vibrato: "vibrato=f=6.5",
        reverse: "areverse",
        treble: "treble=g=5",
        surrounding: "surround",
        pulsator: "apulsator=hz=1",
        subboost: "asubboost",
        karaoke: "stereotools=mlev=0.03",
        flanger: "flanger",
        gate: "agate",
        haas: "haas",
        mcompand: "mcompand",
    },
});
let stateswitch = false;
let emojis = ["✅", "☑️", "👌", "👍", "❤️", "🎶", "🎵"];
const filters = [
    "mcompand",
    "gate",
    "haas",
    "pulsator",
    "surrounding",
    "clear",
    "8d",
    "bassboost",
    "echo",
    "karaoke",
    "nightcore",
    "vaporwave",
    "flanger",
    "subboost",
    "phaser",
    "tremolo",
    "vibrato",
    "reverse",
    "purebass",
    "treble",
];

module.exports = class PlayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "play",
            aliases: [],
            group: "music",
            memberName: "play",
            description: "Play a music here!",
            details: oneLine`
                Search a music here!
            `,
            examples: ["!Search <song_name>"],
            args: [
                {
                    key: "query",
                    type: "string",
                    prompt: "Please specify the song you wanna play",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { query }) {
        try {
            message.channel.send(
                "<:YouTube:801465200775135282> **Searching** :mag_right: `" +
                    `${query}` +
                    "`"
            );

            distube.play(message, query);
        } catch (err) {
            console.error(err);
        }
    }
};

const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${
        queue.filter || "Off"
    }\` | Loop: \`${
        queue.repeatMode
            ? queue.repeatMode == 2
                ? "All Queue"
                : "This Song"
            : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

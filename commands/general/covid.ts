import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'
import { formatNumber } from '../../util/Util'

const CovidCommand: Command = {
    name: 'covid',
    description: 'Watch the latest news of covid 19',
    aliases: [
        'covid19', 'cov', 'covid-19'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!args[0]) {
            axios.get("https://corona.lmao.ninja/v2/all?yesterday").then((response) => {
                const embed = new MessageEmbed()
                    .setTitle(`**WorldWide**`)
                    .setDescription(
                        "**View all the latest Covid 19 news in Falcon. The situation of Covid is on the way.**"
                    )
                    .setThumbnail("https://img.freepik.com/free-vector/design-earth-space_23-2147926394.jpg?size=338&ext=jpg")
                    .setImage("https://images-ext-2.discordapp.net/external/Xo8QZezbd8LLT_NhijeH0eeFWYs-0JpqnJgcOb6KXZE/https/i.imgur.com/tGAnKcH.png?width=1025&height=267")
                    .addFields(
                        {
                            name: "**❯ Total Cases**",
                            value: `**${formatNumber(response.data.cases)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Total Deaths**",
                            value: `**${formatNumber(response.data.deaths)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Total Recovery**",
                            value: `**${formatNumber(response.data.recovered)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Cases Today**",
                            value: `**${formatNumber(response.data.todayCases)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Deaths Today**",
                            value: `**${formatNumber(response.data.todayDeaths)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Recovery Today**",
                            value: `**${formatNumber(response.data.todayRecovered)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Active Cases**",
                            value: `**${formatNumber(response.data.active)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Critical Cases**",
                            value: `**${formatNumber(response.data.critical)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Tests Today**",
                            value: `**${formatNumber(response.data.tests)}**`,
                            inline: true,
                        }
                    )
                    .setColor("#e6295f");

                message.channel.send(embed);
            }).catch((err) => console.log(err))
        }

        if (args[0]) {
            axios.get(`https://corona.lmao.ninja/v2/countries/${args[0]}?yesterday=true&strict=true&query`).then((response) => {
                const embed = new MessageEmbed()
                    .setTitle(`**${response.data.country}**`)
                    .setDescription(
                        "**View all the latest Covid 19 news in Falcon. The situation of Covid is on the way.**"
                    )
                    .setThumbnail(response.data.countryInfo.flag)
                    .setImage("https://images-ext-2.discordapp.net/external/Xo8QZezbd8LLT_NhijeH0eeFWYs-0JpqnJgcOb6KXZE/https/i.imgur.com/tGAnKcH.png?width=1025&height=267")
                    .addFields(
                        {
                            name: "**❯ Total Cases**",
                            value: `**${formatNumber(response.data.cases)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Total Deaths**",
                            value: `**${formatNumber(response.data.deaths)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Total Recovery**",
                            value: `**${formatNumber(response.data.recovered)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Cases Today**",
                            value: `**${formatNumber(response.data.todayCases)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Deaths Today**",
                            value: `**${formatNumber(response.data.todayDeaths)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Recovery Today**",
                            value: `**${formatNumber(response.data.todayRecovered)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Active Cases**",
                            value: `**${formatNumber(response.data.active)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Critical Cases**",
                            value: `**${formatNumber(response.data.critical)}**`,
                            inline: true,
                        },
                        {
                            name: "**❯ Tests Today**",
                            value: `**${formatNumber(response.data.tests)}**`,
                            inline: true,
                        }
                    )
                    .setColor("#e6295f");

                message.channel.send(embed);
            }).catch((err) => { console.error(err) })
        }
    },
}

export default CovidCommand;
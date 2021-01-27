bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const PREFIX = await prefix.fetchPrefix(message);

    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(PREFIX.length).split(" ");
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(message, args, command);
    } catch (error) {
        console.error(error);
        message.channel.send(
            ":no_entry: There was an Error with the code. Please check the console."
        );
    }

    if (command === "setprefix") {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        if (!args) return message.channel.send("No prefix was provided!");

        prefix.setPrefix(message, args);
    }

    if (command == "prefix") {
        prefix.getGuildPrefix(message, client, args);
    }

    if (command === "ping") {
        message.channel.send("Loading data! :thinking:").then(async (msg) => {
            const pingEmbed = new Discord.MessageEmbed()
                .setTitle("Ping")
                .setAuthor(`Requested by ${message.author.tag}`)
                .setDescription(
                    `🏓 Pong! Your Latency is ${
                        msg.createdTimestamp - message.createdTimestamp
                    }ms and API Latency is ${Math.round(bot.ws.ping)} ms!`
                )
                .setFooter("Copyright @2021 CodeVert");

            message.channel.send(pingEmbed);
        });
    }

    if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`CodeVert commands list | prefix \`${config.prefix}\``)
            .addField(
                "**For Users**",
                "`hello` `ping` `uptime` `avatar` `invite` `wiki` `country`"
            )
            .addField(
                "**For Moderators**",
                "`kick` `ban` `mute` `unmute` `add` `remove` `purge` `giveaway`"
            )
            .addField("**Server Games**", "`rps`")
            .setImage(bot.user.avatarURL({ dynamic: true, size: 256 }))
            .setColor("RANDOM");
        message.channel.send(helpEmbed);
    }

    if (command === "hello") {
        const hello_embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .addField(
                "Hey there! I am the Official Moderating Bot of Hall Of Programmers! If you need any help then type: !help",
                ":thumbsup:"
            )
            .setTitle(`Hello! ${message.author.username}! :wave:`)
            .addField(
                `Hope you have a fantastic day ${message.author.username}!`,
                ":wink:"
            );

        message.channel.send(hello_embed);
    }

    const member = message.mentions.members.first();
    if (!member)
        if (command === "avatar") {
            const avatar_embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**Avatar**`)
                .setTitle(`${message.author.username}'s Avatar`)
                .setImage(
                    message.author.avatarURL({ dynamic: true, size: 256 })
                );
            message.channel.send(avatar_embed);
        }

    if (member) {
        if (command === "avatar") {
            const other_avatar_embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**Avatar**`)
                .setTitle(`${member.user.tag}'s Avatar`)
                .setImage(member.user.avatarURL({ dynamic: true, size: 256 }));
            message.channel.send(other_avatar_embed);
        }
    }

    let channel = message.channel;
    if (command === "invite") {
        channel.createInvite({ unique: true }).then((invite) => {
            message.channel.send(
                "**This Server's Invite Link** https://discord.gg/" +
                    invite.code
            );
        });
    }

    if (command === "giveaway") {
        if (!message.guild) return;
        var time = "";
        var time2 = "";
        var time3 = "";
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(
                "You don't have enough permissions to use this command."
            );
        if (message.content === `${prefix}giveaway`)
            return message.channel.send(
                `You didn\'t state a duration or a price for the giveaway.`
            );
        if (message.content !== `${prefix}giveaway`) {
            const stated_duration_hours = message.content.split(" ")[1];
            const stated_duration_hours2 = stated_duration_hours.toLowerCase();
            if (stated_duration_hours2.includes("s")) {
                var time = "s";
            }
            if (stated_duration_hours2.includes("m")) {
                var time = "m";
            }
            if (stated_duration_hours2.includes("h")) {
                var time = "h";
            }
            if (stated_duration_hours2.includes("d")) {
                var time = "d";
            }
            const stated_duration_hours3 = stated_duration_hours2.replace(
                time,
                ""
            );
            if (stated_duration_hours3 === "0") {
                message.channel.send("The duration has to be atleast one.");
            }
            if (isNaN(stated_duration_hours3)) {
                message.channel.send(
                    "The duration has to be a valid time variable."
                );
            }
            if (stated_duration_hours3 > 1) {
                var time3 = "s";
            }
            if (time === "s") {
                var actual_duration_hours = stated_duration_hours3 * 1000;
                var time2 = "second";
            }
            if (time === "m") {
                var actual_duration_hours = stated_duration_hours3 * 60000;
                var time2 = "minute";
            }
            if (time === "h") {
                var actual_duration_hours = stated_duration_hours3 * 3600000;
                var time2 = "hour";
            }
            if (time === "d") {
                var actual_duration_hours = stated_duration_hours3 * 86400000;
                var time2 = "day";
            }
            if (!isNaN(stated_duration_hours3)) {
                const prize = message.content.split(" ").slice(2).join(" ");
                if (prize === "")
                    return message.channel.send("You have to enter a price.");
                if (stated_duration_hours3 !== "0") {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`${prize}`)
                        .setColor("RANDOM")
                        .setDescription(
                            `React with 🎉 to enter!\nTime duration: **${stated_duration_hours3}** ${time2}${time3}\nHosted by: ${message.author}`
                        )
                        .setTimestamp(Date.now() + actual_duration_hours)
                        .setFooter("Ends at");
                    let msg = await message.channel.send(
                        ":tada: **GIVEAWAY** :tada:",
                        embed
                    );
                    await msg.react("🎉");
                    setTimeout(() => {
                        msg.reactions.cache.get("🎉").users.remove(bot.user.id);
                        setTimeout(() => {
                            let winner = msg.reactions.cache
                                .get("🎉")
                                .users.cache.random();
                            if (
                                msg.reactions.cache.get("🎉").users.cache.size <
                                1
                            ) {
                                const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`${prize}`)
                                    .setColor("36393F")
                                    .setDescription(
                                        `Winner:\nNo one entered the giveaway.\nHosted by: ${message.author}`
                                    )
                                    .setTimestamp()
                                    .setFooter("Ended at");
                                msg.edit(
                                    ":tada: **GIVEAWAY ENDED** :tada:",
                                    winner_embed
                                );
                            }
                            if (
                                !msg.reactions.cache.get("🎉").users.cache
                                    .size < 1
                            ) {
                                const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`${prize}`)
                                    .setColor("36393F")
                                    .setDescription(
                                        `Winner:\n${winner}\nHosted by: ${message.author}`
                                    )
                                    .setTimestamp()
                                    .setFooter("Ended at");
                                msg.edit(
                                    ":tada: **GIVEAWAY ENDED** :tada:",
                                    winner_embed
                                );
                            }
                        }, 1000);
                    }, actual_duration_hours);
                }
            }
        }
    }

    if (command === "kick") {
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send(":no_entry: Insufficient permissions");
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send(":no_entry: No user mentioned.");
        const reason = args.slice(1).join(" ");
        if (!member.kickable)
            return message.channel.send(":no_entry: I cannot kick this user.");
        if (member) {
            if (!reason) {
                return member.kick().then((member) => {
                    const kicked_embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Kicked Succesfully!")
                        .setAuthor(`Kicked by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was kicked by ${message.author}, no reason was provided.`
                        );
                    message.channel.send(kicked_embed);
                });
            }
            if (reason) {
                member.kick().then((member) => {
                    const banned_embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Kicked Succesfully!")
                        .setAuthor(`Kicked by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was kicked by ${message.author} for ${reason}.`
                        );
                    message.channel.send(banned_embed);
                });
            }
        }
    }
    if (command === "ban") {
        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.channel.send(":no_entry: Insufficient permissions");
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send(":no_entry: No user mentioned.");
        const reason = args.slice(1).join(" ");
        if (!member.kickable)
            return message.channel.send(":no_entry: I cannot ban this user.");
        if (member) {
            if (!reason) {
                return member.ban().then((member) => {
                    const kicked_embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Banned Succesfully!")
                        .setAuthor(`Banned by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was banned by ${message.author}, no reason was provided.`
                        );
                    message.channel.send(kicked_embed);
                });
            }
            if (reason) {
                member.ban().then((member) => {
                    const banned_embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Banned Succesfully!")
                        .setAuthor(`Banned by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was banned by ${message.author} for ${reason}.`
                        );
                    message.channel.send(banned_embed);
                });
            }
        }
    }

    if (command === "add") {
        if (message.member.hasPermission("MANAGE_EMOJIS")) {
            const targetUser = message.mentions.users.first();

            if (!targetUser) {
                message.channel.send(":no_entry: Please specify a user first!");
                return;
            }

            args.shift();

            const roleName = args.join(" ");
            const { guild } = message;

            const role = guild.roles.cache.find((role) => {
                return role.name === roleName;
            });

            if (!role) {
                message.channel.send(
                    `:no_entry: There is no role named as "${roleName}"`
                );
                return;
            }

            const memberUser = guild.members.cache.get(targetUser.id);
            memberUser.roles.add(role);

            const addRoleEmbed = new Discord.MessageEmbed()
                .setTitle("Role Added! :thumbsup:")
                .setColor("RANDOM")
                .setDescription(
                    `:thumbsup: ${role} was Successfully added to ${targetUser} by ${message.author.tag}`
                )
                .setFooter("Copyright @2021 CodeVert");

            message.channel.send(addRoleEmbed);
        } else {
            message.channel.send(":no_entry: Insufficient Permissions");
        }
    }

    if (command === "remove") {
        if (message.member.hasPermission("MANAGE_EMOJIS")) {
            const targetUser = message.mentions.users.first();

            if (!targetUser) {
                message.channel.send(":no_entry: Please specify a user first!");
                return;
            }

            args.shift();

            const roleName = args.join(" ");
            const { guild } = message;

            const role = guild.roles.cache.find((role) => {
                return role.name === roleName;
            });

            if (!role) {
                message.channel.send(
                    `:no_entry: There is no role named as "${roleName}"`
                );
                return;
            }

            const memberUser = guild.members.cache.get(targetUser.id);
            memberUser.roles.remove(role);

            const removeRoleEmbed = new Discord.MessageEmbed()
                .setTitle("Role Removed! :thumbsup:")
                .setColor("RANDOM")
                .setDescription(
                    `:thumbsup: ${role} was Successfully removed to ${targetUser} by ${message.author.tag}`
                )
                .setFooter("Copyright @2021 CodeVert");

            message.channel.send(removeRoleEmbed);
        } else {
            message.channel.send(":no_entry: Insufficient Permissions");
        }
    }

    if (command === "rps") {
        const options = [
            "rock :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: ",
        ];
        const option = options[Math.floor(Math.random() * options.length)];
        message.channel.send(`You got ${option}`);
    }

    if (command === "uptime") {
        let totalSeconds = bot.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds / 60;
        message.channel.send(
            `:low_brightness: **Uptime:** ${days} days, ${hours} hours and ${minutes} minutes!`
        );
    }

    if (command === "purge") {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(
                ":no_entry: Insufficient Permissions! Only Moderators' can use this command!"
            );
        }

        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const args = message.content.split(" ").slice(1);
            const amount = args.join(" ");

            if (!amount)
                return message.channel.send(
                    "You haven't given an amount of messages which should be deleted!"
                );
            if (isNaN(amount))
                return message.channel.send(
                    "The amount parameter isn`t a number!"
                );

            if (amount > 100)
                return message.channel.send(
                    "You can`t delete more than 100 messages at once!"
                );
            if (amount < 1)
                return message.channel.send(
                    "You have to delete at least 1 message!"
                );

            message.channel.messages.get({ limit: amount });
            message.channel.bulkDelete(amount);

            const purgeEmbed = new Discord.MessageEmbed()
                .setTitle("Operation Succesful")
                .setAuthor(`By ${message.author.tag}`)
                .setDescription(
                    `${amount} Messages has been deleted! by ${message.author.tag}`
                )
                .setColor("RANDOM")
                .setThumbnail(message.author.avatarURL);

            message.channel.send(purgeEmbed);

            setTimeout(() => bot.user.lastMessage.delete(1), 5000);
        }
    }

    if (command === "country") {
        const query = args.shift();

        try {
            const { body } = await request.get(
                `https://restcountries.eu/rest/v2/name/${query}`
            );
            const data = body[0];
            const embed = new Discord.MessageEmbed()
                .setColor(0x00ae86)
                .setTitle(data.name)
                .setThumbnail(
                    `https://www.countryflags.io/${data.alpha2Code}/flat/64.png`
                )
                .addField("❯ Population", formatter(data.population), true)
                .addField("❯ Capital", data.capital || "None", true)
                .addField("❯ Currency", data.currencies[0].symbol, true)
                .addField("❯ Location", data.subregion || data.region, true)
                .addField("❯ Demonym", data.demonym || "None", true)
                .addField("❯ Native Name", data.nativeName, true)
                .addField("❯ Area", `${formatter(data.area)}km`, true)
                .addField(
                    "❯ Languages",
                    data.languages.map((lang) => lang.name).join("/")
                );
            return message.channel.send(embed);
        } catch (err) {
            if (err.status === 404)
                return message.channel.send(
                    ":no_entry: Could not find any results."
                );
        }
    }
});

import consola, { Consola } from 'consola';
import {
    Client,
    Collection,
    Intents,
    Message,
    MessageEmbed,
    MessageEmbedOptions,
} from 'discord.js';
import { promisify } from 'util'
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { Schema } from '../interfaces/Schema';
import { Config } from '../interfaces/Config';

const globPromise = promisify(glob);
class Falcon extends Client {
    public logger: Consola = consola;
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public cooldowns: Collection<string, number> = new Collection();
    public schemas: Collection<string, Schema> = new Collection();
    public categories: Set<string> = new Set();
    public prefix: string;
    public owners: Array<string>;
    public config: Config;
    public constructor() {
        super({
            // @ts-ignore
            ws: { intents: Intents.ALL },
            messageCacheLifetime: 180,
            messageCacheMaxSize: 200,
            messageSweepInterval: 180,
            messageEditHistoryMaxSize: 200,
            partials: ['MESSAGE', 'GUILD_MEMBER', 'CHANNEL', 'REACTION', 'USER'],
        });
    }
    public async start(config: Config): Promise<void> {
        this.config = config;
        this.prefix = config.prefix;
        this.owners = config.owners;
        this.login(config.token).catch((e) => this.logger.error(e))

        const commandFiles: string[] = await globPromise(
            `${__dirname}/../commands/**/*{.js,.ts}`
        );
        const eventFiles: string[] = await globPromise(
            `${__dirname}/../events/**/*{.js,.ts}`
        );
        const schemaFiles: string[] = await globPromise(
            `${__dirname}/../models/**/*{.js,.ts}`
        );
        commandFiles.map(async (cmdFile: string) => {
            const cmd = (await import(cmdFile)) as Command;
            this.commands.set(cmd.name, { cooldown: 3000, ...cmd });
            if (cmd.aliases) {
                cmd.aliases.map((alias: string) => this.aliases.set(alias, cmd.name));
            }
            this.categories.add(cmd.category);
        });
        eventFiles.map(async (eventFile: string) => {
            const ev = (await import(eventFile)) as Event;
            console.log(ev)
        });
        schemaFiles.map(async (schemaFile: string) => {
            const sch = (await import(schemaFile)) as Schema;
            this.schemas.set(sch.name, sch);
        });
    }
}
export { Falcon };
const data = new Set();
import math from 'mathjs'
import Discord from 'discord.js')
import { MessageButton } from 'discord.js'
import {
	randomHexColor,
	checkForUpdates,
	getRandomString,
} from '../functions/function'

module.exports = async (options) => {
	checkForUpdates();
	if (!options.message) {
		throw new Error('Weky Error: message argument was not specified.');
	}
	if (typeof options.message !== 'object') {
		throw new TypeError('Weky Error: Invalid Discord Message was provided.');
	}

	if (!options.embed) options.embed = {};
	if (typeof options.embed !== 'object') {
		throw new TypeError('Weky Error: embed must be an object.');
	}

	if (!options.embed.title) {
		options.embed.title = 'Calculator | Weky Development';
	}
	if (typeof options.embed.title !== 'string') {
		throw new TypeError('Weky Error: embed title must be a string.');
	}

	if (!options.embed.color) options.embed.color = randomHexColor();
	if (typeof options.embed.color !== 'string') {
		throw new TypeError('Weky Error: embed color must be a string.');
	}

	if (!options.embed.timestamp) options.embed.timestamp = true;
	if (typeof options.embed.timestamp !== 'boolean') {
		throw new TypeError('Weky Error: timestamp must be a boolean.');
	}

	if (!options.disabledQuery) options.disabledQuery = 'Calculator is disabled!';
	if (typeof options.disabledQuery !== 'string') {
		throw new TypeError('Weky Error: disabledQuery must be a string.');
	}

	if (!options.invalidQuery) {
		options.invalidQuery = 'The provided equation is invalid!';
	}
	if (typeof options.invalidQuery !== 'string') {
		throw new TypeError('Weky Error: invalidQuery must be a string.');
	}

	if (!options.othersMessage) {
		options.othersMessage = 'Only <@{{author}}> can use the buttons!';
	}
	if (typeof options.othersMessage !== 'string') {
		throw new TypeError('Weky Error: othersMessage must be a string.');
	}

	if (data.has(options.message.author.id)) return;
	data.add(options.message.author.id);

	// Button ID generator
	let str = ' ';
	let stringify = '```\n' + str + '\n```';
	const calc_irrc = getRandomString(20);
	const empty_irrc = getRandomString(20);
	const calc_percent = getRandomString(20);
	const calculator_7 = getRandomString(20);
	const calculator_8 = getRandomString(20);
	const calculator_9 = getRandomString(20);
	const calculator_1 = getRandomString(20);
	const calculator_2 = getRandomString(20);
	const calculator_3 = getRandomString(20);
	const calculator_4 = getRandomString(20);
	const calculator_5 = getRandomString(20);
	const calculator_0 = getRandomString(20);
	const calculator_6 = getRandomString(20);
	const calculator_e1 = getRandomString(20);
	const calculator_e2 = getRandomString(20);
	const calculator_dot = getRandomString(20);
	const calculator_plus = getRandomString(20);
	const calculator_star = getRandomString(20);
	const calculator_equal = getRandomString(20);
	const calculator_clear = getRandomString(20);
	const calculator_minus = getRandomString(20);
	const calculator_devide = getRandomString(20);
	const calculator_backspace = getRandomString(20);
	const calculator_uppercase = getRandomString(20);

	// Buttons
	const ac = new MessageButton()
		.setLabel('AC')
		.setCustomId(calculator_clear)
		.setStyle('DANGER');
	const e1 = new MessageButton()
		.setLabel('(')
		.setCustomId(calculator_e1)
		.setStyle('SECONDARY');
	const e2 = new MessageButton()
		.setLabel(')')
		.setCustomId(calculator_e2)
		.setStyle('SECONDARY');
	const uppercase = new MessageButton()
		.setLabel('^')
		.setCustomId(calculator_uppercase)
		.setStyle('SECONDARY');
	const seven = new MessageButton()
		.setLabel('7️')
		.setCustomId(calculator_7)
		.setStyle('PRIMARY');
	const eight = new MessageButton()
		.setLabel('8️')
		.setCustomId(calculator_8)
		.setStyle('PRIMARY');
	const nine = new MessageButton()
		.setLabel('9️')
		.setCustomId(calculator_9)
		.setStyle('PRIMARY');
	const slash = new MessageButton()
		.setLabel('÷')
		.setCustomId(calculator_devide)
		.setStyle('SECONDARY');
	const four = new MessageButton()
		.setLabel('4️')
		.setCustomId(calculator_4)
		.setStyle('PRIMARY');
	const five = new MessageButton()
		.setLabel('5️')
		.setCustomId(calculator_5)
		.setStyle('PRIMARY');
	const six = new MessageButton()
		.setLabel('6️')
		.setCustomId(calculator_6)
		.setStyle('PRIMARY');
	const star = new MessageButton()
		.setLabel('x')
		.setCustomId(calculator_star)
		.setStyle('SECONDARY');
	const one = new MessageButton()
		.setLabel('1️')
		.setCustomId(calculator_1)
		.setStyle('PRIMARY');
	const two = new MessageButton()
		.setLabel('2️')
		.setCustomId(calculator_2)
		.setStyle('PRIMARY');
	const three = new MessageButton()
		.setLabel('3️')
		.setCustomId(calculator_3)
		.setStyle("PRIMARY");
	const minus = new MessageButton()
		.setLabel('-')
		.setCustomId(calculator_minus)
		.setStyle('SECONDARY');
	const zero = new MessageButton()
		.setLabel('0️')
		.setCustomId(calculator_0)
		.setStyle('PRIMARY');
	const dot = new MessageButton()
		.setLabel('.')
		.setCustomId(calculator_dot)
		.setStyle('SECONDARY');
	const equal = new MessageButton()
		.setLabel('=')
		.setCustomId(calculator_equal)
		.setStyle('SUCCESS');
	const plus = new MessageButton()
		.setLabel('+')
		.setCustomId(calculator_plus)
		.setStyle('SECONDARY');
	const backspace = new MessageButton()
		.setLabel('⌫')
		.setCustomId(calculator_backspace)
		.setStyle('DANGER');
	const destroy = new MessageButton()
		.setLabel('DC')
		.setCustomId(calc_irrc)
		.setStyle('DANGER');
	const empty = new MessageButton()
		.setLabel('\u200b')
		.setCustomId(empty_irrc)
		.setStyle('PRIMARY')
		.setDisabled();
	const percent = new MessageButton()
		.setLabel('%')
		.setCustomId(calc_percent)
		.setStyle('SECONDARY');

	// Lock
	const qac = new MessageButton()
		.setLabel('AC')
		.setCustomId(calculator_clear)
		.setStyle('DANGER')
		.setDisabled();
	const qe1 = new MessageButton()
		.setLabel('(')
		.setCustomId(calculator_e1)
		.setStyle('SECONDARY')
		.setDisabled();
	const qe2 = new MessageButton()
		.setLabel(')')
		.setCustomId(calculator_e2)
		.setStyle('SECONDARY')
		.setDisabled();
	const quppercase = new MessageButton()
		.setLabel('^')
		.setCustomId(calculator_uppercase)
		.setStyle('SECONDARY')
		.setDisabled();
	const qseven = new MessageButton()
		.setLabel('7️')
		.setCustomId(calculator_7)
		.setStyle('PRIMARY')
		.setDisabled();
	const qeight = new MessageButton()
		.setLabel('8️')
		.setCustomId(calculator_8)
		.setStyle('PRIMARY')
		.setDisabled();
	const qnine = new MessageButton()
		.setLabel('9️')
		.setCustomId(calculator_9)
		.setStyle('PRIMARY')
		.setDisabled();
	const qslash = new MessageButton()
		.setLabel('÷')
		.setCustomId(calculator_devide)
		.setStyle('SECONDARY')
		.setDisabled();
	const qfour = new MessageButton()
		.setLabel('4️')
		.setCustomId(calculator_4)
		.setStyle('PRIMARY')
		.setDisabled();
	const qfive = new MessageButton()
		.setLabel('5️')
		.setCustomId(calculator_5)
		.setStyle('PRIMARY')
		.setDisabled();
	const qsix = new MessageButton()
		.setLabel('6️')
		.setCustomId(calculator_6)
		.setStyle('PRIMARY')
		.setDisabled();
	const qstar = new MessageButton()
		.setLabel('x')
		.setCustomId(calculator_star)
		.setStyle('SECONDARY')
		.setDisabled();
	const qone = new MessageButton()
		.setLabel('1️')
		.setCustomId(calculator_1)
		.setStyle('PRIMARY')
		.setDisabled();
	const qtwo = new MessageButton()
		.setLabel('2️')
		.setCustomId(calculator_2)
		.setStyle('PRIMARY')
		.setDisabled();
	const qthree = new MessageButton()
		.setLabel('3️')
		.setCustomId(calculator_3)
		.setStyle('PRIMARY')
		.setDisabled();
	const qminus = new MessageButton()
		.setLabel('-')
		.setCustomId(calculator_minus)
		.setStyle('SECONDARY')
		.setDisabled();
	const qzero = new MessageButton()
		.setLabel('0️')
		.setCustomId(calculator_0)
		.setStyle('PRIMARY')
		.setDisabled();
	const qdot = new MessageButton()
		.setLabel('.')
		.setCustomId(calculator_dot)
		.setStyle('SECONDARY')
		.setDisabled();
	const qequal = new MessageButton()
		.setLabel('=')
		.setCustomId(calculator_equal)
		.setStyle('SUCCESS')
		.setDisabled();
	const qplus = new MessageButton()
		.setLabel('+')
		.setCustomId(calculator_plus)
		.setStyle('SECONDARY')
		.setDisabled();
	const qbackspace = new MessageButton()
		.setLabel('⌫')
		.setCustomId(calculator_backspace)
		.setStyle('DANGER')
		.setDisabled();
	const qdestroy = new MessageButton()
		.setLabel('DC')
		.setCustomId(calc_irrc)
		.setStyle('DANGER')
		.setDisabled();
	const qpercent = new MessageButton()
		.setLabel('%')
		.setCustomId(calc_percent)
		.setStyle('SECONDARY')
		.setDisabled();

	// ----------------------------------------------------------------------
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(stringify)
		.setColor(options.embed.color)
		
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	options.message.channel.send(embed).then(async (msg) => {
		msg.edit({
			embed: embed,
			components: [
				{
					type: 1,
					components: [e1, e2, uppercase, percent, ac],
				},
				{
					type: 1,
					components: [seven, eight, nine, slash, destroy],
				},
				{
					type: 1,
					components: [four, five, six, star, backspace],
				},
				{
					type: 1,
					components: [one, two, three, minus, empty],
				},
				{
					type: 1,
					components: [dot, zero, equal, plus, empty],
				},
			],
		});
		async function edit() {
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(stringify)
				.setColor(options.embed.color)
				
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.edit({
				embed: _embed,
				components: [
					{
						type: 1,
						components: [e1, e2, uppercase, percent, ac],
					},
					{
						type: 1,
						components: [seven, eight, nine, slash, destroy],
					},
					{
						type: 1,
						components: [four, five, six, star, backspace],
					},
					{
						type: 1,
						components: [one, two, three, minus, empty],
					},
					{
						type: 1,
						components: [dot, zero, equal, plus, empty],
					},
				],
			});
		}
		async function lock() {
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setColor(options.embed.color)
				.setDescription(stringify)
				
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.edit({
				embed: _embed,
				components: [
					{
						type: 1,
						components: [qe1, qe2, quppercase, qpercent, qac],
					},
					{
						type: 1,
						components: [qseven, qeight, qnine, qslash, qdestroy],
					},
					{
						type: 1,
						components: [qfour, qfive, qsix, qstar, qbackspace],
					},
					{
						type: 1,
						components: [qone, qtwo, qthree, qminus, empty],
					},
					{
						type: 1,
						components: [qdot, qzero, qequal, qplus, empty],
					},
				],
			});
		}

		const calc = msg.createButtonCollector((fn) => fn);

		calc.on('collect', async (btn) => {
			if (btn.clicker.user.id !== options.message.author.id) {
				return btn.reply.send(
					options.othersMessage.replace(
						'{{author}}',
						options.message.author.id,
					),
					true,
				);
			}
			btn.reply.defer();
			switch (btn.id) {
			case calculator_0:
				str += '0';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_1:
				str += '1';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_2:
				str += '2';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_3:
				str += '3';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_4:
				str += '4';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_5:
				str += '5';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_6:
				str += '6';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_7:
				str += '7';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_8:
				str += '8';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_9:
				str += '9';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_plus:
				str += '+';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_minus:
				str += '-';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_devide:
				str += '/';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_uppercase:
				str += '^';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_star:
				str += '*';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_dot:
				str += '.';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_clear:
				str = ' ';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_e1:
				str += '(';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_e2:
				str += ')';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			case calculator_backspace:
				if (str === ' ' || str === '' || str === null || str === undefined) {
					return;
				} else {
					str = str.split('');
					str.pop();
					str = str.join('');

					stringify = '```\n' + str + '\n```';
					edit();
					break;
				}
			case calc_percent:
				str += '%';
				stringify = '```\n' + str + '\n```';
				edit();
				break;
			}

			if (btn.id === calculator_equal) {
				if (str === ' ' || str === '' || str === null || str === undefined) {
					return;
				} else {
					try {
						str += ' = ' + math.evaluate(str);
						stringify = '```\n' + str + '\n```';
						edit();
						str = ' ';
						stringify = '```\n' + str + '\n```';
					} catch (e) {
						str = options.invalidQuery;
						stringify = '```\n' + str + '\n```';
						edit();
						str = ' ';
						stringify = '```\n' + str + '\n```';
					}
				}
			} else if (btn.id === calc_irrc) {
				data.delete(options.message.author.id);
				str = options.disabledQuery;
				stringify = '```\n' + str + '\n```';
				edit();
				calc.stop();
				lock();
			}
		});
	});
};
import { escapeHTML } from '../../../../lib/escapeHTML';
import { callbacks } from '../../../callbacks';

// const generateKeyDefault = (...args) => args.map((item) => JSON.stringify(item)).join('-');

// const mem = (fn, tm = 500, generateKey = generateKeyDefault) => {
// 	const cache = {};
// 	const timeout = {};

// 	const invalidateCache = (key) => delete cache[key];
// 	return (...args) => {
// 		const key = generateKey(...args);
// 		if (!key) {
// 			return fn(...args);
// 		}
// 		if (!cache[key]) {
// 			cache[key] = fn(...args);
// 		}
// 		if (timeout[key]) {
// 			clearTimeout(timeout[key]);
// 		}
// 		timeout[key] = setTimeout(invalidateCache, tm, key);
// 		return cache[key];
// 	};
// };

export const renderMessageBody = (message) => {
	message.html = message.msg?.trim() ? escapeHTML(message.msg.trim()) : '';

	const { tokens, html } = callbacks.run('renderMessage', message);

	return (Array.isArray(tokens) ? tokens.reverse() : [])
		.reduce((html, { token, text }) => html.replace(token, () => text), html);
};

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import _ from "lodash";
import cmd from "./cmds.js";

export default {
	async fetch(request, env, ctx) {
		console.debug("request headers: ", Object.fromEntries(request.headers));
		if (request.headers.get("x-telegram-bot-api-secret-token") !== env.SECRET_TOKEN) {
			return new Response("Forbidden", { status: 403 });
		}
		const body = await request.json();
		console.debug("body: ", body);
		let t = [];

		const message = body.message || body.edited_message || body.channel_post || body.edited_channel_post;
		if (message) {
			t = message.text.split(" ",1);
		} else {
			return new Response("OK", { status: 200 });
		}
		t[1] = _.trimStart(message.text, `${t[0]} `)
		switch (t[0].toLowerCase()) {
			case "/chat_id":
				return cmd.chat_id(message);
			default:
				break;
		}
		return new Response("OK", { status: 200 });
	},
};

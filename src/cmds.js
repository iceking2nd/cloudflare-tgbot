export default {
	chat_id: async function (message) {
		const responseBody = {
			method: "sendMessage",
			chat_id: message.chat.id,
			text: `Your Chat ID: ${message.chat.id}`,
		};
		return new Response(JSON.stringify(responseBody), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			}
		});
	},
	help: async function (message) {
		const responseBody = {
			method: "sendMessage",
			chat_id: message.chat.id,
			text: `Bot commands list:

			/chat_id - Get your chat id
			/help - Print this list
			`,
		}
		return new Response(JSON.stringify(responseBody), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			}
		})
	}
}

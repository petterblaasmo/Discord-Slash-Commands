const { PetterEmbed } = require("../../lib/Embed");

module.exports = {
  name: "ping",
  aliases: ["p"],
  description: "Check the websocket ping",
  run: async (client, message, args) => {
    message.reply({
      embeds: [
        PetterEmbed(
          message,
          "Websocket Ping",
          `⌛ The current websocket ping is: \`${client.ws.ping}ms\``
        ),
      ],
    });
  },
};

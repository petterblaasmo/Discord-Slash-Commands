const { Client, CommandInteraction } = require("discord.js"),
  { SlashEmbed } = require("../../lib/Embed");

module.exports = {
  name: "ping",
  description: "returns websocket ping",
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    interaction.followUp({
      embeds: [
        SlashEmbed(
          interaction,
          "Websocket Ping",
          `⌛ The current websocket ping is: \`${client.ws.ping}ms\``
        ),
      ],
    });
  },
};

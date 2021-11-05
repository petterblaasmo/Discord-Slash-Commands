const { MessageEmbed } = require("discord.js"),
  { SlashEmbed } = require("../../lib/Embed");

module.exports = {
  name: "emit",
  description: "Emit a event to the server",
  run: async (client, interaction, args) => {
    if (!args[0])
      return interaction.followUp({
        embeds: [
          SlashEmbed(
            interaction,
            "No Emit Event",
            `Please provide a emit event using the following command:\`\`\`${client.prefix}emit [event]\`\`\``
          ),
        ],
      });
    try {
      client.emit(args[0], interaction.guild);
    } catch (e) {}
  },
};

const { MessageEmbed } = require("discord.js"),
  { PetterEmbed } = require("../../lib/Embed");

module.exports = {
  name: "emit",
  description: "Emit a event to the server",
  run: async (client, message, args) => {
    if (!args[0])
      return message.reply({
        embeds: [
          PetterEmbed(
            message,
            "No Emit Event",
            `Please provide a emit event using the following command:\`\`\`${client.prefix}emit [event]\`\`\``
          ),
        ],
      });
    try {
      client.emit(args[0], message.guild);
    } catch (e) {}
  },
};

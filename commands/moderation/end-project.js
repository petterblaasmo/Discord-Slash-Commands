const { PetterEmbed } = require("../../lib/Embed");

module.exports = {
  name: "end-project",
  aliases: ["project-end"],
  description: "End a project with a client",
  run: async (client, message, args) => {
    const arg = args.join(" ");
    const channels = await message.guild.channels.fetch();
    const parent = channels.find((ch) => ch.name === arg);
    if (!parent)
      return message.reply({
        embeds: [
          PetterEmbed(
            message,
            "Channel Not Found",
            `Could not find the channel called \`${arg}\``,
            "e"
          ),
        ],
      });
    channels
      .filter((ch) => ch.parentId === parent.id)
      .map(async (ch) => {
        await ch.delete();
      });
    await parent.delete();
    message.reply({
      embeds: [
        PetterEmbed(
          message,
          "Category Removed",
          `Successfully deleted the \`${arg}\` category!`,
          "s"
        ),
      ],
    });
  },
};

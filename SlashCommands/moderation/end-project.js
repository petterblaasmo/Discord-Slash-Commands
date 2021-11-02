const { SlashEmbed } = require("../../lib/Embed");

module.exports = {
  name: "end-project",
  aliases: ["project-end"],
  description: "End a project with a client",
  options: [
    {
      name: "name-of-project",
      type: "STRING",
      description: "Select the name of a project to end",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const arg = args.join(" ");
    const channels = await interaction.guild.channels.fetch();
    const parent = channels.find((ch) => ch.name === arg);
    if (!parent)
      return interaction.followUp({
        embeds: [
          SlashEmbed(
            interaction,
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
    interaction.followUp({
      embeds: [
        SlashEmbed(
          interaction,
          "Category Removed",
          `Successfully deleted the \`${arg}\` category!`,
          "s"
        ),
      ],
    });
  },
};

const { MessageEmbed } = require("discord.js"),
  { SlashEmbed } = require("../../lib/Embed");

module.exports = {
  name: "start-project",
  aliases: ["project-start"],
  description: "Start a project with a new client",
  options: [
    {
      name: "name-of-project",
      type: "STRING",
      required: true,
      description: "Write the name of a project to start",
    },
  ],
  run: async (client, interaction, args) => {
    const arg = args.join(" ");
    if (!arg)
      return interaction.followUp({
        embeds: [
          SlashEmbed(
            interaction,
            "Project Error",
            "```You need to provide a argument to use this command!```",
            "e"
          ),
        ],
      });
    const category = await interaction.guild.channels.create(arg, {
      type: "GUILD_CATEGORY",
      permissionOverwrites: [
        { id: interaction.guild.id, deny: "VIEW_CHANNEL" },
      ],
    });
    await interaction.guild.channels.create("discussion", {
      type: "GUILD_TEXT",
      parent: category.id,
    });
    await interaction.guild.channels.create("commands", {
      type: "GUILD_TEXT",
      parent: category.id,
    });

    interaction.followUp({
      embeds: [
        SlashEmbed(
          interaction,
          "Category Created",
          `Successfully started a new project called \`${arg}\``,
          "s"
        ),
      ],
    });
  },
};

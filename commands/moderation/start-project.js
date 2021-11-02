const { MessageEmbed } = require("discord.js"),
  { PetterEmbed } = require("../../lib/Embed");

module.exports = {
  name: "start-project",
  aliases: ["project-start"],
  description: "Start a project with a new client",
  run: async (client, message, args) => {
    const arg = args.join(" ");
    if (!arg)
      return message.reply({
        embeds: [
          PetterEmbed(
            message,
            "Project Error",
            "```You need to provide a argument to use this command!```",
            "e"
          ),
        ],
      });
    const category = await message.guild.channels.create(arg, {
      type: "GUILD_CATEGORY",
      permissionOverwrites: [{ id: message.guild.id, deny: "VIEW_CHANNEL" }],
    });
    await message.guild.channels.create("discussion", {
      type: "GUILD_TEXT",
      parent: category.id,
    });
    await message.guild.channels.create("commands", {
      type: "GUILD_TEXT",
      parent: category.id,
    });

    message.reply({
      embeds: [
        PetterEmbed(
          message,
          "Category Created",
          `Successfully started a new project called \`${arg}\``,
          "s"
        ),
      ],
    });
  },
};

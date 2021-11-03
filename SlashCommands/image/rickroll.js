const { MessageEmbed } = require("discord.js"),
  { Canvas, resolveImage } = require("canvas-constructor"),
  { SlashEmbed } = require("../../lib/Embed"),
  canvas = require("canvas");

module.exports = {
  name: "rickroll",
  aliases: ["rr"],
  description: "Rickroll a mentioned user",
  options: [
    {
      name: "select-a-user",
      type: "USER",
      description: "Rickroll a mentioned user",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getUser("select-a-user"),
      avatar = await resolveImage(
        user.displayAvatarURL({
          format: "png",
          size: 128,
        })
      ),
      background = await resolveImage("https://i.imgur.com/cRNVEOI.jpg"),
      rickroll = new Canvas(1192, 624)
        .printImage(background, 0, 0, 1192, 624)
        .printCircularImage(avatar, 607, 86, 100, 100)
        .toBuffer();

    interaction.followUp({
      content: `${user} was rickrolled by ${interaction.member.user}`,
      files: [rickroll],
    });
  },
};

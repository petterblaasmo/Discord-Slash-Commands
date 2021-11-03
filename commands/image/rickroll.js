const { MessageEmbed } = require("discord.js"),
  { Canvas, resolveImage } = require("canvas-constructor"),
  { PetterEmbed } = require("../../lib/Embed"),
  canvas = require("canvas");

module.exports = {
  name: "rickroll",
  aliases: ["rr"],
  description: "Rickroll a mentioned user",
  run: async (client, message, args) => {
    const user = message.mentions.members.first();
    if (!user)
      return PetterEmbed(
        message,
        "No User Mention",
        "Please mention a user you want to rickroll!",
        "e"
      );

    const avatar = await resolveImage(
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

    message.reply({
      content: `${user} was rickrolled by ${message.author}`,
      files: [rickroll],
    });
  },
};

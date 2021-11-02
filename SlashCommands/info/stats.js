const stats = require("node-os-utils"),
  { PetterEmbed, SlashFieldEmbed } = require("../../lib/Embed"),
  ms = require("pretty-ms"),
  moment = require("moment"),
  { version } = require("discord.js");

module.exports = {
  name: "stats",
  description: "Get the host stats of the Discord BOT",
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const field = (n, v, s) => {
      return {
        name: n,
        value: "```" + v + "```",
        inline: s === false ? false : true,
      };
    };

    const fields = [
      { name: "\u200B", value: "**Client Information**", inline: false },
      field("Uptime", ms(client.uptime)),
      field("Node", process.version),
      field("D.js", "v" + version),
      { name: "\u200B", value: "**CPU Information**", inline: false },
      field("Model", await stats.cpu.model(), false),
      field("Cores", await stats.cpu.count()),
      field("Usage", (await stats.cpu.usage()) + "%"),
      { name: "\u200B", value: "**Operating System**", inline: false },
      field("Name", await stats.os.oos()),
      field("Platform", `${stats.os.arch()}x ${stats.os.type()}`),
      field("Uptime", ms(await stats.os.uptime())),
    ];

    interaction.followUp({
      embeds: [
        SlashFieldEmbed(
          interaction,
          "System Stats",
          `This is information regarding the system that \`${client.user.tag}\` is hosted on.`,
          fields
        ),
      ],
    });
  },
};

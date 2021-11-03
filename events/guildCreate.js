const client = require("../index"),
  { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js"),
  os = require("os"),
  ms = require("ms");

client.on("guildCreate", async (guild) => {
  console.log(guild);
  const invite = new MessageButton()
    .setLabel(`Invite ${client.user.username}`)
    .setStyle("LINK")
    .setEmoji("905382760162660382")
    .setURL("https://dsc.gg/petter-helper-bot");

  const server = new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setEmoji("905382760171048980")
    .setURL("https://dsc.gg/petter-helper-support");

  const row = new MessageActionRow().addComponents(invite, server);
  const channel = guild.channels.cache.find(
    (ch) =>
      ch.type === "GUILD_TEXT" &&
      ch.permissionsFor(client.user.id).has(["SEND_MESSAGES", "EMBED_LINKS"])
  );
  const dev = await client.users.fetch(client.owner),
    servers = client.guilds.cache.size,
    users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

  const field = (t, v, s) => {
    return {
      name: t,
      value: s === false ? v : "```" + v + "```",
      inline: s === false ? false : true,
    };
  };

  const fields = [
    field("\u200B", "**Bot Information**", false),
    field("Prefix", client.prefix),
    field("Commands", client.commands.size),
    field("Events", client._eventsCount),
    field("\u200B", "**General Information**", false),
    field("Developer", dev.tag),
    field("Users", users),
    field("Servers", servers),
    field(
      "\u200B",
      `${client.user.username} was created <t:${Math.floor(
        client.user.createdAt / 1000
      )}:d> and has been online since ${process.uptime()} <t::R>`,
      false
    ),
  ];

  if (!channel) return;
  channel.send({
    embeds: [
      new MessageEmbed()
        .setTitle("Thank you for adding me to your server")
        .setDescription(
          [
            `Thank you for inviting me to \`${guild.name}\`!`,
            `Please use the \`${client.prefix}help\` command to get a better idea of my features.`,
          ].join("\n")
        )
        .addFields(fields)
        .setColor("BLUE")
        .setFooter(
          [
            `${client.user.username} is under active development`,
            `Join the support Discord if you find any issues`,
          ].join("\n"),
          client.user.displayAvatarURL()
        ),
    ],
    components: [row],
  });
});

const client = require("../index"),
  { ErrorEmbed } = require("../lib/Embed");

client.on("unhandledRejection", async (err) => {
  const channel = client.channels.cache.find(
    (ch) => ch.name === client.config.logs
  );
  channel.send({ embeds: [ErrorEmbed("unhandledRejection", err)] });
});

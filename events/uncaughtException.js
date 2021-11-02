const client = require("../index"),
  { ErrorEmbed } = require("../lib/Embed");

client.on("uncaughtException", async (err) => {
  const channel = client.channels.cache.find(
    (ch) => ch.name === client.config.logs
  );
  channel.send({ embeds: [ErrorEmbed("uncaughtException", err)] });
});

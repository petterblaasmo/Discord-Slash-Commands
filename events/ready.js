const { ClientUser } = require("discord.js");
const client = require("../index");

client.on("ready", () => {
  console.log(`${client.user.tag} is up and ready to go!`);

  let index = 0;
  const servers = client.guilds.cache.size,
    users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

  const statuses = [
    `${servers === 1 ? `${servers} server` : `${servers} servers`}`,
    `${users === 1 ? `${users} user` : `${users} users`}`,
    `${client.config.prefix}help`,
  ];

  setInterval(() => {
    client.user.setActivity(statuses[index], {
      type: "LISTENING",
    });
    index++;
    if (index >= statuses.length) index = 0;
  }, 10000);
});

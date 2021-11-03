const { Client, Collection } = require("discord.js");

const client = new Client({
  intents: 32767,
  ws: {
    properties: {
      $browser: "Discord iOS",
    },
  },
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.owner = "216260135771701248";
client.config = require("./config.json");
client.prefix = client.config.prefix;

// Initializing the project
require("./handler")(client);

client.login(client.config.token);

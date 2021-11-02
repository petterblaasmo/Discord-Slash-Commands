const { MessageEmbed } = require("discord.js");

const PetterEmbed = (m, title, desc, style) => {
  return new MessageEmbed()
    .setTitle(title)
    .setAuthor(`${m.author.tag}`, m.author.displayAvatarURL())
    .setColor(style === "s" ? "GREEN" : style === "e" ? "RED" : "BLUE")
    .setDescription(
      `${desc}\n\nCreated <t:${Math.floor(
        Date.now() / 1000
      )}:R> (<t:${Math.floor(Date.now() / 1000)}:d>)`
    )
    .setFooter(`By: ${m.author.id}`);
};

const SlashEmbed = (m, title, desc, style) => {
  return new MessageEmbed()
    .setTitle(title)
    .setAuthor(`${m.member.user.tag}`, m.member.displayAvatarURL())
    .setColor(style === "s" ? "GREEN" : style === "e" ? "RED" : "BLUE")
    .setDescription(
      `${desc}\n\nCreated <t:${Math.floor(
        Date.now() / 1000
      )}:R> (<t:${Math.floor(Date.now() / 1000)}:d>)`
    )
    .setFooter(`By: ${m.member.user.id}`);
};

const ErrorEmbed = (title, err) => {
  return new MessageEmbed()
    .setTitle(title)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setColor("RED")
    .setDescription(
      "```Error: " +
        err +
        "```" +
        `\n\nCreated <t:${Math.floor(Date.now() / 1000)}:R> (<t:${Math.floor(
          Date.now() / 1000
        )}:d>)`
    )
    .setFooter(`By: ${client.user.id}`);
};

const FieldEmbed = (m, title, desc, fields) => {
  return new MessageEmbed()
    .setTitle(title)
    .setAuthor(m.author.tag, m.author.displayAvatarURL())
    .setColor("BLUE")
    .setDescription(
      `${desc}\n\nCreated <t:${Math.floor(
        Date.now() / 1000
      )}:R> (<t:${Math.floor(Date.now() / 1000)}:d>)`
    )
    .addFields(fields)
    .setFooter(`By: ${m.author.id}`);
};

const SlashFieldEmbed = (m, title, desc, fields) => {
  return new MessageEmbed()
    .setTitle(title)
    .setAuthor(m.member.user.tag, m.member.displayAvatarURL())
    .setColor("BLUE")
    .setDescription(
      `${desc}\n\nCreated <t:${Math.floor(
        Date.now() / 1000
      )}:R> (<t:${Math.floor(Date.now() / 1000)}:d>)`
    )
    .addFields(fields)
    .setFooter(`By: ${m.member.user.id}`);
};

module.exports = {
  PetterEmbed,
  ErrorEmbed,
  FieldEmbed,
  SlashEmbed,
  SlashFieldEmbed,
};

const { MessageEmbed } = require("discord.js"),
  client = require("../index"),
  emoji = client.emoji;

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
    .setFooter(`By: ${m.member.user.id}`);
};

const ErrorEmbed = (title, err) => {
  return new MessageEmbed()
    .setTitle(title)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setColor("RED")
    .setDescription("```Error: " + err + "```")
    .setFooter(`By: ${client.user.id}`);
};

const FieldEmbed = (m, title, desc, fields) => {
  return new MessageEmbed()
    .setTitle(title)
    .setAuthor(m.author.tag, m.author.displayAvatarURL())
    .setColor("BLUE")
    .addFields(fields);
};

const SlashFieldEmbed = (m, title, desc, fields) => {
  return new MessageEmbed()
    .setTitle(title)
    .setAuthor(m.member.user.tag, m.member.displayAvatarURL())
    .setColor("BLUE")
    .addFields(fields);
};

const MusicEmbed = (m, title, desc, color, emoji) => {
  const useEmoji = client.emojis.cache.find(
    (em) =>
      em.id ===
      client.config.emoji.music.filter((e) => e.name === emoji)[0].emoji
  );
  return new MessageEmbed()
    .setAuthor(`${title}`, client.user.displayAvatarURL())
    .setColor(color ? color : "BLUE")
    .setDescription(`${useEmoji} ${desc}`);
};

module.exports = {
  PetterEmbed,
  ErrorEmbed,
  FieldEmbed,
  SlashEmbed,
  SlashFieldEmbed,
  MusicEmbed,
};

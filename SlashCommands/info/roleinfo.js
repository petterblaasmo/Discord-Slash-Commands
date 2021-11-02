const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "roleinfo",
  description: "Get information of a role",
  options: [
    {
      name: "role",
      type: "ROLE",
      description: "Select a role to retrieve information",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const role = interaction.guild.roles.cache.get(args[0]),
      permissions = {
        ADMINISTRATOR: "Administrator",
        VIEW_AUDIT_LOG: "View Audit Log",
        VIEW_GUILD_INSIGHTS: "View Server Insights",
        MANAGE_GUILD: "Manage Server",
        MANAGE_ROLES: "Manage Roles",
        MANAGE_CHANNELS: "Manage Channels",
        KICK_MEMBERS: "Kick Members",
        BAN_MEMBERS: "Ban Members",
        CREATE_INSTANT_INVITE: "Create Invite",
        CHANGE_NICKNAME: "Change Nickname",
        MANAGE_NICKNAMES: "Manage Nicknames",
        MANAGE_EMOJIS: "Manage Emojis",
        MANAGE_WEBHOOKS: "Manage Webhooks",
        VIEW_CHANNEL: "Read Text Channels & See Voice Channels",
        SEND_MESSAGES: "Send Messages",
        SEND_TTS_MESSAGES: "Send TTS Messages",
        MANAGE_MESSAGES: "Manage Messages",
        EMBED_LINKS: "Embed Links",
        ATTACH_FILES: "Attach Files",
        READ_MESSAGE_HISTORY: "Read Message History",
        MENTION_EVERYONE: "Mention @everyone, @here, and All Roles",
        USE_EXTERNAL_EMOJIS: "Use External Emojis",
        ADD_REACTIONS: "Add Reactions",
        CONNECT: "Connect",
        SPEAK: "Speak",
        STREAM: "Video",
        MUTE_MEMBERS: "Mute Members",
        DEAFEN_MEMBERS: "Deafen Members",
        MOVE_MEMBERS: "Move Members",
        USE_VAD: "Use Voice Activity",
        PRIORITY_SPEAKER: "Priority Speaker",
      };

    const state = {
      true: "```Yes```",
      false: "```No```",
    };

    const rolePermissions = role.permissions.toArray();
    const finalPermissions = [];
    for (const permission in permissions) {
      if (rolePermissions.includes(permission))
        finalPermissions.push(`✔️ ${permissions[permission]}`);
      else finalPermissions.push(`❌ ${permissions[permission]}`);
    }

    const position = `\`\`\`${
      interaction.guild.roles.cache.size - role.position
    }/${interaction.guild.roles.cache.size}\`\`\``;

    const embed = new MessageEmbed()

      .setTitle(`${role.name} | Role Information`)
      .setAuthor(
        `${interaction.member.user.tag}`,
        interaction.member.displayAvatarURL()
      )
      .setColor(role.hexColor)
      .addField("Role", `\`\`\`${role.name} (${role.id})\`\`\``, false)
      .addField("Position", position, true)
      .addField("Mentionable", state[role.mentionable], true)
      .addField("Bot Role", state[role.managed], true)
      .addField("Visible", state[role.hoist], true)
      .addField(
        "Creation Date",
        `\`\`\`${moment(role.createdAt).format("DD MMM YYYY")}\`\`\``,
        true
      )
      .addField(
        "Permissions",
        `\`\`\`diff\n${finalPermissions.join("\n")}\`\`\``
      );

    interaction.followUp({ embeds: [embed] });
  },
};

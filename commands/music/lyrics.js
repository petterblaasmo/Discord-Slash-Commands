const player = require("../../client/player"),
  axios = require("axios"),
  { MusicEmbed } = require("../../lib/Embed");

const getLyrics = (song) => {
  new Promise(async (res, rej) => {
    const url = new URL("https://some-random-api.ml/lyrics");
    url.searchParams.append("title", song);
    try {
      const { data } = await axios.get(url.href);
      res(data);
    } catch (e) {
      rej(e);
    }
  });
};

const substring = (length, value) => {
  const replaced = value.replace(/\n/g, "--"),
    regex = `.{1,${length}}`,
    lines = replaced
      .match(new RegExp(regex, "g"))
      .map((line) => line.replace(/--/g, "\n"));
  return lines;
};

const createResponse = async (song) => {
  try {
    const data = await getLyrics(song),
      embeds = substring(4096, data.lyrics).map((value, index) => {
        const isFirst = index === 0;
        return MessageEmbed()
          .setAuthor(
            isFirst ? `Lyrics of ${data.title} - ${data.author}` : null,
            client.user.displayAvatarURL()
          )
          .setColor("BLUE")
          .setThumbnail(isFirst ? { url: data.thumbnail.genius } : null)
          .setDescription(value);
      });
    return { embeds };
  } catch (e) {
    return {
      embeds: [
        MusicEmbed(
          "",
          "Song not found",
          "Please provide a valid song that we can find in our database!",
          "RED",
          "error"
        ),
      ],
    };
  }
};

module.exports = {
  name: "lyrics",
  description: "Display lyrics for a song",
  aliases: ["l"],
  run: async (client, message, args) => {
    const song = args.join(" ");

    const sendLyrics = async (title) => {
      const res = await createResponse(title);
      return message.reply(res);
    };

    if (song) return sendLyrics(song);

    const queue = player.getQueue(message.guild.id);
    if (!queue?.playing)
      return message.reply({
        embeds: [
          MusicEmbed(
            message,
            "No music is playing",
            "Please play a song and re-execute the command to see the lyrics of the song.",
            "RED",
            "error"
          ),
        ],
      });

    return sendLyrics(queue.current.title);
  },
};

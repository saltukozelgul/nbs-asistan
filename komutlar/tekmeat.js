const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(" ");
  if (mesaj.length < 1) return message.reply("**Kime tekme atmak istersin?");
  const embed = new Discord.RichEmbed()
    .setAuthor("")
    .setColor(3447003)
    .setDescription(
      `** ${mesaj} ` +
        ", " +
        message.author.username +
        " Adlı Kişi Sana Tekme Attı.!**"
    )
    .setImage(
      `https://media.tenor.com/images/a919addc6a9e72f2d82155fddff19b3f/tenor.gif`
    );
  return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tekme"],
  permLevel: 0
};

exports.help = {
  name: "tekmeat",
  description: "",
  usage: "tekmeat"
};

var Jimp = require('jimp');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  var user = message.mentions.users.first() || message.author;
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(600, 600)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://i.imgur.com/quM8Wlk.png", (err, avatar) => {
                avatar.resize(400, 120)
                image.composite(avatar, 125, 20).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                image.color([
                  { apply: 'red', params: [100] }
                 ]);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rip',
  description: 'rip.',
  usage: 'rip [kullanıcı]'
};
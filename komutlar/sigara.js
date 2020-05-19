const Discord = require('discord.js');
const delay = ms => new Promise(res => setTimeout(res, ms));
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor("AGA BE İSMAİL ABİ YAK YAK👏\n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setImage("https://images-ext-1.discordapp.net/external/Z3x3Ph-dy5-ig6s5GSu1Gk0ZxiKRSSogsIHmePYQ8cw/https/media.discordapp.net/attachments/457654470457819136/698592605579116650/sekerciburak.png")
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
  message.channel.send(':smoking: :cloud::cloud::cloud:')
.then(nmsg => setTimeout(() => {  nmsg.edit(':smoking:'); }, 5000))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sigara',
  description: 'Hayat zor',
  usage: 'sigara'
};
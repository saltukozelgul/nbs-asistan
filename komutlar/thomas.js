const Discord = require('discord.js');
const delay = ms => new Promise(res => setTimeout(res, ms));
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor("Thomas Shelby Jr.'a selam durun :smoking:🚬 \n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setImage("https://cdn.discordapp.com/attachments/633002311345766420/702546204134735923/536150_391464654210518_438635275_n.png")
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
  aliases: ['thomasshelby' ,'ts' ,'selim'],
  permLevel: 0
};

exports.help = {
  name: 'thomas',
  description: 'Thomas Shelby nedir?',
  usage: 'thomas'
};
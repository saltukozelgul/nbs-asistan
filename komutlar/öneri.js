const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let bug = args.join(" ").slice(0);
let user = message.author.username;
let guild = message.guild.name;
let guildid = message.guild.id;
let kanal = message.channel.name;
let channel = bot.channels.get("696767984336764948")
let embed = new Discord.RichEmbed()
.setTitle("Öneri Sistemi")
.setThumbnail("https://i.dlpng.com/static/png/6865330_preview.png")
.addField("İstek", bug)
.addField("Gönderen", user, true)
.addField("Sunucu", guild, true)
.setColor("#f49542")

message.channel.send(`:white_check_mark:  **| Öneriniz başarıyla iletildi!. \n ${channel}  **`)
channel.send(embed).then(i => i.react("⏳"))


  


}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0  
};

exports.help = {
  name: 'öneri',
  description: 'Bota eklenmesini istediğiniz önerilerinizi gönderin.',
  usage: '//öneri (öneriniz)'
}
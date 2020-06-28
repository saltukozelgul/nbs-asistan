const Discord = require('discord.js');
const db = require('quick.db')
const { randomRange, verify } = require('../util/util.js');



exports.run = async (client, message, args) => {

if (args[0] === 'al'){
  let user = message.author
  let miktar = args[2]
  let opponent = message.mentions.users.first()
  var para = db.fetch(`para_${opponent.id + message.guild.id}`);
  let borc_veren = db.fetch(`borcveren_${user.id}`);
  if (para < miktar) return message.reply('Karşı tarafın yeteri kadar parası yok!')
  if (borc_veren) return message.reply('Zaten borcun var önce onu öde')
  if (opponent.bot) return message.reply('Botlardan borç alamazsın!');
  if (!opponent) return message.reply("Kimden borç alacaksın?")
  if (!miktar) return message.reply('Lütfen miktarını da giriniz!')
  if (opponent.id === message.author.id) return message.reply('Kendinden mi borç alcan kral?');
  await message.channel.send(`${opponent}, borç vermeyi kabul ediyor musun? (\`evet\` veya \`hayır\` olarak cevap veriniz.)`);
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					return message.channel.send(`Borç alma iptal edildi.`);
          };
  db.set(`borcveren_${user.id}`, `${opponent.username}`);
  db.set(`borcmiktari_${user.id}`, `${miktar}`);
  db.set(`borcverenid_${user.id}`, `${opponent.id}`)
  ///// Paraları ayarlıyorum
  db.add(`para_${message.author.id + message.guild.id}`, `${miktar}`);
  db.add(`para_${opponent.id + message.guild.id}`, `-${miktar}`);
  message.channel.send('Borç alındı en kısa zamanda ödemen dileğiyle!')
    }
  
if (args[0] === 'listesi') {
  let user = message.author
  let borc_miktarı = db.fetch(`borcmiktari_${user.id}`);
  let borc_veren = db.fetch(`borcveren_${user.id}`);
  console.log(borc_miktarı)
  console.log(borc_veren)
  var para = db.fetch(`para_${message.author.id + message.guild.id}`);
    var banka = new Discord.RichEmbed()
      .setColor("#FB529C")
      .setTitle("Borç Sistemi")
      .addField(`Kime borcun var?`, `${borc_veren || 'Kimseye'} `)
      .addField(`Borç Miktarı:`, `${borc_miktarı || 'Yok'}`)
      .setThumbnail("https://i.imgur.com/jbgUeL2.png")
      .setTimestamp();
    message.channel.sendEmbed(banka);
    
  }
if (args[0] === 'öde') {
  let user = message.author
  let opponent = db.fetch(`borcverenid_${user.id}`);
  var para = db.fetch(`para_${message.author.id + message.guild.id}`);
  let borc_miktarı = db.fetch(`borcmiktari_${user.id}`);
  console.log(borc_miktarı)
  if (!borc_miktarı) return message.channel.send('Mevcut borcunuz bulunmamaktadır.')
  if (para >= borc_miktarı) {
     message.channel.send(`${borc_miktarı}₺ borcunuz ödendi teşekkür ederiz :)`)
    db.delete(`borcveren_${user.id}`);
    db.delete(`borcmiktari_${user.id}`);
    db.add(`para_${message.author.id + message.guild.id}`, `-${borc_miktarı}`);
    db.add(`para_${`${opponent}` + message.guild.id}`, `${borc_miktarı}`);
  }
  else if (para <= borc_miktarı) {
    message.channel.send('Yeterli paranız yok!')
  }
  
  
}
if (!args[0]) {
      const embed = new Discord.RichEmbed()
  .setAuthor("Şirket komutları\n")
  .setColor("RANDOM")
  .setThumbnail('https://i.imgur.com/jbgUeL2.png')
	.addField('**//borç al [kimden_alacaksin] [miktar]**', 'Borç almanı sağlar', false)
	.addField('**//borç listesi**', 'Borçlarınızı gösterir', false)
	.addField('**//borç öde**', 'Borcunu ödenemi sağlar', false)
  message.channel.send({embed});
}
  console.log(`Borçal Komutu Kullanıldı:`+ `${message.guild.name}`)
};  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['borç'],
  permLevel: 0
};

exports.help = {
  name: 'borç',
  description: 'Bayramlarda herkese harçlık vermek için kullanıyorum',
  usage: '//borçal <isim> <miktar>'
};

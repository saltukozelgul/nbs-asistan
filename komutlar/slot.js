const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍌'];
const db = require('quick.db')

exports.run = function(client, message) { 
  
if (message.channel.id === '705117742461878389' || message.channel.id === '708376290201305148' || message.channel.name === 'las-vegas') // Hangi kanalda kullanılmasını istiyorsanız o kanalın adını ya da ID giriniz.
  {  var para = db.fetch(`para_${message.author.id + message.guild.id}`)
	var slot1 = slots[Math.floor(Math.random() * slots.length)];
	var slot2 = slots[Math.floor(Math.random() * slots.length)];
	var slot3 = slots[Math.floor(Math.random() * slots.length)];
	
  if (para < 10) {
    message.channel.send('Oynamak için yeterli paranız yok \n Gerekli Miktar **10₺**')
    
  }
  
	else {if (slot1 === slot2 && slot1 === slot3) {
    const kazan = new Discord.RichEmbed()
    .setAuthor('NBS Slot Sistemi')
    .setDescription(` ${slot1} : ${slot2} : ${slot3} \n Tebrikler, \`başardınız!\` \n  ve **70xp**&**20₺** kazandınız!`)
    .setFooter('Oynamak için 10₺ hesabından kesildi!')
    message.channel.send(kazan)
		message.channel.send(stripIndents`
		${slot1} : ${slot2} : ${slot3}
		Tebrikler, \`başardınız!\`
    ve **70xp** kazandınız!
    ve **20₺** kazandınız!
		`); 
    db.add(`puancik_${message.author.id + message.guild.id}`, 70)
    db.add(`para_${message.author.id + message.guild.id}`, +10)
	} 
  else if (message.author.id === '211481492772212093952') {
        message.channel.send('**10₺ slot oynamak için hesabından kesildi**')
        const kazan = new Discord.RichEmbed()
    .setAuthor('NBS Slot Sistemi')
    .setDescription(` ${slot1} : ${slot2} : ${slot3} \n Tebrikler, \`başardınız!\` \n  ve **70xp**&**20₺** kazandınız!`)
    db.add(`puancik_${message.author.id + message.guild.id}`, 80)
    db.add(`para_${message.author.id + message.guild.id}`, -5)
  }
  else {
       const kaybet = new Discord.RichEmbed()
    .setAuthor('NBS Slot Sistemi')
    .setDescription(` ${slot1} : ${slot2} : ${slot3} \n Maalesef ki, \`kaybettin!\``)
      .setFooter('Oynamak için 10₺ hesabından kesildi!')
    message.channel.send(kaybet)
    db.add(`para_${message.author.id + message.guild.id}`, -10)
	}
}}

  else return message.channel.send('Lütfen slot oyununu Las Vegas dışında bir kanalda oynamayın.')
  console.log(`Slot Komutu Kullanıldı: `+ `${message.guild.name}`)
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['slot', 'kumar'],
  permLevel: 0
};

exports.help = {
  name: 'slots', 
  description: 'Slots oyunu oynatır',
  usage: 'slots'
};
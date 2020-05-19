const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/util.js');
const db = require('quick.db')
let oyndurum = new Set();
const delay = ms => new Promise(res => setTimeout(res, ms));

exports.run = async (client, message, args) => {
  
	let opponent = message.mentions.users.first()
	if (!opponent) return message.reply("Oynamak istediğin kişiyi etiketlemelisin!")
  
  if (opponent.bot) return message.reply('Botlar ile kelime oyunu oynayamazsın!');
  if (opponent.id === message.author.id) return message.reply('Kendin ile kelime oyunu oynayamazsın!');
		if (oyndurum.has(message.channel.id)) return message.reply('Kanal başına sadece bir kelime oyunu meydana gelebilir.');
		try {
			if (!opponent.bot) {
        await message.channel.send(`${opponent}, kelime oyunu isteği geldi. İsteği kabul ediyor musun? (\`evet\` veya \`hayır\` olarak cevap veriniz.)`);
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					return message.channel.send(`Düello kabul edilmedi...`);
				}
			}
      
   message.channel.send('Kelime 5 saniye sonra görünecek hazır ol!').then(message => {
     oyndurum.add(message.channel.id)
      var kelimeler = ['saltuk', 'yemek', 'sal' , 'sibop adamdır' , 'kırmızı arabanın yanındaki mavi araba'];
      var kelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];
      setTimeout(() => { message.edit(`Hey hemen **\`${kelime}\`** demen lazım!`); }, 5000);
     const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === message.author.id | opponent.id && (kelime.includes(value));
		};
     
     
     message.channel.awaitMessages(filter, {
          max: 1,
          time: 100000
        })
       .then((collected) => {
            const embed = new Discord.RichEmbed()
            .setDescription(`:tada: Tebrikler, Kazanannn: ${collected.first().author} \n Oyunu kazanarak **10 xp** kazandın`)
            .setColor("green")
            message.channel.send(embed)
             db.add(`puancik_${collected.first().author.id + message.guild.id}`, 10)
            oyndurum.delete(message.channel.id)
          })
          .catch(function(){
            message.channel.send('Size verilen süre doldu');
            oyndurum.delete(message.channel.id)
          });
   })
		} catch (err) {
			oyndurum.delete(message.channel.id);
			console.log(err)
		}
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kelimeoyunu'],
  permLevel: `Yetki gerekmiyor.`
};

exports.help = {
  name: 'tsustum',
  description: 'İstediğiniz bir kişi ile kelime düellosu atarsınız!',
  usage: 'tsustum <@kullanıcı>'
};
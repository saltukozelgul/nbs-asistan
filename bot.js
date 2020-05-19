const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const DBM = {};
const DiscordJS = DBM.DiscordJS = require('discord.js');
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
var cons = require('consolidate');
const db = require('quick.db')
const bot = new Discord.Client({
  disableEveryone: true
});
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};





client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selam') {
    msg.reply('Selamlar,  hoş geldin ^^');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });




client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
var oyun = [  
        "//yardım",
        "Coded by Saltuş",
        "Müzik desteği geldi!",
        "//şirket",
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random]);
        }, 20000);



app.get("/", (request, response) => {
  console.log(Date.now() + " Ping alındı aktivite devam ediyor.");
  response.sendStatus(200)
  //response.render(__dirname+'/index.html')
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  console.log("Bip bip")
}, 10000);


 




//////////////////////// LEVEL  SİSTEMİ /////////////
var Jimp = require('jimp');
const config = require('./ayarlar.json');
let dbb = JSON.parse(fs.readFileSync("./database.json", "utf8"));

client.on("message", message => {
    if (message.author.bot) return; // ignore bots
    let u = message.mentions.users.first() || message.author;
    var xp = db.fetch(`puancik_${u.id + message.guild.id}`);
    var lvl = db.fetch(`seviye_${u.id + message.guild.id}`); 
    var para = db.fetch(`para_${u.id + message.guild.id}`);
    // if the user is not on db add the user and change his values to 0
    if (!dbb[message.author.id]) dbb[message.author.id] = {
        xp: 0,
        level: 0,
        coin: 0
      };
    dbb[message.author.id].xp++;
    if (message.author.id=="22") {
    db.add(`puancik_${message.author.id + message.guild.id}`, 0);}
    else if (message.content.length >= 4) {
    db.add(`puancik_${message.author.id + message.guild.id}`, 1);}
    let userInfo = dbb[message.author.id]; 
   if(xp > lvl*25) {
        db.add(`seviye_${u.id + message.guild.id}`, 1)
        db.add(`para_${u.id + message.guild.id}`, lvl*20);
        let embedlevel = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Holeeeyy 🥳')
        .setDescription(`${message.author}, \n Tebrikler seviye atladın! Yeni levelin: **${lvl+1}** \n **//top5**'e girmeye adım adım yaklaşıyorsun.`)
        .setThumbnail('https://cdn.discordapp.com/attachments/682314043238645866/702281943097671771/Mee6_Level_Up_Gif.gif')
        .setFooter('NBS Level Sistemi')
        message.channel.sendEmbed(embedlevel)
        userInfo.level++
        userInfo.xp = 0
        userInfo.coin += 10
        db.set(`puancik_${u.id + message.guild.id}`, 0)
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd === "lasxqweaseqwve") {
        let userInfo = dbb[message.author.id];
        let member = message.mentions.members.first();
        let embed = new Discord.RichEmbed()
        .setAuthor('NBS Level Sistemi','https://media.forgecdn.net/avatars/67/932/636163115695704686.png')
        .setColor(0x4286f4)
        .setThumbnail(message.author.avatarURL)
        .addField("Paran", userInfo.coin+"₺")
        .addField("Levelin", userInfo.level)
        .addField("XP'in", userInfo.xp+"/150");
        if(!member) return message.channel.sendEmbed(embed)
        let memberInfo = dbb[member.id]
        let embed2 = new Discord.RichEmbed()
        .setAuthor('NBS Level Sistemi','https://media.forgecdn.net/avatars/67/932/636163115695704686.png')
        .setColor(0x4286f4)
        .setThumbnail(member.user.avatarURL)
        .addField("Para", memberInfo.coin+"₺")
        .addField("Level", memberInfo.level)
        .addField("XP ", memberInfo.xp+"/150")
        message.channel.send(embed2)
    }
    if(cmd === "hesoyam") {
        let u = message.mentions.users.first() || message.author;
        let userInfo = dbb[message.author.id];
        let member = message.mentions.members.first();
        let sal = client.users.get('')
        message.delete()
         const ozelmesajuyari = new Discord.RichEmbed()
        }
    
    

    
    fs.writeFile("./database.json", JSON.stringify(dbb), (x) => {
        if (x) console.error(x)
      });
    db.set('level_'+message.author.id, userInfo.level)
})
//////////////////////// özlüsöz  SİSTEMİ ///////////// 

client.on("message", message => {
  if (message.content.startsWith (prefix + "özlüsöz")) {
    var number = 3;
    var imageNumber = Math.floor (Math.random() * number) + 1;
    message.channel.send ({files: ["./resimler/" + imageNumber + ".png"]})
}
  
})

//////////////////////// özlüsöz  SİSTEMİ ///////////// 

var usage = "`//adam-as <channel id> <kelime>`\n`Örnek: //adam-as 342738041187598337 araba`\n `Bana özelden yazın ki kelimenizi diğerleri görmesin.` ";
var letters = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];
var unicode = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var games = [];

var stages = [`\`\`\`
/---|
|   
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|   |
| 
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|  /
|
\`\`\`
`, `\`\`\`
/---|
|   o ~ oh be öldüm 
|  /|\\
|  / \\
|
\`\`\`
`];


function generateMessage(phrase, guesses) {
	var s = "";
	for(var i = 0; i < phrase.length; i++) {
		if(phrase[i] == ' ')
			s += " ";
		else {
			var c = phrase[i];
			if(guesses.indexOf(c) == -1)
				c = "\\_";
			s += "__" + c + "__ ";
		}
	}
	return s;
}

function nextLetter(message, index, word) {
    message.react(letters[index]).then(r => {
		index++;
		if(index < letters.length) {
			if(index == 13) {
				message.channel.send(generateMessage(word, [])).then(m => {
					games.push({
						stage: 0,
						msg0: message,
						msg1: m,
						phrase: word,
						guesses: []
					});
					nextLetter(m, index);
				});
			} else {
				nextLetter(message, index, word);
			}
		}
	});
}

client.on('messageReactionAdd', (reaction, user) => {
	var msg = reaction.message;
	if(!user.bot) {
		for(var i = 0; i < games.length; i++) {
			var game = games[i];
			if((msg.id == game.msg0.id || msg.id == game.msg1.id) && game.stage < stages.length) {
				var letter = unicode[letters.indexOf(reaction.emoji.name)];
				
				reaction.fetchUsers().then(usrs => {
					var reactors = usrs.array();
					var remove_next = function(index) {
						if(index < reactors.length)
							reaction.remove(reactors[index]).then(() => remove_next(index + 1));
					};
					
					remove_next(0);
				});
				
				if(game.guesses.indexOf(letter) == -1) {
					game.guesses.push(letter);
					if(game.phrase.indexOf(letter) == -1) {
						game.stage ++;
						game.msg0.edit(stages[game.stage]);
					} else {
						var sik = true;
						for(var j = 0; j < game.phrase.length; j++) {
							var c = game.phrase[j];
							if(c != ' ' && game.guesses.indexOf(c) == -1) {
								sik = false;
							}
						}
						
						if(sik) {
							game.msg0.edit(stages[game.stage].replace("o", "o ~ bugün de ölmedik :/"));
						}
						
						game.msg1.edit(generateMessage(game.phrase, game.guesses));
					}
				}
			}
			games[i] = game;
		}
	}
});

client.on('message', msg => {
    if(msg.content.startsWith("//adam-as")) {
        var words = msg.content.split('\n')[0].split(' ');
        if(words.length < 2) {
            msg.reply(usage);
        } else {
            var channel = client.channels.find('id', words[1]);
			var word = words.slice(2).join(' ').toLowerCase().replace(/[^a-z\s:]/g, '');
            if(channel != null) {
                channel.send(stages[0]).then(m => {
                    nextLetter(m, 0, word);
                });
            } else {
                msg.reply("Kanal ID'si yanlış `" + words[1] + "` \n" + usage);
            }
        }
    }
});

//////////////////////////// afkkk sistem

client.on('message', async message => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
  let nick = db.fetch(`nick_${message.author.id}`)
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
      db.delete(`nick_${message.author.id}`)
        message.member.setNickname(nick);
    }
    if (afkkullanıcı) return message.channel.send(`${message.author}\`${kullanıcı.tag}\` şu anda AFK üzgünüm.  Sebep : \`${sebep}\``)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
      db.delete(`nick_${message.author.id}`)
        message.member.setNickname(nick);
    }
  }
});

/////// sürekli oda
//Odada 7/24 Kalma
client.on('ready', ()=>{
client.channels.get('343113607476936704').join()
})

//// MÜZİK 

const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const queue = new Map();
const youtube = new YouTube("AIzaSyAK-LccpXHEe70DCJiHIPec52cTPR4UWVE");

client.on('message', async msg => {
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'çal' || command === 'p') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('0xc984ff')
    .setDescription(':warning: ▫ İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('0xc984ff')
    .setTitle(':warning: ▫ İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('0xc984ff')
      .setTitle(':warning: ▫ Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`**▶ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle('Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir.')
         .setColor('0xc984ff'));
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0xc984ff')
            .setDescription(':warning: ▫ **Şarkı seçmediğiniz için iptal edildi**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('0xc984ff')
          .setDescription('▫ **Aradım ama hiçbir şey çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'geç' || command === 's') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('0xc984ff')
    .setDescription('<a:frograinbow:488978511474982933> ▫ **Lütfen öncelikle sesli bir kanala katılınız**.'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('0xc984ff')
     .setTitle('<a:frograinbow:488978511474982933> ▫ **Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim**');
		return undefined;
	} else if (command === 'durdur' || command === 'stop') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('0xc984ff')
    .setDescription('**:warning: | Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('0xc984ff')
     .setTitle(':warning: **▫ Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik Bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('0xc984ff')
    .setDescription(':warning: **▫ Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('0xc984ff')
     .setTitle(':warning:▫ **Çalmayan bir şeyin sesini kısamam**'));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`:warning: Şuanki ses seviyesi: **${serverQueue.volume}**`)
    .setColor('0xc984ff'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:hammer:  Ses seviyesi ayarlanıyor: **${args[1]}**`)
    .setColor('0xc984ff'));                             
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(":warning: ▫**Çalan müzik bulunmamakta**")
    .setColor('0xc984ff'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('0xc984ff')
    .setTitle("▫ Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(":warning: ▫ **Sırada müzik bulunmamakta**")
    .setColor('0xc984ff'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('0xc984ff')
     .setTitle('▫ Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:pause_button: Müzik Durduruldu!**")
      .setColor('0xc984ff'));
		}
		return msg.channel.send(':warning: ▫ **Çalan Müzik Bulunmamakta**');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:arrow_forward: Müzik Devam Etmekte!**")
      .setColor('0xc984ff'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(":warning: ** ▫ Çalan bir şey  bulunmamakta.**")
    .setColor('0xc984ff'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:warning: **Şarkı sisteminde hata: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`:warning: **Şarkı sisteminde hata: ${error}**`)
      .setColor('0xc984ff'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:arrow_heading_up:  **${song.title}** kuyruğa eklendi!`)
    .setColor('0xc984ff'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ' :x:  ▫ **Yayın Akış Hızı Yeterli Değil.**') console.log('Müzik Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setTitle("**Müzik başlatıldı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("Süre", `${song.durationm} dakika ${song.durations} saniye`, true)
  .setColor('0xc984ff'));
}

//// MESAJ LOG
client.on("message", async (message) => {
if(message.author.bot || message.channel.type === "dm") return;
  let sChannelanan = message.guild.channels.find(c => c.name === "log-deneme")
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setAuthor(`Mesaj Gönderildi`, message.author.avatarURL)
  .addField("Kullanıcı", message.author)
  .addField("Mesaj", message.content, true)
  .addField("Kanal Adı", message.channel.name, true)
  .addField("Mesaj ID", message.id, true)
  .addField("Kullanıcı ID", message.author.id, true)
  .setThumbnail(message.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannelanan.send(embed)
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannelanan = newMessage.guild.channels.find(c => c.name === "log-deneme")
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .addField("Mesaj ID", newMessage.id, true)
  .addField("Kullanıcı ID", newMessage.author.id, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannelanan.send(embed)
});
client.on("messageDelete", async (deletedMessage) => {
if(deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  let sChannelanan = deletedMessage.guild.channels.find(c => c.name === "log-deneme")
  let embed = new Discord.RichEmbed()
  .setColor("RED")
  .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL)
  .addField("Kullanıcı", deletedMessage.author)
  .addField("Silinen Mesaj", deletedMessage.content, true)
  .addField("Kanal Adı", deletedMessage.channel.name, true)
  .addField("Mesaj ID", deletedMessage.id, true)
  .addField("Kullanıcı ID", deletedMessage.author.id, true)
  .setThumbnail(deletedMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours()+3}:${deletedMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannelanan.send(embed)
});
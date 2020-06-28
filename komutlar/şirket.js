const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const { randomRange, verify } = require('../util/util.js');


exports.run = async (bot, message, args) => {
  if (args[0] === "kur") {
    if (!args[2]) {
      args[2] = ""
    }
    let isim = args[1] + " " + args[2];
    let sirket = db.fetch(`sirkettipi_${message.author.id+ message.guild.id}`);
    if (!args[1]) return message.channel.send("Lütfen şirket isimini de giriniz!");
    if (sirket) return message.channel.send("Zaten şirketiniz var!");
    db.set(`sirkettipi_${message.author.id + message.guild.id}`, "Bakkal Sahibi")
    db.set(`sirketgelir_${message.author.id+ message.guild.id}`, 100)
    db.set(`sirketismi_${message.author.id+ message.guild.id}`, `${isim}`)
    db.set(`sirketsahibi_${message.author.id+ message.guild.id}`, `${message.member.displayName}`);
    db.set(`sirketgelistir_${message.author.id+ message.guild.id}`, 1000);
    message.channel.send("Şirketiniz başarıyla kuruldu!")
  }
  else if (args[0] === "isim") {
    if (!args[2]) {
      args[2] = " "
    }
    if (!args[3]) {
      args[3] = " "
    }
    if (!args[4]) {
      args[4] = " "
    }
    if (!args[5]) {
      args[5] = " "
    }
    let isim = args[1] + " " + args[2] + "" + args[3] + "" + args[4] + "" + args[5];
    let sirket = db.fetch(`sirkettipi_${message.author.id+ message.guild.id}`);
    if (!isim) return message.channel.send("Lütfen şirket isimini de giriniz!");
    db.set(`sirketismi_${message.author.id+ message.guild.id}`, `${isim}`)
    message.channel.send("Şirketiniziz ismi başarıyla değiştirildi!")
  } 
  else if (args[0] === "durum") {
    let sirkettipi = db.fetch(`sirkettipi_${message.author.id+ message.guild.id}`);
    if (!sirkettipi) return message.channel.send("Önce bir şirket kurmalısın");
    let sirketsahibi = db.fetch(`sirketsahibi_${message.author.id+ message.guild.id}`);
    let sirketisim = db.fetch(`sirketismi_${message.author.id+ message.guild.id}`);
      let sirketgelir = db.fetch(`sirketgelir_${message.author.id+ message.guild.id}`);
    var banka = new Discord.RichEmbed()
      .setColor("#FB529C")
      .setTitle("Şirket Sistemi")
      .addField(`Şirket Sahibi`, `${sirketsahibi}`)
      .addField(`Şirketin İsmi`, `${sirketisim}`)
      .addField(`Şirket Tipi`, `${sirkettipi}`)
      .addField(`Şirket Geliri`, `${sirketgelir+"₺"}`)
      .addField(
        "Şirket ne işe yarar?:",
        "Gündelik olarak kazandığınız parayı arttırır."
      )
      .setThumbnail("https://cdn.iconscout.com/icon/free/png-256/company-27-152146.png")
      .setTimestamp();
    message.channel.sendEmbed(banka);
  }
  else if (args[0] === "kapat") {
    let sirkettipi = db.fetch(`sirkettipi_${message.author.id+ message.guild.id}`);
    if (!sirkettipi) return message.channel.send("Önce bir şirket kurmalısın");
    let sirketsahibi = db.fetch(`sirketsahibi_${message.author.id+ message.guild.id}`);
    db.delete(`sirkettipi_${message.author.id+ message.guild.id}`);
    db.delete(`sirketsahibi_${message.author.id+ message.guild.id}`);
    db.delete(`sirketismi_${message.author.id+ message.guild.id}`)
    db.delete(`sirkettipi_${message.author.id+ message.guild.id}`);
    message.channel.send('Şirketiniz kapatıldı!')
    
  }
  else if (args[0] === "topla") {
  let sirkettipi = db.fetch(`sirkettipi_${message.author.id+ message.guild.id}`);
  if (!sirkettipi) return message.channel.send("Önce bir şirket kurmalısın");
  let sonalims = db.fetch(`gunluksirket_${message.author.id + message.guild.id}`);
  let bugun = moment().format("L");
  let sirketgelir = db.fetch(`sirketgelir_${message.author.id+ message.guild.id}`);
    if (sonalims != bugun + `${message.guild.id}`) {
    db.set(`gunluksirket_${message.author.id + message.guild.id}`, bugun);
    console.log("Son alma tarihi 'şirket' güncellendi!");
    const basarili = new Discord.RichEmbed().setDescription(
      `**Günlük şirket değerin olan ${sirketgelir}₺ hesabınıza aktarıldı**`
    );
    message.channel.send(basarili);
    db.add(`para_${message.author.id + message.guild.id}`, `${sirketgelir}`);
    } 
    else if (sonalims = bugun + `${message.guild.id}`) {
      console.log(sonalims);
    const hatali = new Discord.RichEmbed()
      .setDescription(`\n \n **Bugün zaten günlük şirket kredini aldın!**`)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/682314043238645866/702282289530273853/Yanp_Sonen_Unle_Gif.gif"
      );
    message.channel.send(hatali);  
    }
  }
  else if (args[0] === "geliştir") {
  let sirkettipi = db.fetch(`sirkettipi_${message.author.id+ message.guild.id}`);
  let sirketgelir = db.fetch(`sirketgelir_${message.author.id+ message.guild.id}`);
  if (!sirkettipi) return message.channel.send("Önce bir şirket kurmalısın");
  let sirketgelistir = db.fetch(`sirketgelistir_${message.author.id+ message.guild.id}`);
  var para =  db.fetch(`para_${message.author.id + message.guild.id}`)
  let user = message.author
  message.channel.send(`**Şirketinizi geliştirmek istediğinizden emin misiniz? Tutar: ${sirketgelistir} ** \n(\`evet\` veya \`hayır\` olarak cevap veriniz.)`)
  const verification = await verify(message.channel, user);
    if (!verification) {
            return message.channel.send(`Geliştirme iptal edildi.`);
          } 
      if (sirkettipi = sirketgelir === 100 && para >= sirketgelistir) {
      db.set(`sirkettipi_${message.author.id+ message.guild.id}`, "Market Sahibi")
      db.set(`sirketgelir_${message.author.id+ message.guild.id}`, 200)
      db.add(`para_${user.id + message.guild.id}`, -1000)
      db.set(`sirketgelistir_${message.author.id+ message.guild.id}`, 2500);
      message.channel.send("Şirketiniz başarıyla geliştirildi artık Market Sahibisiniz")      
    }
      else if (sirkettipi = sirketgelir === 200 && para >= sirketgelistir) {
      db.set(`sirkettipi_${message.author.id+ message.guild.id}`, "Süper-Market Sahibi")
      db.set(`sirketgelir_${message.author.id+ message.guild.id}`, 350)
      db.add(`para_${user.id + message.guild.id}`, -2500)
      db.set(`sirketgelistir_${message.author.id+ message.guild.id}`, 7500);
      message.channel.send("Şirketiniz başarıyla geliştirildi artık Süper-Market Sahibisiniz")   
    }
      else if (sirkettipi = sirketgelir === 350 && para >= sirketgelistir) {
      db.set(`sirkettipi_${message.author.id+ message.guild.id}`, "AVM Sahibi")
      db.add(`para_${user.id + message.guild.id}`, -7500)
      db.set(`sirketgelir_${message.author.id+ message.guild.id}`, 750)
      db.set(`sirketgelistir_${message.author.id+ message.guild.id}`, 35000);
      message.channel.send("Şirketiniz başarıyla geliştirildi artık AVM Sahibisiniz")   
    }
      else if (sirkettipi = sirketgelir === 750 && para >= sirketgelistir) {
      db.set(`sirkettipi_${message.author.id+ message.guild.id}`, "AVM Zinciri Sahibi")
      db.add(`para_${user.id + message.guild.id}`, -35000)
      db.set(`sirketgelir_${message.author.id+ message.guild.id}`, 1500)
      db.set(`sirketgelistir_${message.author.id+ message.guild.id}`, 60000);
      message.channel.send("Şirketiniz başarıyla geliştirildi artık AVM Zinciri Sahibisiniz")   
    }
      else if (sirkettipi = sirketgelir === 1500 && para >= sirketgelistir) {
      db.set(`sirkettipi_${message.author.id+ message.guild.id}`, "Fabrika Sahibi")
      db.add(`para_${user.id + message.guild.id}`, -60000)
      db.set(`sirketgelir_${message.author.id+ message.guild.id}`, 5000)
      db.set(`sirketgelistir_${message.author.id+ message.guild.id}`, 100000);
      message.channel.send("Şirketiniz başarıyla geliştirildi artık Fabrika Sahibisiniz")   
    }
      else if (para < sirketgelistir){
      message.channel.send("Yeterli para yok!")
    }
  }
  else if (args[0] === "tipleri")  {   
    const embed = new Discord.RichEmbed()
  .setAuthor("Şirket Tipleri\n")
  .setColor("RANDOM")
  .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/company-27-152146.png')
	.addField('**Bakkal Sahibi**', 'Kurması bedava ve günlük 100₺ getirir')
	.addField('**Market Sahibi**', '1000₺ verilerek Bakkalını Market yapabilirsin günlük 200₺ getirir')
	.addField('**Süper-Market**', '2500₺ verilerek Marketini Süper-Market yapabilirsin günlük 350₺ getirir')
	.addField('**AVM Sahibi**', '7500₺ verilerek Süper-Marketini AVM yapabilirsin günlük 750₺ getirir')
  .addField('**AVM Zinciri Sahibi**', '35000₺ verilerek AVMni AVM Zinciri yapabilirsin günlük 1.500₺ getirir')
    .addField('**Fabrika Sahibi**', '60000₺ verilerek AVM Zincirini Fabrika yapabilirsin günlük 5.000₺ getirir')
  message.channel.send({embed});
}
  else {   
    const embed = new Discord.RichEmbed()
  .setAuthor("Şirket komutları\n")
  .setColor("RANDOM")
  .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/company-27-152146.png')
	.addField('**//şirket kur [isim]**', 'Şirket kurmanı sağlar', true)
  .addField('**//şirket isim [yeniisim]**', 'Şirketinin ismini değişmeni sağlar', true)
	.addField('**//şirket kapat**', 'Şirketini kapatmanı sağlar', true)
	.addField('**//şirket durum**', 'Şirket durumuna bakmanı sağlar', true)
	.addField('**//şirket topla**', 'Şirketin günlük gelirini toplamanızı sağlar', true)
  .addField('**//şirket geliştir**', 'Şirketin tipini ve günlük gelirini geliştirmenizi sağlar', true)
  .addField('**//şirket tipleri**', 'Şirketin tiplerini gösterir', true)
  message.channel.send({embed});
};
};
exports.conf = {
  enabled: true,
  aliases: ["şirket"],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: "şirket",
  description: "Şirket sistemi hakkında her şey.",
  usage: "şirket"
};

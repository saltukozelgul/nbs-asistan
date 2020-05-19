exports.run = async (client, msg, args) => {
  const emoji = (client.emojis.find("name", "galpp").toString())  
  let ask=[
      "'a/e olan sevgin: :heartpulse:\n 5% :heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:  ",
      "'a/e olan sevgin: :heartpulse:\n 10% :heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 15% :heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 20% :heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 25% :heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 30% :heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 35% :heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 40% :heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 45% :heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 50% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 55% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 60% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 65% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 70% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 75% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 80% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 85% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 90% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 95% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::white_heart:",
      "'a/e olan sevgin: :heartpulse:\n 100% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart:",
    ]
      let member = msg.mentions.members.first()
     if(!member)return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: ('Kimi seviyorsun? Boşluğu mu? Birini etiketle!')
  }});
  
      else if (msg.author.id === member.id) return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`Kendine olan sevgin: :heartpulse: 100% :heartpulse:\n  ${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji}${emoji} \n İnsan önce kendini sevmeli canım aferin \:*`)
  }});
  
//// saltuk seda
    else if (msg.author.id === '211481492772093952' &&  member.id === '407221696865763330') return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`:heartpulse: ${member} 'a/e olan sevgin: :heartpulse:\n 100% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart:`)
  }});
  
  //// saltuk seda
    else if (msg.author.id === '407221696865763330' &&  member.id === '211481492772093952') return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`:heartpulse: ${member} 'a/e olan sevgin: :heartpulse:\n 100% :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart::heart:`)
  }});
  
  
      else if (member.id === '407221696865763330') return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`Kardeşim adres ver almıyım canını`)
  }});

  
  //// mahmut
    else if (member.id === '417701066260480010') return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`:heartpulse: ${member} 'a/e olan sevgin: :heartpulse:\n 0% :white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart::white_heart:`)
  }});
  
  
    else{
    msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`:heartpulse: ${member} ${ask[Math.floor(Math.random() * 21)]}`)
    }})
    }
  
  
  }
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['aşkölçer'],
    permLevel: 0
   };
  
  exports.help = {
    name: 'aşkölç',
    description: 'Aşk Ölçmeni sağlar.',
    usage: 'aşkölç'
   }
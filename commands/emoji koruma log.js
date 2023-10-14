const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args,bot) => {
let yetkili  =   db.fetch(`yetkili.${message.guild.id}`);

const invex1 = new Discord.MessageEmbed()
.setColor('BLUE')
  .setDescription(`Bu işlemi yapabilmek için yetkili role sahip olmalı veya sunucu sahibi olmalısınız!`)
    .setAuthor(`${message.author.tag} tarafından istendi.`, message.author.avatarURL())
      .setFooter(client.user.username,client.user.avatarURL())
      .setTimestamp()
if((message.author.id !== message.guild.owner.user.id) && !message.member.roles.cache.has(yetkili)) return message.channel.send(invex1);

const emb = new Discord.MessageEmbed()
.setColor("BLUE")
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
.setTitle(`***__Emoji Koruma Sistemi__***`)
.setDescription(`<:krali:1160170285539008582>  ***Emoji-Log Sistem Bilgilendirmesi***\n *Emoji Koruma Sistemi loglarını belirlediğiniz kanala gönderir.*\n`)
.addField(`<:krali:1160170285539008582>  **Nasıl Ayarlayacağım?**`,"`r!emoji-log #kanal`\n")
.addField(`<:krali:1160170285539008582>  **Nasıl Kapatacağım?**`,"`r!emoji-log kapat`")



if(!args[0]) return message.channel.send(emb)
let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[0])

const invex11 = new Discord.MessageEmbed()
.setColor('BLUE')
  .setDescription(`Emoji-Log kanalı başarıyla ${channel} olarak ayarlandı.`)
    .setAuthor(`${message.author.tag} tarafından istendi.`, message.author.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setFooter(client.user.username,client.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTimestamp()

const invex111 = new Discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`Emojil-Log sistemi kapatıldı.`)
  .setAuthor(`${message.author.tag} tarafından istendi.`, message.author.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
    .setFooter(client.user.username,client.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTimestamp()

const inve1 = new Discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`Emoji-Log sistemi zaten kapalı durumda.`)
  .setAuthor(`${message.author.tag} tarafından istendi.`, message.author.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
    .setFooter(client.user.username,client.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTimestamp()
if(channel){
message.channel.send(invex11) 
db.set(`emolog.${message.guild.id}`, channel.id)

}else if(args[0] === "kapat"){
if(!db.has(`emolog.${message.guild.id}`)) return message.channel.send(inve1);
db.delete(`emolog.${message.guild.id}`)
message.channel.send(invex111)

}else{
message.channel.send(emb)
}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["emoji-log"],
  permLevel: 0
}

exports.help = {
  name: 'emoji-log'
};
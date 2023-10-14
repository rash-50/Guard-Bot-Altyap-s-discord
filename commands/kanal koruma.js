const Discord = require('discord.js');

exports.run = async (client, message, args,bot) => {

const emb = new Discord.MessageEmbed()
.setColor("BLUE")
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
.setTitle(`***__${client.user.username} Kanal Koruma Sistemi__***`)
.setDescription(`<:krali:1160170285539008582>  ***Detaylı Kanal Koruma Sistem Bilgilendirmesi***`)
.addField(`<:krali:1160170285539008582> **Açılan Kanal Koruma**`,"*Açılan kanalları otomatik olarak kapatır.*\n*Kanalı açan yetkiliye işlem uygulamaz.* \n\n `r!açılan-kanal-koruma`")
.addField(`<:krali:1160170285539008582> **Düzenlenen Kanal Koruma**`,"*Düzenlenen kanalları eski haline getirir.*\n*Düzenleyen yetkiliye işlem uygulamaz.* \n\n `r!düzenlenen-kanal-koruma`")
.addField(`<:krali:1160170285539008582> **Silinen Kanal Koruma**`,"*Silinen kanalları otomatik olarak tekrar açar.*\n*Silen yetkiliden tüm rolleri alır.* \n\n `r!silinen-kanal-koruma`")
.addField(`<:krali:1160170285539008582> **Kanal Log**`,"*Yukarıda belirtilen işlemlerin kayıtlarını belirtilen kanala gönderir.*\n\n `r!kanal-log`")



if(!args[0]) return message.channel.send(emb)
message.channel.send(emb)


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kanal-koruma"],
  permLevel: 0
}

exports.help = {
  name: 'kanal-koruma'
};
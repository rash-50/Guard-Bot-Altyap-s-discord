const Discord = require('discord.js');

exports.run = async (client, message, args,bot) => {

const emb = new Discord.MessageEmbed()
.setColor("BLUE")
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
.setTitle(`***__${client.user.username} Emoji Koruma Sistemi__***`)
.setDescription(`<:krali:1160170285539008582>  ***Detaylı Emoji Koruma Sistem Bilgilendirmesi***`)
.addField(`<:krali:1160170285539008582>  **Eklenen Emoji Koruma**`,"*Eklenen emojileri anında kapatır.*\n*Ekleyen yetkiliye işlem uygulamaz.* \n\n `r!eklenen-emoji-koruma`")
.addField(`<:krali:1160170285539008582>  **Emoji İsim Koruma**`,"*Değiştirilen emojiyi eski haline getirir.*\n*Düzenleyen yetkiliye işlem uygulamaz.* \n\n `r!emoji-isim-koruma`")
.addField(`<:krali:1160170285539008582>  **Silinen Emoji Koruma**`,"*Silinen emojileri otomatik olarak tekrar ekler.*\n*Silenin tüm rollerini alır.* \n\n `r!silinen-emoji-koruma`")
.addField(`<:krali:1160170285539008582>  **Emoji Log**`,"*Yukarıda belirtilen işlemlerin kayıtlarını belirtilen kanala gönderir.*\n\n `r!emoji-log`")



if(!args[0]) return message.channel.send(emb)
message.channel.send(emb)


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["emoji-koruma"],
  permLevel: 0
}

exports.help = {
  name: 'emoji-koruma'
};
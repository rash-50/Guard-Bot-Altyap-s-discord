/* Identification */
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const data = require('quick.db');
const express = require('express');
const app = express();
const db = require('quick.db')
let prefix = ayarlar.prefix;

app.get("/", (req, res) => {
  res.send("Girişimi yaptım.");
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`${eventName} eventi kuruldu.`);
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./commands/${file}`);
    let cmdFileName = file.split(".")[0];
    client.commands.set(cmd.help.name, cmd);
    console.log(`${cmdFileName} komutu aktif edildi.`);
    if (cmd.help.aliases) {
      cmd.help.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
    };
  });
});
client.on('ready', async () => {
   var WATCHING = [
        "r!yardım",
        "Rash Guard",
        "r!yardım",
        "r!yardım",
        "Rash Guard",
        "r!yardım",
        "Rash Guard",
        "r!yardım",
        "Rash Guard",
        "r!yardım",
        "Rash Guard",
        "r!yardım",
        "Rash Guard",
        "r!yardım",
        "Rash Guard",
        "r!yardım",
        "Rash Guard",
        "r!yardım",
        "Rash Guard",
        "Rash Guard"
    ];
    setInterval(function() {
        var random = Math.floor(Math.random()*(WATCHING.length-0+1)+0);
        client.user.setActivity(WATCHING[random],"https://rapp");
        }, 2 * 2500);
client.user.setStatus('online')
})

client.login(ayarlar.token);


//---------------- KOMUTLAR -------------------

//-------------------MESAJ LOG-----------------------
client.on("messageDelete", async (message, channel) => {
if(!db.has(`msglog.${message.guild.id}`)) return;
var chid = db.fetch(`msglog.${message.guild.id}`)
var dokunulmaz =  db.fetch(`dokunulmaz.${message.guild.id}`)
  var user = message.author;
  if(message.guild.owner.id !== message.author.id && !message.member.roles.cache.has(dokunulmaz)){
    let channel1 = message.guild.channels.cache.find(c => c.id === chid);
  if(!channel1){
    db.delete(`msglog.${message.guild.id}`)
  } 
  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`*Sunucuda Bir Mesaj Silindi !*`)
    .setAuthor(message.guild.name+" Sunucusu", message.guild.iconURL())
    .addField("<:krali:1160170285539008582>  Kullanıcı", message.author)
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582>  Kanal", message.channel)
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582>  Silinen Mesaj", "" + message.content + "")
    .setThumbnail(message.author.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
    .setFooter(client.user.username,client.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
    .setTimestamp()
  channel1.send(embed);
}});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  var dokunulmaz =  db.fetch(`dokunulmaz.${oldMessage.guild.id}`)
  if(oldMessage.guild.owner.id !== newMessage.author.id && !newMessage.member.roles.cache.has(dokunulmaz)){
    if(!db.has(`msglog.${newMessage.guild.id}`)) return;
var chid = db.fetch(`msglog.${newMessage.guild.id}`)
  let channel2 = newMessage.guild.channels.cache.find(c => c.id === chid);
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`*Sunucuda Bir Mesaj Düzenlendi*`)
    .setAuthor(newMessage.guild.name+" Sunucusu",newMessage.guild.iconURL())
    .setTimestamp()
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582>  Kullanıcı", newMessage.author)
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582>  Kanal", newMessage.channel)
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582>  Eski Mesaj", oldMessage.content)
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582>  Yeni Mesaj", newMessage.content)
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582>  Mesaj ID'si", newMessage.id)
    .addField(`<:krali:1160170285539008582> <:krali:1160170285539008582> <:krali:1160170285539008582>  Mesaj Bağlantı Adresi`, `[Buraya Tıkla ve Git](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
    .setThumbnail(newMessage.author.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
    .setFooter(client.user.username,client.user.avatarURL())
  channel2.send(embed);
}});


//-----------------------------------------------------------------ROL KORUMA KISMI-------------------------------------------------------------------------------

  client.on('roleDelete', async role => {
    let cezalı = db.fetch(`cezalı.${role.guild.id}`)
    if(db.has(`rol2.${role.guild.id}`)) return
    if(!db.has(`silrol.${role.guild.id}`)) return
    let guild = role.guild;
var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let e = await guild.fetchAuditLogs({type: 'ROLE_DELETE'});
    let member = guild.members.cache.get(e.entries.first().executor.id);
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
    member.roles.set("")
    let mention = role.mentionable;
    let hoist = role.hoist;
    let color = role.hexColor;
    let name = role.name;
    let perms = role.permissions;
    let position = role.position;
    role.guild.roles.create({
      name: name,
      color: color,
      hoist: hoist,
      position: position,
      permissions: perms,
      mentionable: mention
    }).then(async rol => {
if(db.has(`rollog.${role.guild.id}`)){
const emb1 = new Discord.MessageEmbed()
.setTimestamp()
.setColor("BLUE")
.setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setTitle(`Sunucuda Bir Rol Silindi`)
.addField("<:krali:1160170285539008582> <:krali:1160170285539008582>  Yetkili", member)
.addField("<:krali:1160170285539008582> <:krali:1160170285539008582>  Silinen Rol", rol)
.setThumbnail(member.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setFooter(client.user.username,client.user.avatarURL())
  client.channels.cache.get(db.fetch(`rollog.${role.guild.id}`)).send(emb1)
    }})
   db.set(`rol1.${role.guild.id}`,"1")
   }
   setTimeout(function() {
    db.delete(`rol1.${role.guild.id}`)},1000)
   })











   client.on('roleCreate', async role => {
     if(db.has(`rol1.${role.guild.id}`)) return
    if(!db.has(`acrol.${role.guild.id}`)) return
  let guild = role.guild;
  var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let e = await guild.fetchAuditLogs({type: 'ROLE_CREATE'});
    let member = guild.members.cache.get(e.entries.first().executor.id);
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
role.delete().then(async rol =>{
if(db.has(`rollog.${role.guild.id}`)){
const emb1 = new Discord.MessageEmbed()
.setTimestamp()
.setColor("BLUE")
.setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setTitle(`Sunucuda Bir Rol Oluşturuldu.`)
.addField("<:krali:1160170285539008582>  Yetkili", member)
.addField("<:krali:1160170285539008582>  Oluşturulan Rol Adı", rol.name)
.setThumbnail(member.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setFooter(client.user.username,client.user.avatarURL())
  client.channels.cache.get(db.fetch(`rollog.${role.guild.id}`)).send(emb1)
   }})
  db.set(`rol2.${role.guild.id}`,"1")}
  setTimeout(function() {
    db.delete(`rol2.${role.guild.id}`)},1000)
})
    










   client.on("roleUpdate", async (oldRole, newRole) => {
    if(!db.has(`duzrol.${newRole.guild.id}`)) return;
  let guild = newRole.guild;
  var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let e = await guild.fetchAuditLogs({type: 'ROLE_UPDATE'});
    let member = guild.members.cache.get(e.entries.first().executor.id);
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
newRole.edit({
  name : oldRole.name,
  color : oldRole.hexColor,
  hoist : oldRole.hoist,
  mentionable : oldRole.mentionable,
  permissions : oldRole.permissions,
  position : oldRole.position
})
if(db.has(`rollog.${newRole.guild.id}`)){
const emb1 = new Discord.MessageEmbed()
.setTimestamp()
.setColor("BLUE")
.setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setTitle(`Sunucuda Bir Rol Oluşturuldu.`)
.addField("<:krali:1160170285539008582>  Yetkili", member)
.addField("<:krali:1160170285539008582>  Düzenlenen Rol", newRole)
.setThumbnail(member.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setFooter(client.user.username,client.user.avatarURL())
  client.channels.cache.get(db.fetch(`rollog.${newRole.guild.id}`)).send(emb1)
   }}})
    

   //---------------------------------------------------------------------KANAL KORUMA---------------------------------------------------------------------------
   
   client.on('channelDelete', async function(channel) {
    if(!db.has(`silkanal.${channel.guild.id}`)) return;
    if(db.has(`kanal1.${channel.guild.id}`)) return;
    const fetch = await channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = channel.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    if (yapanad.id === "758922896503472168") return;
    let member = guild.members.cache.get(yapanad.id)
    if(guild.owner.id !== yapanad.id && !member.roles.cache.has(dokunulmaz)){
    member.roles.set("")
    if(channel.type === "voice") {
      let kategoriID = channel.parentID;
      let isim = channel.name;
      let sıra = channel.position;
      let limit = channel.userLimit;
      const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Kanal Silindi`)
      .addField("<:krali:1160170285539008582>  Yetkili", yapanad)
      .addField("<:krali:1160170285539008582>  Silinen Kanal", channel.name)
      .addField("<:krali:1160170285539008582>  Kanal Kategorisi", channel.parent)
      .addField("<:krali:1160170285539008582>  Kanal Türü", "Ses Kanalı")
      .setFooter(client.user.username,client.user.avatarURL())
      client.channels.cache.get(db.fetch(`kanallog.${channel.guild.id}`)).send(emb1)
      channel.clone(this.name,true,false).then(kanal => {
        let z = channel.guild.channels.cache.get(kanal.id)
        z.setParent(z.guild.channels.cache.find(channel => channel.id === kategoriID))
        z.edit({position:sıra,userLimit:limit})
        db.set(`kanal2.${newChannel.guild.id}`,"1")
      })
    }
    if(channel.type === "text") {
      let açıklama = channel.topic;
      let kategoriID = channel.parentID;
      let isim = channel.name;
      let sıra = channel.position;
      let nsfw = channel.nsfw;
      channel.clone(this.name,true,true).then(kanal => {
        const emb1 = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("BLUE")
        .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
        .setTitle(`Sunucuda Bir Kanal Silindi`)
        .addField("<:krali:1160170285539008582>  Yetkili", yapanad)
        .addField("<:krali:1160170285539008582> <:krali:1160170285539008582>  Silinen Kanal", kanal)
        .addField("<:krali:1160170285539008582> <:krali:1160170285539008582>  Kanal Kategorisi", channel.parent)
        .addField("<:krali:1160170285539008582> <:krali:1160170285539008582>  Kanal Türü", "Metin Kanalı")
        .setFooter(client.user.username,client.user.avatarURL())
        client.channels.cache.get(db.fetch(`kanallog.${channel.guild.id}`)).send(emb1)
        let z = channel.guild.channels.cache.get(kanal.id)
        z.setParent(z.guild.channels.cache.find(channel => channel.id === kategoriID))
        z.edit({position:sıra,topic:açıklama,nsfw:nsfw})
        db.set(`kanal2.${channel.guild.id}`,"1")
      })
    }}
    setTimeout(function() {
      db.delete(`kanal2.${channel.guild.id}`)},1000)
  })












  client.on("channelUpdate", async (oldChannel, newChannel) => {
    if(!db.has(`duzkanal.${newChannel.guild.id}`)) return;
    if(db.has(`kanalduz.${newChannel.guild.id}`)) return;
    const fetch = await oldChannel.guild.fetchAuditLogs({type: "CHANNEL_UPDATE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = newChannel.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let member = guild.members.cache.get(yapanad.id)
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
    if(oldChannel.type === "voice") {
      let kategoriID = oldChannel.parentID;
      let isim = oldChannel.name;
      let sıra = oldChannel.position;
      let limit = oldChannel.userLimit;
        const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Kanal Düzenlendi`)
      .addField("<:krali:1160170285539008582>  Yetkili", yapanad)
      .addField("<:krali:1160170285539008582>  Düzenlenen Kanal", oldChannel.name)
      .addField("<:krali:1160170285539008582>  Kanal Kategorisi", oldChannel.parent)
      .addField("<:krali:1160170285539008582>  Kanal Türü", "Ses Kanalı")
      .setFooter(client.user.username,client.user.avatarURL())
      client.channels.cache.get(db.fetch(`kanallog.${newChannel.guild.id}`)).send(emb1)
        newChannel.setParent(newChannel.guild.channels.cache.find(channel => channel.id === kategoriID))
        newChannel.edit({position:sıra,userLimit:limit,name:isim})
        db.set(`kanalduz.${newChannel.guild.id}`,"1")
    }
    if(oldChannel.type === "text") {
      let açıklama = oldChannel.topic;
      let kategoriID = oldChannel.parentID;
      let isim = oldChannel.name;
      let sıra = oldChannel.position;
      let nsfw = oldChannel.nsfw;
        const emb1 = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("BLUE")
        .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
        .setTitle(`Sunucuda Bir Kanal Düzenlendi`)
        .addField("<:krali:1160170285539008582>  Yetkili", yapanad)
        .addField("<:krali:1160170285539008582>  Düzenlenen Kanal", oldChannel)
        .addField("<:krali:1160170285539008582>  Kanal Kategorisi", oldChannel.parent)
        .addField("<:krali:1160170285539008582>  Kanal Türü", "Metin Kanalı")
        .setFooter(client.user.username,client.user.avatarURL())
        client.channels.cache.get(db.fetch(`kanallog.${newChannel.guild.id}`)).send(emb1)
        newChannel.setParent(newChannel.guild.channels.cache.find(channel => channel.id === kategoriID))
        newChannel.edit({position:sıra,topic:açıklama,nsfw:nsfw,name:isim})
        db.set(`kanalduz.${newChannel.guild.id}`,"1")
    }}
    setTimeout(function() {
    db.delete(`kanalduz.${newChannel.guild.id}`)},500)
  })










  client.on('channelCreate', async function(channel) {
    if(!db.has(`ackanal.${channel.guild.id}`)) return;
    if(db.has(`kanal2.${channel.guild.id}`)) return;
    const fetch = await channel.guild.fetchAuditLogs({type: "CHANNEL_CREATE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = channel.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    if (yapanad.id === "758922896503472168") return;
    let member = guild.members.cache.get(yapanad.id)
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
    if(channel.type === "voice") {
      const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Kanal Oluşturuldu`)
      .addField("<:krali:1160170285539008582>  Yetkili", yapanad)
      .addField("<:krali:1160170285539008582>  Açılan Kanal", channel.name)
      .addField("<:krali:1160170285539008582>  Kanal Kategorisi", channel.parent)
      .addField("<:krali:1160170285539008582>  Kanal Türü", "Ses Kanalı")
      .setFooter(client.user.username,client.user.avatarURL())
      client.channels.cache.get(db.fetch(`kanallog.${channel.guild.id}`)).send(emb1)
      channel.delete()
      db.set(`kanal1.${channel.guild.id}`,"1")
    }
    if(channel.type === "text") {
        const emb1 = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("BLUE")
        .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
        .setTitle(`Sunucuda Bir Kanal Oluşturuldu`)
        .addField("<:krali:1160170285539008582>  Yetkili", yapanad)
        .addField("<:krali:1160170285539008582>  Açılan Kanal", channel.name)
        .addField("<:krali:1160170285539008582>  Kanal Kategorisi", channel.parent)
        .addField("<:krali:1160170285539008582>  Kanal Türü", "Metin Kanalı")
        .setFooter(client.user.username,client.user.avatarURL())
        client.channels.cache.get(db.fetch(`kanallog.${channel.guild.id}`)).send(emb1)
        channel.delete()
        db.set(`kanal1.${channel.guild.id}`,"1")
    }
    setTimeout(function() {
      db.delete(`kanal1.${channel.guild.id}`)},1000)
  }})


//----------------------------------------------------------------------------EMOJİ KORUMA-------------------------------------------------------------------
   
client.on('emojiDelete', async function(emoji) {
  if(!db.has(`silemo.${emoji.guild.id}`)) return;
  if(db.has(`emo1.${emoji.guild.id}`)) return;
  const fetch = await emoji.guild.fetchAuditLogs({type: "EMOJI_DELETE"}).then(log => log.entries.first())
  let yapanad= fetch.executor;
  let guild = emoji.guild;
  var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
  if (yapanad.id === "758922896503472168") return;
  let member = guild.members.cache.get(yapanad.id)
  if(guild.owner.id !== yapanad.id && !member.roles.cache.has(dokunulmaz)){
  member.roles.set("")
    let isim = emoji.name;
    var uzantı;
    if (emoji.animated){
      uzantı = "gif"
    } else {
      uzantı = "png"
    }
    const emb1 = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("BLUE")
    .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
    .setTitle(`Sunucuda Bir Emoji Silindi`)
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582>  Yetkili", yapanad)
    .addField("<:krali:1160170285539008582> <:krali:1160170285539008582>  Silinen Emoji", `${emoji.name}`)
    .setFooter(client.user.username,client.user.avatarURL())
    .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.${uzantı}?v=1`)
    client.channels.cache.get(db.fetch(`emolog.${guild.id}`)).send(emb1)
    emoji.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.id}.${uzantı}?v=1`,emoji.name)
    db.set(`emo2.${guild.id}`,"1")
} 
  setTimeout(function() {
    db.delete(`emo2.${guild.id}`)},1000)
  })





  client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
    if(!db.has(`duzemo.${newEmoji.guild.id}`)) return;
    if(db.has(`emod1.${newEmoji.guild.id}`)) return;
    const fetch = await oldEmoji.guild.fetchAuditLogs({type: "EMOJI_UPDATE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = newEmoji.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let member = guild.members.cache.get(yapanad.id)
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
      let isim = oldEmoji.name;
      let sıra = oldEmoji.position;
      var uzantı;
      if (oldEmoji.animated){
        uzantı = "gif"
      } else {
        uzantı = "png"
      }
        const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Emoji Düzenlendi`)
      .addField("<:krali:1160170285539008582>  Yetkili", yapanad)
      .addField("<:krali:1160170285539008582>  Emoji Adı", oldEmoji.name)
      .addField("<:krali:1160170285539008582>  Düzenlenmiş Emoji Adı", newEmoji.name)
      .setFooter(client.user.username,client.user.avatarURL())
      .setThumbnail(`https://cdn.discordapp.com/emojis/${newEmoji.id}.${uzantı}?v=1`)
      client.channels.cache.get(db.fetch(`emolog.${newEmoji.guild.id}`)).send(emb1)
        newEmoji.edit({position:sıra,name:isim})
        db.set(`emoduz.${newEmoji.guild.id}`,"1")
    }
    setTimeout(function() {
    db.delete(`emoduz.${newEmoji.guild.id}`)},500)
  })



  client.on('emojiCreate', async function(emoji) {
    if(!db.has(`acemo.${emoji.guild.id}`)) return;
    if(db.has(`emo2.${emoji.guild.id}`)) return;
    const fetch = await emoji.guild.fetchAuditLogs({type: "EMOJI_CREATE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = emoji.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    if (yapanad.id === "758922896503472168") return;
    let member = guild.members.cache.get(yapanad.id)
    var uzantı;
    if (emoji.animated){
      uzantı = "gif"
    } else {
      uzantı = "png"
    }
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
      const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Emoji Oluşturuldu`)
      .addField("<:krali:1160170285539008582>  Yetkili", yapanad)
      .addField("<:krali:1160170285539008582>  Emoji Adı", emoji.name)
      .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.${uzantı}?v=1`)
      .setFooter(client.user.username,client.user.avatarURL())
      client.channels.cache.get(db.fetch(`emolog.${emoji.guild.id}`)).send(emb1)
      emoji.delete()
      db.set(`emo1.${emoji.guild.id}`,"1")
    }    setTimeout(function() {
      db.delete(`emo1.${emoji.guild.id}`)},500)
    })

//---------------------------------------------------------------BOT KORUMA---------------------------------------------------------------

client.on("guildMemberAdd", async member => {
  if (!db.has(`botkoruma_${member.guild.id}`)) return;
  if (!member.user.bot) return;
  if (!db.has(`izinlibot_${member.id}_${member.guild.id}`)){
  const e2321 = new Discord.MessageEmbed()
  .setTimestamp()
  .setColor("BLUE")
  .setAuthor(member.guild.name, member.guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
  .setTitle(`Sunucuya Bir Bot Katıldı.`)
  .addField("<:krali:1160170285539008582>  Katılan Bot :", member.user.tag)
  .addField("<:krali:1160170285539008582>  Katılan Bot ID :", member.id)
  .addField("<:krali:1160170285539008582>  Bot İzin Komutu :", `t!bot-izin ${member.id}`)
  .setThumbnail(member.user.avatarURL())
  .setFooter(client.user.username,client.user.avatarURL())
  member.kick(member, `Bot koruma nedeniyle kicklendi.`)
  member.guild.owner.send(e2321)
}else {
  db.delete(`izinlibot_${member.id}_${member.guild.id}`)
}
})


//---------------------------------Gir - çık-----------------------------------------------
client.on("guildCreate", (guild,bot) => {
  let log = client.channels.cache.get("765690118576930837");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Yeni bir sunucuya eklendim!")
    .setThumbnail(guild.iconURL())
    .setColor("BLUE")
    .addField("<:krali:1160170285539008582>  Sunucu İsmi:", guild.name)
    .addField("<:krali:1160170285539008582>  Sunucu ID:", guild.id)
    .addField("<:krali:1160170285539008582>  Sunucu Sahibi:", guild.owner)
    .addField("<:krali:1160170285539008582>  Sunucu Bölgesi:", guild.region)
    .addField("<:krali:1160170285539008582>  Sunucu Üye Sayısı:", guild.members.cache.size)
    .addField("<:krali:1160170285539008582>  Sunucu Kanal Sayısı:", guild.channels.cache.size)
    .addField("<:krali:1160170285539008582>  Sunucu Rol Sayısı:", guild.roles.cache.size)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});


client.on("guildDelete", (guild,bot) => {
  let log = client.channels.cache.get("765698521785434152");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Bir sunucudan atıldım!")
    .setThumbnail(guild.iconURL())
    .setColor("BLUE")
    .addField("<:krali:1160170285539008582>  Sunucu İsmi:", guild.name)
    .addField("<:krali:1160170285539008582>  Sunucu ID:", guild.id)
    .addField("<:krali:1160170285539008582>  Sunucu Sahibi:", guild.owner)
    .addField("<:krali:1160170285539008582>  Sunucu Bölgesi:", guild.region)
    .addField("<:krali:1160170285539008582>  Sunucu Üye Sayısı:", guild.members.cache.size)
    .addField("<:krali:1160170285539008582>  Sunucu Kanal Sayısı:", guild.channels.cache.size)
    .addField("<:krali:1160170285539008582>  Sunucu Rol Sayısı:", guild.roles.cache.size)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed)
db.delete(`botkoruma_${guild.id}`)
db.delete(`acemo.${guild.id}`)
db.delete(`duzemo.${guild.id}`)
db.delete(`emolog.${guild.id}`)
db.delete(`silemo.${guild.id}`)
db.delete(`duzkanal.${guild.id}`)
db.delete(`silkanal.${guild.id}`)
db.delete(`ackanal.${guild.id}`)
db.delete(`kanallog.${guild.id}`)
db.delete(`msglog.${guild.id}`)
db.delete(`duzrol.${guild.id}`)
db.delete(`acrol.${guild.id}`)
db.delete(`silrol.${guild.id}`)
db.delete(`rollog.${guild.id}`)
db.delete(`dokunulmaz.${guild.id}`)
db.delete(`yetkili.${guild.id}`)
});
//if(message.member.permissions.has('ADMINISTRATOR')) return;
//if(message.guild.owner.id === message.member.id) return;
//if(message.member.roles.cache.has(db.fetch(`dokunulmaz.${message.guild.id}`)))


client.on("message", message => {
  const args = message.content.split(" ").slice(1);
 const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  if (message.content.startsWith(ayarlar.prefix + "eval")) {
    if(message.author.id !== ayarlar.sahip) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

  client.on("message", async msg => {
if (!db.has(`linkengel.${msg.channel.id}`)) return;

    if(msg.channel.type == "dm") return;
    try {
  const reklamlar = ["discord.gg", "discordapp.com", ".me", ".gg", ".cf", ".tk", ".net", "youtube.com", ".com", ".club", ".xyz", ".network", ".ooo", ".host", ".com.tr", ".gov", ".org", ".info", ".biz", ".online", ".live", ".cloud", "https", "http", "https://", "http://", "www.", ".ml", ".pw", ".ga", "linktl", "link.tl", "trlink", "tr.link", "goo.gl", ".cc", ".gl", ".ws", ".art", ".cc", ".co.nf", ".tr.tc", "eu.tc", ".co", ".inf", "mc.tc", ".hosting", ".hoisting", ".store", ".tech", ".site", ".website", ".biz", ".co", ".space"];
  const reklamsızlar = ["tenor", "giphy", ".png", ".gif",".txt",".js"]
if(msg.guild.owner.id === msg.member.id) return;
if(msg.member.roles.cache.has(db.fetch(`dokunulmaz.${msg.guild.id}`))) return;
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (reklamlar.some(word => msg.content.toLowerCase().includes(word)) ) {
            if (!reklamsızlar.some(word => msg.content.toLowerCase().includes(word)) ) {
              msg.delete()
                const sembed = new Discord.MessageEmbed()
                 .setColor('RED')
                .setDescription(`Hey ${msg.author}, **${msg.guild.name}** sunucusunda reklam yapamazsın   ❕`)
                 return msg.channel.send(sembed).then(msg => msg.delete({timeout : 5000}));
            }
          
        } else {
          return false;
        }
      }
    } catch (err) {
      return;
    }
  });

  client.on('messageUpdate', async (oldMessage, newMessage) => {
if (!db.has(`linkengel.${newMessage.channel.id}`)) return;
    if(oldMessage.channel.type == "dm") return;
    if(newMessage.channel.type == "dm") return;
    try {
  const reklamlar = ["discord.gg", "discordapp.com", ".me", ".gg", ".cf", ".tk", ".net", "youtube.com", ".com", ".club", ".xyz", ".network", ".ooo", ".host", ".com.tr", ".gov", ".org", ".info", ".biz", ".online", ".live", ".cloud", "https", "http", "https://", "http://", "www.", ".ml", ".pw", ".ga", "linktl", "link.tl", "trlink", "tr.link", "goo.gl", ".cc", ".gl", ".ws", ".art", ".cc", ".co.nf", ".tr.tc", "eu.tc", ".co", ".inf", "mc.tc", ".hosting", ".hoisting", ".store", ".tech", ".site", ".website", ".biz", ".co", ".space"];
  const reklamsızlar = ["tenor", "giphy", ".png", ".gif"]
if(newMessage.guild.owner.id === newMessage.member.id) return;
if(newMessage.member.roles.cache.has(db.fetch(`dokunulmaz.${newMessage.guild.id}`))) return;
        if (!newMessage.member.hasPermission("ADMINISTRATOR")) {
          if (reklamlar.some(word => newMessage.content.toLowerCase().includes(word)) ) {
            if (!reklamsızlar.some(word => newMessage.content.toLowerCase().includes(word)) ) {
              newMessage.delete()
                const sembed = new Discord.MessageEmbed()
                 .setColor('RED')
                 .setDescription(`Hey ${newMessage.author}, **${newMessage.guild.name}** sunucusunda reklam yapamazsın   ❕`)
                 return newMessage.channel.send(sembed).then(msg => msg.delete({timeout:5000}));
            }
          
        } else {
          return false;
        }
      }
    } catch (err) {
      return;
    }
  });
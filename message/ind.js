const moment = require("moment-timezone");
const fs = require("fs");
moment.tz.setDefault("Asia/Jakarta").locale("id");
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}






exports.allmenu = (sender, prefix, pushname, isOwner) => {

	return `*── 「  - MD Beta 」 ──*

  _*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_

  Library : *Baileys-MD*.
  Prefix : ( ${prefix} )
  Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
  Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}

  Note : Anggap _<>_ *Tidak Ada*
  
  _Ada Bug? Ketik ${prefix}report Bug mu_
  ${readmore}
  *( 📍 )  Main Menu*
  || ${prefix}afk
  || ${prefix}menu
  || ${prefix}owner
  || ${prefix}rules
  || ${prefix}donasi
  || ${prefix}creator
  || ${prefix}ulangi
  || ${prefix}owner
  || ${prefix}react default 💖
  || ${prefix}delete

  *( ✏️ )  Converter/Tools*
  || ${prefix}sticker
  || ${prefix}toimg
  || ${prefix}tomp4

  *( ⌛ )  Downloader*
  
  *( ♻️ )  Random Menu*
  
  *( 📛 ) Nsfw User Free*
  
  *( ⚠️ )  Premium User*
  
  *( 🎨 )  Menu Maker*
  || ${prefix}carbon <code / text>
  || ${prefix}sertiff1 <text>
  
  *( 🍻 )  Maker From Image*
  || ${prefix}ktpmaker


  *( 🪀 )  Menu Lain Nya*
  || ${prefix}igstalk
  || ${prefix}gempa
  *( ☪️ )  Islamic Menu*

  *( ✍️ )  Menu Tulis*
  || ${prefix}nulis 
  
  *( 🔎 )  Search Menu*
  
  *( 🎮 )  Game & Fun Menu*

  *( 🏦 )  Payment & Bank*

  *( 👥 )  Group Menu*
  || ${prefix}kick <@tag>
  || ${prefix}add [ _number_ ]//<@tag>
  || ${prefix}promote <@tag>
  || ${prefix}demote <@tag>
  || ${prefix}getpp <@tag>
  || ${prefix}revoke
  || ${prefix}linkgc
  || ${prefix}listadmin
  || ${prefix}hidetag
  || ${prefix}totag
  || ${prefix}group [ open/close ]
  
  *( 🧑🏻‍💻 )  Owner Menu*
  || > evalcode
  || < evalcode-2
  || $ exec
  || ${prefix}setppbot
  || ${prefix}setprefix
  || ${prefix}join [ _link gc_ ]
  || ${prefix}leave
  || ${prefix}backup
  || ${prefix}read

  => [ *THANKS TO* ]
  
  ✄ *CAF*
  ✄ *Fatih*
  ✄ *FERDIZ AFK*
  ⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗⋗
`
}









exports.wait = () => {
	return ("Mohon tunggu sebentar~")
}

exports.rules = (prefix) => {
	return `
*── 「 RULES 」 ──*
1. Jangan spam bot. 
Sanksi: *WARN/SOFT BLOCK*
2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*
3. Jangan mengeksploitasi bot.
Sanksi: *PERMANENT BLOCK*
Jika sudah dipahami rules-nya, silakan ketik *${prefix}menu* untuk memulai!

*Note:* Bot Masih Dalam Program Beta.Jika Bot Tidak Merespon Di Grup Silahkan Gunakan Di Private Chat!
    `
}

exports.wrongFormat = (prefix) => {
	return `Format salah ‼️ Silakan cek cara penggunaan di *${prefix}allmenu*.`
}

exports.rent = () => {
	return `*「 S E W A 」*
Sebelum melakukan pembayaran, hubungi dahulu owner https://wa.me/6287877173955
    

    
*NOTE:* Untuk Pulsa Akan Dikenakan Tambahan Rp.5.000`
}
exports.donate = () => {
	return `┌──「 *D O N A T E* 」
│
├ Beri Semangat Owner!
│
├ *Dana:* 6287877173955
├ *Gopay:* 6287877173955
├ *Pulsa:* 6287877173955 (+5k)
├ *saweria:* https://saweria.co/Ferdizafk 
├ *Trakteer:* https://trakteer.id/FERDIZ-AFK/tip
│
└──「 *FERDI Z-AFK* 」 `

}



exports.getGroupAdmins = function(participants) {
	let admins = []
	for (let i of participants) {
		i.admin !== null ? admins.push(i.id) : ''
	}
	return admins
}

exports.groupOnly = function() {
	return "Perintah Ini Hanya Bisa Digunakan di Group!"
}

exports.adminsOnly = function() {
	return "Perintah Ini Hanya Bisa Digunakan Admin Group!"
}

exports.err = (cmd, err) => {
	return `Error ${cmd}: ${err}`
}

exports.noUrl = () => {
	return "Input Harus Berupa Url!"
}
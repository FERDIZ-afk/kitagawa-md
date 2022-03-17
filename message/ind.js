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
├ *saweria:* https://saweria.co/Ferdizafk // sekilas nya
├ *Trakteer:* https://trakteer.id/FERDIZ-AFK/tip // sekilas nya
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
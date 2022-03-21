/*
Base CASE BOT Baileys-Md By FERDIZ AFK
Free To Use 
Give Me Credit Please

Don't Sell It!!
*/

// Module
const {
	default: makeWASocket,
	DisconnectReason,
	AnyMessageContent,
	delay,
	useSingleFileAuthState,
	generateForwardMessageContent,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	generateMessageID,
	downloadContentFromMessage,
	makeInMemoryStore,
	fetchLatestBaileysVersion,
	jidDecode,
	proto
} = require('@adiwajshing/baileys')

const moment = require("moment-timezone")
const fs = require("fs")
const axios = require("axios")
const cheerio = require('cheerio')
const {
	exec,
	spawn
} = require("child_process")
const ffmpeg = require("fluent-ffmpeg")
const Carbon = require("unofficial-carbon-now")
const tesseract = require("node-tesseract-ocr")
const {
	modulewa,
	parseMention
} = require('../lib/simpel')


//------------------------------------------------------------------------
// Library


const color = require("../lib/color.js")
const {
	getBuffer,
	getRandom,
	getGroupAdmins,
	runtime,
	sleep,
	short,
	webp2mp4File,
	convert
} = require("../lib/function.js")
const {
	pinterest,
	igstalk,
	igdl
} = require("../lib/scrape.js")
const {
	yt
} = require("../lib/yt.js")
const ind = require("./ind.js")

const setting = JSON.parse(fs.readFileSync('./setting.json'))

prefix = setting.prefix
ownerNumber = setting.ownerNumber
ownerNumberg = setting.ownerNumberg
stickerInfo = setting.stickerInfo
namabot = setting.namabot
namaowner = setting.namaowner
backup = setting.backup

blocked = [] // jangan DiUbah

module.exports = fdz = async (fdz, m, chatUpdate, store) => {
	try {
		msg = mek = m
		const content = JSON.stringify(mek.message)



		const type = Object.keys(mek.message)[0];
		1
		var body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'listResponseMessage' && msg.message.listResponseMessage.title) ? msg.message.listResponseMessage.title : ""
		var budy = (typeof m.text == 'string' ? m.text : '')

		//console.log(body)
		global.blocked
		
		const timezone = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
		let time = moment.tz("Asia/Jakarta").format("HH:mm:ss")
		const ucapan = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const fromMe = msg.key.fromMe

		const from = msg.key.remoteJid || fromMe

		const args = budy.trim().split(/ +/).slice(1)
		const q = text = args.join(' ')
		const quoted = m.quoted ? m.quoted : m
		const mime = (quoted.msg || quoted).mimetype || ''

		const pushName = msg.pushName
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = isGroup ? sender.includes(ownerNumberg) : sender.includes(ownerNumber)
		const botNumber = fdz.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await fdz.groupMetadata(from) : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? ind.getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false

		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')

		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
		const isviewOnce = isQuotedMsg ? content.includes('viewOnceMessage') ? true : false : false
		const command = body.slice(0).trim().split(/ +/).shift().toLowerCase()
		const isCmd = budy.startsWith(prefix)


        // Database
        const isNumber = x => typeof x === 'number' && !isNaN(x)
        try {
	    let users = global.db.data.users[m.sender]
	    if (typeof users !== 'object') global.db.data.users[m.sender] = {}
	    if (users) {
		if (!isNumber(users.afkTime)) users.afkTime = -1
		if (!('banned' in users)) users.banned = false
		if (!('afkReason' in users)) users.afkReason = ''
	    } else global.db.data.users[m.sender] = {
		afkTime: -1,
	    banned: false,
		afkReason: '',
	    }
	     
	    let chats = global.db.data.chats[m.chat]
	    if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
	    if (chats) {
		if (!('antionce' in chats)) chats.antionce = true
        if (!('mute' in chats)) chats.mute = false
        if (!('antispam' in chats)) chats.antispam = true
		if (!('antidelete' in chats)) chats.antidelete = false
        if (!('setDemote' in chats)) chat.setDemote = ''
	    if (!('setPromote' in chats)) chat.setPromote = ''
	    if (!('setWelcome' in chats)) chat.setWelcome = ''
	    if (!('setLeave' in chats)) chats.setLeave = ''
	    } else global.db.data.chats[m.chat] = {
		antionce: true,
		mute: false,
		antispam: true,
		antidelete: false,
		setDemote: '',
        setPromote: '',
        setWelcome: '',
        setLeave: '',
	    }
	    
            let settings = global.db.data.settings[botNumber]
            if (typeof settings !== 'object') global.db.data.settings[botNumber] = {}
            if (settings) {
            if (!('available' in settings)) settings.available = false
            if (!('composing' in settings)) settings.composing = false
            if (!('recording' in settings)) settings.recording = false
            } else global.db.data.settings[botNumber] = {
                available: false,
                composing: false,
                recording: false,
            }
        } catch (err) {
            console.log(err)
        }


          fdz.ws.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
	        for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))     	
	   }
      })

		const reply = (texto) => {
			fdz.sendMessage(from, {
				text: texto,
				mentions: [sender]
			}, {
				quoted: mek
			})
		}
		const replylink = async (teks, judul, isi, quo) => {
			fdz.sendMessage(from, {
				text: teks,
				contextInfo: {
					"externalAdReply": {
						title: judul,
						body: isi,
						mediaType: 3,
						"thumbnail": fs.readFileSync('./assets/thumb.jpg')
					}
				}
			}, {
				sendEphemeral: true,
				quoted: quo
			})
		}
		const textImg = (teks, buffer = fs.readFileSync("assets/thumb.jpg"), mess, men) => {
			return fdz.sendMessage(from, {
				text: teks,
				jpegThumbnail: buffer,
				mention: men ? men : []
			}, {
				quoted: mess ? mess : msg
			})
		}

		const isUrl = (uri) => {
			return uri.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
		}




//auto backup sesion
		if (backup) {
			if (time == "12:00:00") {
				fdz.sendMessage(ownerNumber, {
					document: fs.readFileSync("./session.json"),
					fileName: "session.json",
					mimetype: "application/json"
				})
			}
			if (time == "18:00:00") {
				fdz.sendMessage(ownerNumber, {
					document: fs.readFileSync("./session.json"),
					fileName: "session.json",
					mimetype: "application/json"
				})
			}
			if (time == "00:00:00") {
				fdz.sendMessage(ownerNumber, {
					document: fs.readFileSync("./session.json"),
					fileName: "session.json",
					mimetype: "application/json"
				})
			}
			if (time == "06:00:00") {
				fdz.sendMessage(ownerNumber, {
					document: fs.readFileSync("./session.json"),
					fileName: "session.json",
					mimetype: "application/json"
				})
			}
		}


		//OCR setting
		const configocr = {
			lang: "eng",
			oem: 1,
			psm: 3,
		}

		if (m.isGroup && m.mtype == 'viewOnceMessage') {
			let teks = `「 *Anti ViewOnce Message* 」
    
    🤠 *Name* : ${pushName}
    👾 *User* : @${sender.split("@")[0]}
    ⏰ *Clock* : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB
    
    💫 *MessageType* : ${m.mtype}`

			reply(teks)
			await sleep(500)
			m.copyNForward(m.chat, true, {
				readViewOnce: true
			}, {
				quoted: mek
			}).catch(_ => reply('Mungkin dah pernah dibuka bot'))
		}


		//Reply no prefix
		if (body == "prefix") {
			await reply(" *Prefix saat ini:* " + prefix)
		} else if (body == "Prefix") {
			await reply(" *Prefix saat ini:* " + prefix)
		}



//if (db.data.chats[m.chat].antilink) {
        if (budy.match(`chat.whatsapp.com`)) {
        if (!isGroup) return //textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
        m.reply(`「 ANTI LINK 」\n\nKamu terdeteksi mengirim link group, maaf kamu akan di kick !`)
        if (!isBotGroupAdmins) return m.reply(`Ehh bot gak admin T_T`)
        let gclink = (`https://chat.whatsapp.com/`+await fdz.groupInviteCode(m.chat))
        let isLinkThisGc = new RegExp(gclink, 'i')
        let isgclink = isLinkThisGc.test(m.text)
        if (isOwner) return m.reply(`Ehh maaf kamu owner bot ku`)
        if (isgclink) return m.reply(`Ehh maaf gak jadi, karena kamu ngirim link group ini`)
        if (isGroupAdmins) return m.reply(`Ehh maaf kamu admin`)
setTimeout(() => {
        fdz.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}, 4000)
        }
      //  }


// Afk
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return h + 'Jam ' + m + 'Menit ' + s + 'Detik '
}
const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
	for (let jid of mentionUser) {
            let user = global.db.data.users[jid]
            if (!user) continue
            let afkTime = user.afkTime
            if (!afkTime || afkTime < 0) continue
            let reason = user.afkReason || ''
            m.reply(`
Jangan Tag Dia!
Dia Sedang AFK ${reason ? 'Dengan Alasan ' + reason : 'Tanpa Alasan'}
Selama ${clockString(new Date - afkTime)}
`.trim())
        }
	    
	if (db.data.users[m.sender].afkTime > -1) {
            let user = global.db.data.users[m.sender]
            m.reply(`
Kamu Telah Berhenti AFK${user.afkReason ? ' Setelah ' + user.afkReason : ''}
Selama ${clockString(new Date - user.afkTime)}
`.trim())
            user.afkTime = -1
            user.afkReason = ''
        }


		if (isCmd) {
			fdz.sendReadReceipt(m.chat, m.sender, [m.key.id])
			console.log(color('[CMD]', 'cyan'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'orange'), color(command, 'cyan'), color(pushName, 'orange'), color(sender, 'lime'))
		}


		//---------------------------------------------------------------------------------------
		// Function

		async function downloadAndSaveMediaMessage(type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				await fs.writeFileSync(path_file, buffer)
				return fs.readFileSync(path_file)
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return fs.readFileSync(path_file)
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return fs.readFileSync(path_file)
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return fs.readFileSync(path_file)
			}
		}


		const sendFileFromUrl = async (from, url, caption, msg, men) => {
			let mime = '';
			let res = await axios.head(url)
			mime = res.headers['content-type']
			if (mime.split("/")[1] === "gif") {
				return fdz.sendMessage(from, {
					video: await convertGif(url),
					caption: caption,
					gifPlayback: true,
					mentions: men ? men : []
				}, {
					quoted: msg
				})
			}
			let type = mime.split("/")[0] + "Message"
			if (mime.split("/")[0] === "image") {
				return fdz.sendMessage(from, {
					image: await getBuffer(url),
					caption: caption,
					mentions: men ? men : []
				}, {
					quoted: msg
				})
			} else if (mime.split("/")[0] === "video") {
				return fdz.sendMessage(from, {
					video: await getBuffer(url),
					caption: caption,
					mentions: men ? men : []
				}, {
					quoted: msg
				})
			} else if (mime.split("/")[0] === "audio") {
				return fdz.sendMessage(from, {
					audio: await getBuffer(url),
					caption: caption,
					mentions: men ? men : [],
					mimetype: 'audio/mpeg'
				}, {
					quoted: msg
				})
			} else {
				return fdz.sendMessage(from, {
					document: await getBuffer(url),
					mimetype: mime,
					caption: caption,
					mentions: men ? men : []
				}, {
					quoted: msg
				})
			}
		}



		//----------------------------------------------------------------------------------------

		if (isOwner) {
			if (budy.startsWith(">")) {
				console.log(color('[EVAL]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				try {
					let evaled = await eval(`(async () => { return ${budy.slice(2)} })()`)
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					textImg(`${evaled}`)
				} catch (err) {
					textImg(`${err}`)
				}
			} else if (budy.startsWith(">>")) {
				console.log(color('[EVAL]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				try {
					var text = util.format(await eval(`(async() => { return ${args.join(" ")} })()`))
					reply(text)
				} catch (err) {
					textImg(`${err}`)
				}
			} else if (budy.startsWith("$ ")) {
				console.log(color('[EXEC]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				exec(budy.slice(2), (err, stdout) => {
					if (err) return textImg(`${err}`)
					if (stdout) textImg(`${stdout}`)
				})
			} else if (budy.startsWith("<")) {
				console.log(color('[EVAL]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				try {
					return textImg(JSON.stringify(eval(`${args.join(' ')}`), null, '\t'))
				} catch (err) {
					textImg(`${err}`)
				}
			} else if (budy.startsWith(".>")) {
				console.log(color('[EVAL]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				if (!q) return textImg('codenya mana kak')
				syntaxerror = require('syntax-error')
				_syntax = ''
				_text = args.join(' ')
				try {
					evalll = await eval(`;(async () => { return ${args.join(' ')} })()`)
					textImg(require('util').format(evalll))
				} catch (e) {
					let err = await syntaxerror(_text, 'Execution Function', {
						allowReturnOutsideFunction: true,
						allowAwaitOutsideFunction: true
					})
					if (err) _syntax = '```' + err + '```\n\n'
					_return = e
					await textImg(_syntax + require('util').format(_return))
				}
			}

		}


		//----------------------------------------------------------------------------------------------
		//MENU
	
		// Please Don't Change This T_T	  

		switch (command) {


case prefix + 'afk': {
		let user = global.db.data.users[m.sender]
                user.afkTime = + new Date
                user.afkReason = text
                m.reply(`
Sekarang ${m.pushName} Telah Afk${text ? ' Dengan Alasan: ' + text : 'Tanpa Alasan'}`)
	    }
	break

			case prefix + 'apatuh':
			case prefix + 'read': {
				if (!isviewOnce) return reply('Itu bukan pesan viewOnce')
				pel = `*User* : @${m.quoted.sender.split("@")[0]} mengirim pesan viewOnce `
				fdz.sendMessage(from, {
					text: pel,
					mentions: [m.quoted.sender]
				}, {
					quoted: mek
				})
				await sleep(2000)
				m.quoted.copyNForward(m.chat, true, {
					readViewOnce: true
				}).catch(_ => reply('Mungkin dah pernah dibuka bot'))
				m.quoted.copyNForward(m.chat, true).catch(_ => reply('Mungkin dah pernah dibuka bot'))
			}
			break

		case prefix + 'ulangi': {
			if (!m.quoted) return m.reply('Reply Pesannya!!')
			m.quoted.copyNForward(m.chat, true).catch(_ => reply('error'))
		}
		break

		case prefix + 'q':
		case prefix + 'quoted': {
			if (!m.quoted) return m.reply('Reply Pesannya!!')
			try {
		//		if (!m.quoted) return m.reply('Reply Pesannya!!')
				let wokwol = await fdz.serializeM(await m.getQuotedObj())
				if (!wokwol.quoted) return m.reply('Pesan Yang anda reply tidak mengandung reply')
				await wokwol.quoted.copyNForward(m.chat, true)
			} catch (err) {
				textImg(`${err}`)
			}
		}
		break

/*
belum bisa
		case prefix+ 'blocklist':
					teks = '*This is list of blocked number* :\n'
					for (let block of blocked) {
						teks += `*~>* @${block.split('@')[0]}\n`
					}
					teks += `*Total* : ${blocked.length}`
					reply(teks.trim())
					break
*/


		case prefix + "menu":
		case prefix + "help": {

			const menuBut = [{
					index: 1,
					urlButton: {
						displayText: 'Source Code',
						url: 'https://github.com/ichizza/Chizza-md'
					}
				}, // Please Don't Change This T_T	 
				{
					index: 2,
					callButton: {
						displayText: 'Owner',
						phoneNumber: '+6285755495437'
					}
				},
				{
					index: 3,
					quickReplyButton: {
						displayText: 'MENU',
						id: prefix + 'allmenu'
					}
				},
				{
					index: 4,
					quickReplyButton: {
						displayText: 'RULES',
						id: prefix + 'rules'
					}
				},
			]


			await fdz.sendMessage(from, {
				caption: `*「${namabot}」*
  Hai Kak ${pushName}.
Saya ${namabot}, Silahkan Pilih Pilihan Fitur Yang Ada.
maaf kak jika ada beberapa yang error 
soalnya script bot ini masih dalam pengembangan
  
Terima Kasih Sudah Menggunakan bot ini.!`,
				location: {
					jpegThumbnail: fs.readFileSync("./assets/header.jpg")
				},
				templateButtons: menuBut,
				footer: 'ᴮᵉᵗᵃ ᵂʰᵃᵗˢᵃᵖᵖ ᴮᵒᵗ ᴹᵘˡᵗⁱ ᴰᵉᵛⁱᶜᵉ ❤️‍🔥'
			}, )
		}
		break

		case prefix + "allmenu": {
			try {
				var pepeh = await fdz.profilePictureUrl(sender, 'image')
			} catch {
				var pepeh = 'https://i.pinimg.com/736x/f0/d3/28/f0d328d2f116501a495f7981376a8d3f.jpg'
			}
			let btn = [{
				urlButton: {
					displayText: 'Source Code',
					url: 'https://github.com/FERDIZ-AFK'
				}
			}, {
				callButton: {
					displayText: 'Number Phone Owner',
					phoneNumber: `+${ownerNumberg}`
				}
			}, {
				quickReplyButton: {
					displayText: 'Status Bot',
					id: prefix + 'ping'
				}
			}, {
				quickReplyButton: {
					displayText: 'Contact Owner',
					id: prefix + 'owner'
				}
			}, {
				quickReplyButton: {
					displayText: 'Script',
					id: prefix + 'sc'
				}
			}]
			fatihgans = await getBuffer(pepeh)
			var teks = " ㅤ- *MENU* -\n\n"
			teks += prefix + "tiktok [ _url_ ]\n"
			teks += prefix + "tiktokmp3 [ _url_ ]\n"
			teks += prefix + "ytmp3 [ _url_ ]\n"
			teks += prefix + "ytmp4 [ _url_ ]\n"
			teks += prefix + "ytsearch [ _url_ ]\n"
			teks += prefix + "play [ _query_ ]\n"
			teks += prefix + "tomp3 [ _reply video_ ]\n"
			teks += prefix + "sticker [ _reply image_ ]\n"
			teks += prefix + "toimg [ _reply sticker_ \n"
			teks += prefix + "tempo [ _reply audio_ ]\n"
			teks += prefix + "bass [ _reply audio_ ]\n"
			teks += prefix + "mix [ emj1|emj2 ]\n"
			teks += prefix + "join [ _link gc_ ] \n"
			teks += prefix + "getpp [ _@tag_ ] \n"
			teks += prefix + "linkgc [ _only admin_ ]\n"
			teks += prefix + "resetlink [ _only admin_ ]\n\n"
			teks += " ㅤ- *OWNER* - \n\n"
			teks += prefix + "read\n"
			teks += prefix + "backup\n"
			teks += ">\n"
			teks += ".>\n"
			teks += "$\n"
			fdz.kirim5butimg(from, teks, `${namabot} || ${namaowner}`, fatihgans, btn)
		}

		break

		case prefix + "sewa":
			textImg(ind.rent())
			break


			//About Menu
		case prefix + "owner":
		case prefix + "owner": {
			let vcard = `BEGIN:VCARD\n` // metadata of the contact card
				+
				`VERSION:3.0\n` +
				'N:;FERDI Z-AFK.;;;' +
				'FN:FERDI Z-AFK.\n' // full name
				+
				`ORG:OWNER FERDI Z-AFK;\n` // the organization of the contact
				+
				`item1.TEL;type=CELL;type=VOICE;waid=6287877173955:+62 878-7717-3955\n` // WhatsApp ID + phone number
				+
				`item1.X-ABLabel:© FERDI Z-AFK\n` +
				`item2.EMAIL;type=INTERNET:ferdizakyla@gmail.com\n` +
				`item2.X-ABLabel:Email-owner\n` +
				`item3.URL:https://github.com/FERDIZ-afk/\n` +
				`item3.X-ABLabel:Github\n` +
				`item4.URL:https://ferdiz-my.id/\n` +
				`item4.X-ABLabel:Rest-api\n` +
				`item5.URL:https://oni-chan.my.id/\n` +
				`item5.X-ABLabel:Profil-github\n` +
				`item6.ADR:;;Region;;;;\n` +
				`item6.X-ABLabel:Negara-Indonesia\n` +
				`item7.ADR:;;city;;;;\n` +
				`item7.X-ABLabel:Kota-PACITAN\n` +
				`item8.X-ABLabel:© WhatsApp Inc.\n`
				// kalau bukan WhatsApp bisnis yang di bawah ini hapus aja ya
				+
				`X-WA-BIZ-NAME: OWNER FDZ\n` +
				`X-WA-BIZ-DESCRIPTION:from wa import info-user
import json

P = info-user.user()
L = p.length.json
L.text
print (L)

>>Results

Full Name : FERDI ZAKY LUTHFI ARIDHO
Nick name panggilan : FERDI-Z ,  FERDI
Console-logs :  F3RZALUT4R
Gender : laki²
alamat : Jawa timur, Pacitan, punung
Status : seorang penyendiri,hanya memiliki teman virtual

My website
https://oni-chan.my.id/

https://oni-chan.my.id/bot-nulis-online/\n\n`
				//end bisnis
				+
				`END:VCARD`
			fdz.sendMessage(from, {
				contacts: {
					displayName: `FERDI Z-AFK`,
					contacts: [{
						vcard
					}]
				}
			}, {
				quoted: mek
			})
		}
		break


		case prefix + 'creator': {
	//	  ganti ae kalau mau ganti sama code lu
const _0x35742b=_0x50cd;(function(_0x5ec33a,_0x2c8888){const _0x5b002a=_0x50cd,_0x31880b=_0x5ec33a();while(!![]){try{const _0x1e5049=parseInt(_0x5b002a(0x1f5))/0x1*(parseInt(_0x5b002a(0x1f3))/0x2)+parseInt(_0x5b002a(0x1f6))/0x3*(-parseInt(_0x5b002a(0x1f7))/0x4)+-parseInt(_0x5b002a(0x1fd))/0x5*(parseInt(_0x5b002a(0x1f2))/0x6)+-parseInt(_0x5b002a(0x1fe))/0x7*(parseInt(_0x5b002a(0x1f4))/0x8)+parseInt(_0x5b002a(0x1f9))/0x9+-parseInt(_0x5b002a(0x1fc))/0xa+parseInt(_0x5b002a(0x1fa))/0xb;if(_0x1e5049===_0x2c8888)break;else _0x31880b['push'](_0x31880b['shift']());}catch(_0x584cca){_0x31880b['push'](_0x31880b['shift']());}}}(_0x36d3,0xc7eaf));let list=[];function _0x50cd(_0xb4f572,_0x1af4dd){const _0x36d352=_0x36d3();return _0x50cd=function(_0x50cdee,_0xbaf5e7){_0x50cdee=_0x50cdee-0x1f1;let _0x596a5e=_0x36d352[_0x50cdee];return _0x596a5e;},_0x50cd(_0xb4f572,_0x1af4dd);}list['push']({'displayName':_0x35742b(0x1ff),'vcard':_0x35742b(0x1f1)}),await fdz[_0x35742b(0x1fb)](from,{'contacts':{'displayName':''+list[_0x35742b(0x1f8)],'contacts':list}},{'quoted':m});function _0x36d3(){const _0x22b684=['3937626RqyBbw','16072034KxAqti','sendMessage','2643970qJhbgG','625610zrRsIJ','21MYsnvn','©\x20FERDIZ-AFK','BEGIN:VCARD\x0aVERSION:3.0\x0aN:FERDIZ-AFK;©;;;\x0aFN:©\x20FERDIZ-AFK\x0aORG:\x20Creator\x20©\x20FERDIZ-AFK;\x0aitem1.TEL;type=CELL;type=VOICE;waid=6287877173955:+62\x20878-7717-3955\x0aitem1.X-ABLabel:©\x20FERDI\x20Z-AFK\x0aitem2.EMAIL;type=INTERNET:ferdizakyla@gmail.com\x0aitem2.X-ABLabel:Email-owner\x0aitem3.URL:https://github.com/FERDIZ-afk/\x0aitem3.X-ABLabel:Github\x0aitem4.URL:https://ferdiz-my.id/\x0aitem4.X-ABLabel:Rest-api\x0aitem5.URL:https://oni-chan.my.id/\x0aitem5.X-ABLabel:Profil-github\x0aitem6.ADR:;;Region;;;;\x0aitem6.X-ABLabel:Negara-Indonesia\x0aitem7.ADR:;;city;;;;\x0aitem7.X-ABLabel:Kota-PACITAN\x0aitem8.X-ABLabel:©\x20WhatsApp\x20Inc.\x0aEND:VCARD','6Hoqqxm','26DPJGOK','451544zALjuA','20795MCIICH','791232NaKcmG','12wAHIou','length'];_0x36d3=function(){return _0x22b684;};return _0x36d3();}
		}
		break

		case prefix + "donate":
		case prefix + "donasi":
			textImg(ind.donate())
			break
		case prefix + "rules":
		case prefix + "rule":
			textImg(ind.rules(prefix))
			break
			// Owner Menu
		case prefix + "eval":
			if (!isOwner) return
			if (!q) return textImg("Masukkan Javascript Code!")
			try {
				let evaled = await eval(budy.slice(6))
				if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
				textImg(`${evaled}`)
			} catch (err) {
				textImg(`${err}`)
			}

			break

		case prefix + "join": {
			if (!q) return textImg(ind.wrongFormat(prefix))
			if (!q.includes("https://chat.whatsapp.com/")) return textImg(ind.wrongFormat(prefix))
			try {
				const response = await fdz.groupAcceptInvite(q.split("https://chat.whatsapp.com/")[1])
				console.log(color('[JOIN GROUP]', 'lime'), color(response, 'cyan'))
			} catch (err) {
				textImg("Pastikan Link Group Benar Dan Tidak Kadaluarsa!")
			}
		}
		break

		case prefix + "leave":
			try {
				if (q) {
					await fdz.groupLeave(q)
					console.log(color('[Leave GROUP]', 'lime'), color(q, 'cyan'))
				} else {
					await fdz.groupLeave(from)
					console.log(color('[Leave GROUP]', 'lime'), color(from, 'cyan'))
				}
			} catch (err) {
				textImg("Pastikan Link Group Benar Dan Tidak Kadaluarsa!")
			}
			break

		case prefix + "setppbot":
		case prefix + "setpp":

			if (!isOwner) return
			if (isImage || isQuotedImage) {
				let ppimg = await downloadAndSaveMediaMessage('image', 'ppeehhh.jpeg')
				await fdz.updateProfilePicture(botNumber, {
					url: 'ppeehhh.jpeg'
				})
				textImg("Done!")
			} else {
				textImg(ind.wrongFormat(prefix))
			}

			break

		case prefix + 'setprefix':
			if (args.length < 1) return
			if (!isOwner) return reply(`hanya buat admin`)
			try {
				prefix = args[0]
				setting.prefix = prefix
				fs.writeFileSync('./setting.json', JSON.stringify(setting, null, '\t'))
				reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
			} catch (err) {
				textImg(err)
			}
			break



		case prefix + 'backup':
		case prefix + 'sesion':
			if (!isOwner) return reply(`hanya bisa di gunakan owner untuk backup`)
			try {
				fdz.sendMessage(sender, {
					document: fs.readFileSync("./session.json"),
					fileName: "session.json",
					mimetype: "application/json"
				})

			} catch (err) {
				textImg(err)
			}
			break

			//System Menu
		case prefix + "del":
		case prefix + "delete":
		case prefix + "hapus":
			if (!isQuotedMsg) return textImg(ind.wrongFormat(prefix))
			if (msg.message.extendedTextMessage.contextInfo.participant = botNumber) {
				fdz.sendMessage(from, {
					delete: {
						remoteJid: from,
						fromMe: true,
						id: msg.message.extendedTextMessage.contextInfo.stanzaId,
						participant: botNumber
					}
				})

			} else {
				textImg(ind.wrongFormat(prefix))
			}

			break


		case prefix + "runtime":
			const formater = (seconds) => {
				const pad = (s) => {
					return (s < 10 ? '0' : '') + s
				}
				const hrs = Math.floor(seconds / (60 * 60))
				const mins = Math.floor(seconds % (60 * 60) / 60)
				const secs = Math.floor(seconds % 60)
				return ' ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
			}
			const uptime = process.uptime()
			await textImg(`*── 「 BOT UPTIME 」 ──*\n\n❏${formater(uptime)}`)
			break

			//Group Menu

		case prefix + "revoke":
			if (!isGroup) return textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
			if (!isGroupAdmins) return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!")
			if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!")
			try {
				const code = await fdz.groupRevokeInvite(from)
				fdz.sendMessage(from, {
					text: "Link Group Telah DiUbah Oleh Admin @" + sender.split('@')[0].split(":")[0],
					contextInfo: {
						mentionedJid: [sender]
					}
				})
				fdz.sendMessage(sender, {
					text: `New Group Link: https://chat.whatsapp.com/${code}`
				}, {
					quoted: msg
				})


			} catch (err) {

				textImg(`${err}`)

			}
			break

		case prefix + "add":
			if (!isGroup) return textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
			if (!isGroupAdmins) return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!")
			if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!")
			let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
			await fdz.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(res)).catch((err) => reply(err))

			break

		case prefix + "kick": {
			if (!isGroup) return textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
			if (!isGroupAdmins) return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!")
			if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!")
			let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

			await fdz.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => reply(res)).catch((err) => reply(err))

		}
		break


		case prefix + "promote": {
			if (!isGroup) return textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
			if (!isGroupAdmins) return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!")
			if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!")
			let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
			await fdz.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(res)).catch((err) => reply(err))
		}
		break

		case prefix + "demote": {
			if (!isGroup) return textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
			if (!isGroupAdmins) return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!")
			if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!")
			let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
			await fdz.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(res)).catch((err) => reply(err))
		}
		break



		case prefix + "getpp": {
			if (!isGroup) return textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
			if (!q) return reply("Masukan nomor!")
			let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
			reply(`sedang dalam proses`)
			if (users.length > 0) {
				await fdz.profilePictureUrl(users, 'image').then(async (pp) => {
					fdz.sendMessage(from, {
						image: await getBuffer(pp)
					}, {
						quoted: msg
					})
				}).catch(_ => {
					reply("No Profile")
				})
			}
		}
		break;





		case prefix + "leave":
			if (!isGroup) return textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
			if (!isGroupAdmins) return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!")
			try {
				fdz.groupLeave(from)
			} catch (err) {
				fdz.groupLeave(from)

			}
			break

		case prefix + 'listadmin':
			if (!isGroup) return reply(mess.only.group)
			let numberAdmin = [];
			var teks = `*List admin of group*\n*${groupMetadata.subject}*\n*Total* : ${groupAdmins.length}\n\n`;
			for (let adm of groupMembers) {
				if (adm.admin !== null) {
					numberAdmin.push(adm.id);
					teks += `*[${numberAdmin.length}]* @${adm.id.split("@")[0]}\n`;
				}
			}
			await fdz.sendMessage(from, {
				text: teks,
				mentions: numberAdmin
			}, {
				quoted: m
			});
			break

		case prefix + "group":
			if (!isGroup) return textImg("Perintah Ini Hanya Bisa Digunakan di Group!")
			if (!isGroupAdmins) return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!")
			if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!")
			if (q === "open") {
				await fdz.groupSettingUpdate(from, 'not_announcement')
				textImg("*Group Dibuka Oleh Admin:* " + pushName)

			} else if (q === "close") {
				await fdz.groupSettingUpdate(from, 'announcement')
				textImg("*Group Ditutup Oleh Admin:* " + pushName)

			} else {

				textImg(ind.wrongFormat(prefix))
			}
			break


		case prefix + 'hidetag':
			if (!isGroup) return textImg(ind.groupOnly())
			if (isGroupAdmins || isOwner) {
				fdz.sendMessage(from, {
					text: q ? q : '',
					mentions: groupMembers.map(a => a.id)
				})
			} else {
				textImg(ind.adminsOnly())
			}
			break

			// Anime Menu
		case prefix + "anime":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Anime", `~> Request By ${pushName}`, msg)
			try {
				const getanime = await hxz.otakudesu(q)
				let c = `┌──「 *A N I M E* 」
=> *Judul:* ${getanime.jepang}
=> *Rate:* ${getanime.rate}
=> *Producer:* ${getanime.producer}
=> *Status:* ${getanime.status}
=> *Last Eps:* ${getanime.episode}
=> *Release:* ${getanime.rilis}
=> *Studio:* ${getanime.studio}
=> *Genre:* ${getanime.genre}

=> *Description:* ${getanime.desc}
`
				sendFileFromUrl(from, getanime.img, c)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}

			break

		case prefix + "manga":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Manga", `~> Request By ${pushName}`, msg)
			try {
				const getmanga = await xfar.Manga(q)
				let hajdhsdjask = `「 *M A N G A* 」\n\n`

				for (audhjd of getmanga) {
					hajdhsdjask += `*Judul:* ${audhjd.judul}\n`
					hajdhsdjask += `*Link:* ${audhjd.link}\n\n`
				}

				sendFileFromUrl(from, getmanga[0].thumbnail, hajdhsdjask)
			} catch (err) {

				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}


			break


		case prefix + "character":
		case prefix + "chara":
		case prefix + "char":

			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Character", `~> Request By ${pushName}`, msg)
			try {
				const getchar = await hxz.chara(q)
				for (let i = 0; i < 3; i++) {
					sendFileFromUrl(from, getchar[i], `*${q}*`)
				}
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "waifu":
			await replylink(ind.wait(), "Waifu", `~> Request By ${pushName}`, msg)
			try {
				const {
					data
				} = await axios.get("https://api.waifu.im/sfw/waifu/?exclude=3867126be8e260b5.jpeg,ca52928d43b30d6a&gif=false")
				sendFileFromUrl(from, data.images[0].url, data.images[0].tags[0].description)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

			//Search Menu
		case prefix + "film":
		case prefix + "movie":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Movie", `~> Request By ${pushName}`, msg)
			try {
				const getfilm = await xfar.Film(q)
				let ahgsdash = `「 *M O V I E* 」\n\n`

				for (audhjd of getfilm) {
					ahgsdash += `*Judul:* ${audhjd.judul}\n`
					ahgsdash += `*Quality:* ${audhjd.quality}\n`
					ahgsdash += `*Type:* ${audhjd.type}\n`
					ahgsdash += `*Date:* ${audhjd.upload}\n`
					ahgsdash += `*Link:* ${audhjd.link}\n\n`
				}
				sendFileFromUrl(from, getfilm[0].thumb, ahgsdash)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "lirik":
		case prefix + "lyrics":
		case prefix + "lyric":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Lyrics", `~> Request By ${pushName}`, msg)
			try {
				const {
					data
				} = await axios.get("https://www.lyricsfreak.com/search.php?a=search&q=" + q)
				let $ = cheerio.load(data)
				let h1 = $('.song');
				const hh = h1.attr('href')
				const huu = await axios.get('https://www.lyricsfreak.com' + hh)
				let s = cheerio.load(huu.data)
				let h2 = s('.lyrictxt').text();
				textImg(`「 *L I R I K* 」\n\n${h2}`)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break
		case prefix + "wattpad":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Wattpad", `~> Request By ${pushName}`, msg)
			try {
				const getwp = await xfar.Wattpad(q)
				let hajdhsdjasks = `「 *WATTPAD* 」\n\n`
				for (audhjds of getwp) {
					hajdhsdjasks += `*Judul:* ${audhjds.judul}\n`
					hajdhsdjasks += `*Read:* ${audhjds.dibaca}\n`
					hajdhsdjasks += `*Rating:* ${audhjds.divote}\n`
					hajdhsdjasks += `*Link:* ${audhjds.url}\n`
					hajdhsdjasks += `*Desc:* ${audhjds.description}\n\n`
				}
				sendFileFromUrl(from, getwp[0].thumb, hajdhsdjasks)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break


		case prefix + "webtoon":
		case prefix + "webtoons":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Webtoon", `~> Request By ${pushName}`, msg)
			try {
				const getwt = await xfar.Webtoons(q)
				let hajdhsdjaskp = `「 *WEBTOON* 」\n\n`
				for (audhjds of getwt) {
					hajdhsdjaskp += `*Judul:* ${audhjds.judul}\n`
					hajdhsdjaskp += `*like:* ${audhjds.like}\n`
					hajdhsdjaskp += `*Creator:* ${audhjds.creator}\n`
					hajdhsdjaskp += `*Genre:* ${audhjds.genre}\n`
					hajdhsdjaskp += `*Link:* ${audhjds.url}\n\n`
				}
				textImg(hajdhsdjaskp)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "drakor":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Drakor", `~> Request By ${pushName}`, msg)
			try {
				const getdr = await xfar.Drakor(q)
				let hajdhsdjaska = `「 *DRAKOR* 」\n\n`
				for (audhjds of getdr) {
					hajdhsdjaska += `*Judul:* ${audhjds.judul}\n`
					hajdhsdjaska += `*Tahun:* ${audhjds.years}\n`
					hajdhsdjaska += `*Genre:* ${audhjds.genre}\n`
					hajdhsdjaska += `*Link:* ${audhjds.url}\n\n`
				}
				sendFileFromUrl(from, getdr[0].thumbnail, hajdhsdjaska)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break


		case prefix + "pinterest":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Pinterest", `~> Request By ${pushName}`, msg)
			try {
				const pin = await pinterest(q)
				let pilih = await Math.floor(Math.random() * pin.length)
				let cap = await short(pin[pilih])
				sendFileFromUrl(from, pin[pilih], cap)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "gcsearch":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Gc Search", `~> Request By ${pushName}`, msg)
			try {
				if (!isGroup) {
					let getgc = await hxz.linkwa(q)
					let fgashghfgasjfn = `┌──「 *G R O U P* 」\n│\n`

					for (sjka of getgc) {
						fgashghfgasjfn += `├「*${sjka.nama} 」\n`
						fgashghfgasjfn += `├「${sjka.link} 」\n│\n`
					}
					textImg(fgashghfgasjfn)
				} else {
					textImg("Result akan dikirim ke private chat untuk menghindari antilink")
					let getgc = await hxz.linkwa(q)
					let fgashghfgasjfn = `┌──「 *G R O U P* 」\n│\n`
					for (sjka of getgc) {
						fgashghfgasjfn += `├「*${sjka.nama} 」\n`
						fgashghfgasjfn += `├「${sjka.link} 」\n│\n`
					}
					fdz.sendMessage(sender, {
						text: fgashghfgasjfn
					}, {
						quoted: msg
					})
				}
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "igstalk":
		case prefix + "instagramstalk":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "IG Stalk", `~> Request By ${pushName}`, msg)
			try {
				const getigstalk = await igstalk(q)

				let cap = `┌──「 *IG STALK* 」\n│\n`
				cap += `├ *Username:* ${q} \n`
				cap += `├ *Fullname:* ${getigstalk.graphql.user.full_name} \n`
				cap += `├ *Followers:* ${getigstalk.graphql.user.edge_followed_by.count} \n`
				cap += `├ *Following:* ${getigstalk.graphql.user.edge_follow.count} \n`
				cap += `├ *Private:* ${getigstalk.graphql.user.is_private ? "Private" : "Not Private"} \n`
				cap += `├ *Bio:* ${getigstalk.graphql.user.biography ? getigstalk.graphql.user.biography : "No Bio"} \n│\n`
				cap += `└──「 *I C Z A* 」`
				sendFileFromUrl(from, getigstalk.graphql.user.profile_pic_url_hd, cap)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

			// Media Menu
		case prefix + "toimg":
			if (!isQuotedSticker) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Sticker To Image", `~> Request By ${pushName}`, msg)
			let rand = await Math.floor(Math.random() * 7613786)
			var rand1 = rand + '.webp'
			let buffer = await downloadAndSaveMediaMessage("sticker", "./" + rand1)

			var rand2 = rand + '.png'
			fs.writeFileSync(`./${rand1}`, buffer)
			if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
				exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
					fs.unlinkSync(`./${rand1}`)
					if (err) return textImg(err)
					fdz.sendMessage(from, {
						image: fs.readFileSync(`${rand2}`)
					}, {
						quoted: msg
					})

					fs.unlinkSync(`${rand2}`)
				})
			} else {
				/*
		          webp2mp4File(`./${rand1}`).then( data => {
			       fs.unlinkSync(`./${rand1}`)
			       fdz.sendMessage(from, { video: { url: data.result }}, { quoted: msg })
			       
				  })*/
			}
			break

		case prefix + 'tomp4':
		case prefix + 'tovideo': {
			if (!quoted) throw m.reply('Reply Image')
			if (!/webp/.test(mime)) throw m.reply(`balas stiker dengan caption *${command}*`)
			await replylink(ind.wait(), "tomp4", `~> Request By ${pushName}`, msg)
			let {
				webp2mp4File
			} = require('../lib/uploader')
			let media = await fdz.downloadAndSaveMediaMessage(quoted)
			let webpToMp4 = await webp2mp4File(media)
			await fdz.sendMessage(m.chat, {
				video: {
					url: webpToMp4.result,
					caption: 'Convert Webp To Video'
				}
			}, {
				quoted: m
			})
			await fs.unlinkSync(media)
		}
		break




case prefix+ 'colong':

    		if (!isQuotedSticker) return reply('Only Stiker')
    		reply ('wait bikin')
    		try {
let { writeExif } = require('../lib/exif')
let media = {}
media.mimetype = mime
console.log(mime)

media.data = await quoted.download()
let encmedia = await writeExif(media, { packname: text.split("|")[0] ? text.split("|")[0] : stickerInfo.pack, author: text.split("|")[1] ? text.split("|")[1] : stickerInfo.author })
fdz.sendMessage(m.chat, { sticker: { url: encmedia } }, { quoted: mek })
await fs.unlinkSync(encmedia)

    		}catch (e) {
	console.log('Error :', e)
	reply('Anjim ngak bisa, dahlah :)')
	}
			break

		case prefix + 'sticker':
		case prefix + 's':
		case prefix + 'stickergif':
		case prefix + 'sgif': {

			if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command}`
			await replylink(ind.wait(), "Sticker", `~> Request By ${pushName}`, msg)
			//            m.reply(mess.wait)
			
			
			                anu = args.join(' ').split('|')
                satu = anu[0] !== '' ? anu[0] : stickerInfo.pack
                dua = typeof anu[1] !== 'undefined' ? anu[1] : stickerInfo.author



			if (/image/.test(mime)) {
				let media = await quoted.download()
				let encmedia = await fdz.sendImageAsSticker(m.chat, media, m, {
					packname: satu,
					author: dua
				})
				await fs.unlinkSync(encmedia)
			} else if (/video/.test(mime)) {
				if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
				let media = await quoted.download()
				let encmedia = await fdz.sendVideoAsSticker(m.chat, media, m, {
					packname: satu,
					author: dua
				})
				await fs.unlinkSync(encmedia)
			} else {
				throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
			}
		}
		break




		case prefix + "ocr":
			try {
				if (isImage) {
					await replylink(ind.wait(), "OCR", `~> Request By ${pushName}`, msg)
					let media = await downloadAndSaveMediaMessage("image", "temp/ocr.png")
					const asjfhasjkfhasji = await tesseract
						.recognize(media, configocr)

					textImg(asjfhasjkfhasji)
				} else if (isQuotedImage) {
					await replylink(ind.wait(), "OCR", `~> Request By ${pushName}`, msg)
					let media = await downloadAndSaveMediaMessage("image", "temp/ocr.png")
					const asjfhasjkfhasjia = await tesseract
						.recognize(media, configocr)
					textImg(asjfhasjkfhasjia)
				}
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))


			}
			break
			//Maker Menu
		case prefix + "carbon":
		case prefix + "code":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Carbon Now-Sh", `~> Request By ${pushName}`, msg)
			try {
				const carbon = new Carbon.createCarbon()
					.setCode(q).setBackgroundColor('#1b3648')
				const bufferr = await Carbon.generateCarbon(carbon)
				fdz.sendMessage(from, {
					image: bufferr
				}, {
					quoted: msg
				})
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

			//CASE MODIFIKASI ARDA
			//CASE PERTAMAKALINYA MAKER GET BUFFER
		case prefix + 'ktpmaker':
			if (!q) return reply(`*Pengunaan :*\n${command} Nik| Provinsi| Kabupaten |Nama |TempatTanggalLahir |JenisKel |Alamat |RtRw |KelDesa |Kecamatan |Agama |Status |Pekerjaan |Region |Berlaku |golongan darah |LinkGambar\n\n${command} 6287877173955 |Provinsi Jawa Barat |Kabupaten Bekasi |Arda Store |Bekasi |Laki-Laki |Bintara Jaya |02/05 |Karang Indah |Bekasi Barat |Islam |Jomblo |Ngoding |Indonesia |2021-2080 |b |https://i.waifu.pics/VIJYb_Z.png\n\n\n*「 INFO IMAGE 」*\nUntuk Gambar Profil KTP\nUpload Dari Web Berikut Ini\n\nhttps://i.waifu.pics\nhttps://c.top4top.io\n\nCONTOH HASIL NYA\nhttps://i.waifu.pics/VIJYb_Z.png\nhttps://k.top4top.io/p_2208264hn0.jpg`)
			//if (isLimit(senderNumber, isPremium, isOwner, limitCount, user)) return setReply(mess.limit)
			get_args = args.join(" ").split("|")
			nik = get_args[0]
			prov = get_args[1]
			kabu = get_args[2]
			name = get_args[3]
			ttl = get_args[4]
			jk = get_args[5]
			jl = get_args[6]
			rtrw = get_args[7]
			lurah = get_args[8]
			camat = get_args[9]
			agama = get_args[10]
			nikah = get_args[11]
			kerja = get_args[12]
			warga = get_args[13]
			until = get_args[14]
			gd = get_args[15]
			img = get_args[16]
			reply('waitt bikin')
			bikin = (`https://ferdiz-afk.my.id/api/Fmake/ktpmaker?nik=${nik}&nama=${name}&ttl=${ttl}&jk=${jk}&gd=${gd}&almt=${jl}&rtw=${rtrw}&kel=${lurah}&kc=${camat}&agm=${agama}&st=${nikah}&krj=${kerja}&ngr=${warga}&blk=${until}&prv=${prov}&kab=${kabu}&picturl=${img}`)
			console.log(bikin)
			ardaktp = await getBuffer(bikin)
			await fdz.sendMessage(from, {
				image: ardaktp,
				caption: `done kak`
			}, {
				quoted: m
			})
			await sleep(5000)
			break;
			// Downloader Menu

		case prefix + "tiktok":
		case prefix + "tik":
		case prefix + "tt":
		case prefix + "ttdl":
			if (!q) return textImg(ind.wrongFormat(prefix))
			if (!isUrl) return textImg(ind.noUrl())
			await replylink(ind.wait(), "Tiktok", `~> Request By ${pushName}`, msg)
			try {
				const gettt = await hxz.ttdownloader(q)
				console.log(gettt)
				sendFileFromUrl(from, gettt.nowm, `*Request By:* ${pushName}`, msg)
			} catch (err) {
				console.log(err)
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "ytmp3":
		case prefix + "mp3":
			if (!q) return textImg(ind.wrongFormat(prefix))
			if (!isUrl) return textImg(ind.noUrl())
			await replylink(ind.wait(), "Youtube Mp3", `~> Request By ${pushName}`, msg)
			try {
				const getmp3 = await xfar.Youtube(q)
				let sifugtgfrasdjkfhsdj = `┌──「 *YTMP3* 」
│
├ *Title:* ${getmp3.title}
├ *Duration:* ${getmp3.duration}
├ *Size:* ${getmp3.medias[7].formattedSize}
│
└──「 *I C Z A* 」`

				sendFileFromUrl(from, getmp3.thumbnail, sifugtgfrasdjkfhsdj, msg)
				sendFileFromUrl(from, getmp3.medias[7].url, sifugtgfrasdjkfhsdj, msg)
			} catch (err) {

				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break


		case prefix + "ytmp4":
		case prefix + "mp4":
			if (!q) return textImg(ind.wrongFormat(prefix))
			if (!isUrl) return textImg(ind.noUrl())
			await replylink(ind.wait(), "Youtube Mp4", `~> Request By ${pushName}`, msg)
			try {
				const getmp4 = await xfar.Youtube(q)
				let asjdghfashgfashgf = `┌──「 *YTMP4* 」
│
├ *Title:* ${getmp4.title}
├ *Duration:* ${getmp4.duration}
├ *Size:* ${getmp4.medias[1].formattedSize}
│
└──「 *I C Z A* 」`
				sendFileFromUrl(from, getmp4.thumbnail, asjdghfashgfashgf, msg)
				sendFileFromUrl(from, getmp4.medias[1].url, asjdghfashgfashgf, msg)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "yts":
		case prefix + "ytsearch":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Youtube Search", `~> Request By ${pushName}`, msg)
			try {
				const getyts = await yts(q)
				let afhasuyduytsduyt = `┌──「 *YT SEARCH* 」\n│\n`
				
				for (i of getyts.all) {
					afhasuyduytsduyt += `├ *Title:* ${i.title}\n`
					afhasuyduytsduyt += `├ *Url* ${i.url}\n│\n`
				}
				afhasuyduytsduyt += "└──「 *I C Z A* 」"
				sendFileFromUrl(from, getyts.all[0].image, afhasuyduytsduyt)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "play":
		case prefix + "ytplay":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Youtube Play", `~> Request By ${pushName}`, msg)
			try {
				const waitget = await yts(q)
				const getplay = await xfar.Youtube(waitget.all[0].url)
				let ashgasfgashfash = `┌──「 *PLAY* 」
│
├ *Title:* ${getplay.title}
├ *Duration:* ${getplay.duration}
├ *Size:* ${getplay.medias[7].formattedSize}
│
└──「 *I C Z A* 」`

				sendFileFromUrl(from, getplay.thumbnail, ashgasfgashfash, msg)
				sendFileFromUrl(from, getplay.medias[7].url, ashgasfgashfash, msg)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}

			break

		case prefix + "fb":
		case prefix + "facebook":
			if (!q) return textImg(ind.wrongFormat(prefix))
			if (!isUrl) return textImg(ind.noUrl())
			await replylink(ind.wait(), "Facebook", `~> Request By ${pushName}`, msg)
			try {
				const getfb = await xfar.Facebook(q)
				let abdvhjasdashjh = `── 「 *FACEBOOK* 」 ──
*Title:* ${getfb.title}
*Type:* ${getfb.medias[0].extension}
*Quality:* ${getfb.medias[0].quality}`
				sendFileFromUrl(from, getfb.medias[0].url, abdvhjasdashjh, msg)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break

		case prefix + "twitter":
		case prefix + "twiter":
		case prefix + "twt":
			if (!q) return textImg(ind.wrongFormat(prefix))
			if (!isUrl) return textImg(ind.noUrl())
			await replylink(ind.wait(), "Twitter", `~> Request By ${pushName}`, msg)
			try {
				const gettwt = await xfar.Twitter(q)
				sendFileFromUrl(from, gettwt.medias[1].url, txt, msg)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break


		case prefix + "ig":
		case prefix + "igdl":
		case prefix + "instagram":
			if (!q) return textImg(ind.wrongFormat(prefix))
			if (!isUrl) return textImg(ind.noUrl())
			await replylink(ind.wait(), "Instagram ", `~> Request By ${pushName}`, msg)
			try {

				const getig = await hxz.igdl(q)
				let gasdfghasfghasfy = `┌──「 *INSTAGRAM* 」
├ *Request By:* ${pushName}
└──「 *I C Z A* 」`

				for (i of getig.medias) {
					if (i.type == 'video') {
						fdz.sendMessage(from, {
							video: {
								url: i.downloadUrl
							},
							caption: gasdfghasfghasfy
						}, {
							quoted: msg
						})
					} else {
						fdz.sendMessage(from, {
							image: {
								url: i.downloadUrl
							},
							caption: gasdfghasfghasfy
						}, {
							quoted: msg
						})
					}
				}
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break


		case prefix + "tr":
		case prefix + "translate":
			if (!q) return textImg(ind.wrongFormat(prefix))
			await replylink(ind.wait(), "Translate", `~> Request By ${pushName}`, msg)
			try {
				const trs = await translate(q.slice(2), {
					to: q.split(" ")[0]
				})
				textImg(trs)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}

			break

		case prefix + "gempa":
			await replylink(ind.wait(), "BMKG Gempa", `~> Request By ${pushName}`, msg)
			try {
				const {
					data
				} = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
				let asbnfvashfgyjas = `┌──「 *G E M P A* 」
│
├ *TimeStamp:* ${data.Infogempa.gempa.Tanggal}
├ *Time:* ${data.Infogempa.gempa.Jam}
├ *Coordinates:* ${data.Infogempa.gempa.Coordinates}
├ *Magnitude:* ${data.Infogempa.gempa.Magnitude}
├ *Depth:* ${data.Infogempa.gempa.Kedalaman}
├ *Region:* ${data.Infogempa.gempa.Wilayah}
├ *Potention:* ${data.Infogempa.gempa.Potensi}
├ *Effect:* ${data.Infogempa.gempa.Dirasakan}
│
└──「 *I C Z A* 」 `
				sendFileFromUrl(from, "https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap, asbnfvashfgyjas)
			} catch (err) {
				textImg(ind.err(budy.split(" ")[0].split(prefix)[1], err))
			}
			break
			//----------------------------------------------------------------------------------------------------
		}



	} catch (err) {
		console.log(color('[ERR]', 'red'), color(err, 'cyan'))
	}
}


// Milik Bersama ©CAF

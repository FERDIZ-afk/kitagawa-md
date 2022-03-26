/*
Base CASE BOT Baileys-Md By FERDIZ AFK
Free To Use 
Give Me Credit Please
plis donk yang tukan nge recode SC jangan hilangin nama gwe donk plis ya

Don't Sell It!!
*/
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


const {
	Boom
} = require("@hapi/boom")
const pino = require("pino")
const {
	state,
	saveState
} = useSingleFileAuthState('./sesi.json')
const color = require('./lib/color')
const FileType = require('file-type')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const cfonts = require('cfonts')
const fs = require("fs")
const {
	modulewa,
	parseMention
} = require('./lib/simpel')
const yargs = require('yargs')
const {
	imageToWebp,
	videoToWebp,
	writeExifImg,
	writeExifVid
} = require('./lib/exif')

const store = makeInMemoryStore({
	logger: pino().child({
		level: 'silent',
		stream: 'store'
	})
})

var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')
const cloudDBAdapter = require('./lib/cloudDBAdapter')


//
require('./message/fdz.js')
nocache('./message/fdz.js', module => console.log(`'${module}' Updated!`))


const setting = JSON.parse(fs.readFileSync('./setting.json'))
ownerNumberg = setting.ownerNumberg
namaowner = setting.namaowner


global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`src/database.json`)
)
global.db.data = {
    users: {},
    chats: {},
    sticker: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    ...(global.db.data || {})
}

if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.save()
  }, 30 * 1000)

async function runbot() {
	let {
		version,
		isLatest
	} = await fetchLatestBaileysVersion()

	const banner = cfonts.render(('Multi device\nFERDIZ-AFK'), {
		font: 'block',
		color: 'white',
		align: 'center',
		gradient: ["red", "yellow"],
		lineHeight: 1
	});

	const fdz = makeWASocket({
		logger: pino({
			level: 'silent'
		}),
		printQRInTerminal: true,
		auth: state,
		browser: ['FERDIZ-AFK', 'Safari', '1.0.0'],
		version,
	})

	store.bind(fdz.ev)

	fdz.ev.on('messages.upsert', async chatUpdate => {
		//console.log(JSON.stringify(chatUpdate, undefined, 2))
		try {
			mek = chatUpdate.messages[0]
			if (!mek.message) return
			mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			m = modulewa(fdz, mek, store)
			require('./message/fdz.js')(fdz, m, chatUpdate, store)
		} catch (err) {
			console.log(err)
		}
	})




	fdz.ws.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
		for (let i of json[1].blocklist) {
			blocked.push(i.replace('c.us', 's.whatsapp.net'))
		}
	})


	fdz.ws.on("CB:call", async node => {
		//	console.log(node)
		if (node.content[0].tag === "terminate") {
			fdz.sendMessage(node.attrs.from, {
				text: `Kamu Telah Melanggar Rules Maka Kamu Akan Terkena *Blokir*!\n\nHubungi Owner Untuk Membuka Kembali Akses!`
			})
			delay(4000)
			let vcard = `BEGIN:VCARD\n` // metadata of the contact card
				+
				`VERSION:3.0\n` +
				`N:;${namaowner}.;;;` +
				`FN:${namaowner}.\n` // full name
				+
				`ORG:OWNER ${namaowner};\n` // the organization of the contact
				+
				`item1.TEL;type=CELL;type=VOICE;waid=${ownerNumberg}:+${ownerNumberg}\n` // WhatsApp ID + phone number
				+
				`item1.X-ABLabel:© ${namaowner}\n` +
				`item8.X-ABLabel:© WhatsApp Inc.\n` +
				`END:VCARD`
			fdz.sendMessage(node.attrs.from, {
				contacts: {
					displayName: `${namaowner}`,
					contacts: [{
						vcard
					}]
				}
			})
			delay(7000)

				.then(anu => {
					fdz.updateBlockStatus(node.attrs.from, "block")
				})
		}
	})





	fdz.ws.on("error", async node => {
		console.log(node)

	})





	fdz.ev.on('connection.update', async (update) => {

		const {
			connection,
			lastDisconnect
		} = update
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				fdz.logout();
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				runbot();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				runbot();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				fdz.logout();
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Scan Again And Run.`);
				fdz.logout();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				runbot();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				runbot();
			} else fdz.end(`Unknown DisconnectReason: ${reason}|${connection}`)
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			lolcatjs.fromString(`[Sedang mengkoneksikan]`)
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			lolcatjs.fromString(`[Connecting to] WhatsApp web`)
			lolcatjs.fromString(`[Connected] ` + JSON.stringify(fdz.user, null, 2))
		}
	})

	fdz.ev.on("close", anu => runbot())

	fdz.ev.on('creds.update', () => saveState)
	console.log(color(figlet.textSync('----------------', {
		horizontalLayout: 'default'
	})))
	console.log(banner.string)
	console.log(color(figlet.textSync('----------------', {
		horizontalLayout: 'default'
	})))
	lolcatjs.fromString('[SERVER] Server Started!')

	fdz.ev.on('presence-update', json => console.log(json))
	// request updates for a chat
	//await sock.presenceSubscribe("xyz@s.whatsapp.net") 

	fdz.ev.on('group-participants.update', async (anu) => {
		console.log(anu)
		try {
			let metadata = await fdz.groupMetadata(anu.id)
			let participants = anu.participants
			for (let num of participants) {
				// Get Profile Picture User
				try {
					ppuser = await fdz.profilePictureUrl(num, 'image')
				} catch {
					ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}

				// Get Profile Picture Group
				try {
					ppgroup = await fdz.profilePictureUrl(anu.id, 'image')
				} catch {
					ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}

				if (anu.action == 'add') {
					fdz.sendMessage(anu.id, {
						image: {
							url: ppuser
						},
						contextInfo: {
							mentionedJid: [num]
						},
						caption: `Welcome To ${metadata.subject} @${num.split("@")[0]}`
					})
				} else if (anu.action == 'remove') {
					fdz.sendMessage(anu.id, {
						image: {
							url: ppuser
						},
						contextInfo: {
							mentionedJid: [num]
						},
						caption: `@${num.split("@")[0]} Leaving To ${metadata.subject}`
					})
				}
			}
		} catch (err) {
			console.log(err)
		}
	})

	// Setting
	fdz.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}

	fdz.ev.on('contacts.update', update => {
		for (let contact of update) {
			let id = fdz.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = {
				id,
				name: contact.notify
			}
		}
	})

	fdz.getName = (jid, withoutContact = false) => {
		id = fdz.decodeJid(jid)
		withoutContact = fdz.withoutContact || withoutContact
		let v
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {}
			if (!(v.name || v.subject)) v = fdz.groupMetadata(id) || {}
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
		})
		else v = id === '0@s.whatsapp.net' ? {
				id,
				name: 'WhatsApp'
			} : id === fdz.decodeJid(fdz.user.id) ?
			fdz.user :
			(store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
	}

	fdz.sendContact = async (jid, kon, quoted = '', opts = {}) => {
		let list = []
		for (let i of kon) {
			list.push({
				displayName: await fdz.getName(i + '@s.whatsapp.net'),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await fdz.getName(i + '@s.whatsapp.net')}\nFN:${await fdz.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:okeae2410@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/cak_haho\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
			})
		}
		fdz.sendMessage(jid, {
			contacts: {
				displayName: `${list.length} Kontak`,
				contacts: list
			},
			...opts
		}, {
			quoted
		})
	}


	fdz.serializeM = (m) => modulewa(fdz, m, store)



	// Add Other
	/** Send Button 5 Image
	 *
	 * @param {*} jid
	 * @param {*} text
	 * @param {*} footer
	 * @param {*} image
	 * @param [*] button
	 * @param {*} options
	 * @returns
	 */
	fdz.kirim5butimg = async (jid, text = '', footer = '', img, but = [], options = {}) => {
		let message = await prepareWAMessageMedia({
			image: img
		}, {
			upload: fdz.waUploadToServer
		})
		var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
			templateMessage: {
				hydratedTemplate: {
					imageMessage: message.imageMessage,
					"hydratedContentText": text,
					"hydratedFooterText": footer,
					"hydratedButtons": but
				}
			}
		}), options)
		fdz.relayMessage(jid, template.message, {
			messageId: template.key.id
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} buttons 
	 * @param {*} caption 
	 * @param {*} footer 
	 * @param {*} quoted 
	 * @param {*} options 
	 */
	fdz.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
		let buttonMessage = {
			text,
			footer,
			buttons,
			headerType: 2,
			...options
		}
		fdz.sendMessage(jid, buttonMessage, {
			quoted,
			...options
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} text 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.sendText = (jid, text, quoted = '', options) => fdz.sendMessage(jid, {
		text: text,
		...options
	}, {
		quoted
	})

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} caption 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await fdz.sendMessage(jid, {
			image: buffer,
			caption: caption,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} caption 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await fdz.sendMessage(jid, {
			video: buffer,
			caption: caption,
			gifPlayback: gif,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} mime 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await fdz.sendMessage(jid, {
			audio: buffer,
			ptt: ptt,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} text 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.sendTextWithMentions = async (jid, text, quoted, options = {}) => fdz.sendMessage(jid, {
		text: text,
		contextInfo: {
			mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
		},
		...options
	}, {
		quoted
	})

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options)
		} else {
			buffer = await imageToWebp(buff)
		}

		await fdz.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options)
		} else {
			buffer = await videoToWebp(buff)
		}

		await fdz.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

	/**
	 * 
	 * @param {*} message 
	 * @param {*} filename 
	 * @param {*} attachExtension 
	 * @returns 
	 */
	fdz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		let quoted = message.msg ? message.msg : message
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let type = await FileType.fromBuffer(buffer)
		trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
		// save to file
		await fs.writeFileSync(trueFileName, buffer)
		return trueFileName
	}

	fdz.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		return buffer
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} filename
	 * @param {*} caption
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		let types = await fdz.getFile(path, true)
		let {
			mime,
			ext,
			res,
			data,
			filename: pathFile
		} = types
		if (res && res.status !== 200 || file.length <= 65536) {
			try {
				throw {
					json: JSON.parse(file.toString())
				}
			} catch (e) {
				if (e.json) throw e.json
			}
		}
		let opt = {}
		if (quoted) opt.quoted = quoted
		let type = '',
			mimetype = mime
		if (options.asDocument) type = 'document'
		if (/webp/.test(mime)) type = 'sticker'
		else if (/image/.test(mime)) type = 'image'
		else if (/video/.test(mime)) type = 'video'
		else if (/audio/.test(mime)) type = 'audio'
		else type = 'document'
		await fdz.sendMessage(jid, {
			[type]: {
				url: pathFile
			},
			caption,
			mimetype,
			fileName,
			...options
		}, {
			...opt,
			...options
		})
		return fs.promises.unlink(pathFile)
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} message 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	fdz.copyNForward = async (jid, message, forceForward = false, options = {}) => {
		let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

		let mtype = Object.keys(message.message)[0]
		let content = await generateForwardMessageContent(message, forceForward)
		let ctype = Object.keys(content)[0]
		let context = {}
		if (mtype != "conversation") context = message.message[mtype].contextInfo
		content[ctype].contextInfo = {
			...context,
			...content[ctype].contextInfo
		}
		const waMessage = await generateWAMessageFromContent(jid, content, options ? {
			...content[ctype],
			...options,
			...(options.contextInfo ? {
				contextInfo: {
					...content[ctype].contextInfo,
					...options.contextInfo
				}
			} : {})
		} : {})
		await fdz.relayMessage(jid, waMessage.message, {
			messageId: waMessage.key.id
		})
		return waMessage
	}


	fdz.cMod = (jid, copy, text = '', sender = fdz.user.id, options = {}) => {
		//let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
		if (isEphemeral) {
			mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
		}
		let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
		if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
		}
		if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === fdz.user.id

		return proto.WebMessageInfo.fromObject(copy)
	}


	/**
	 * 
	 * @param {*} path 
	 * @returns 
	 */
	fdz.getFile = async (PATH, save) => {
		let res
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		//if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
		let type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}

	//    return fdz


}
runbot()

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => {}) {
	console.log('Module', `'${module}'`, 'is now being watched for changes')
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}


// CAF
// run in main file

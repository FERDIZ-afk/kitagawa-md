const axios = require("axios");
const fs = require("fs");
const TinyURL = require('tinyurl');
const FormData = require("form-data");
const {
	default: Axios
} = require('axios');
const cheerio = require("cheerio");
const ffmpeg = require("fluent-ffmpeg");




exports.getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

exports.getGroupAdmins = function(participants) {
	let admins = []
	for (let i of participants) {
		i.admin !== null ? admins.push(i.id) : ''
	}
	return admins
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "0 day, ";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "0 hour, ";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "0 minute, ";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "0 second ";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

exports.url = (url) => {
	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

exports.short = (url) => {
	return TinyURL.shorten(url)


}

exports.convert = async (input) => {
	return new Promise(async (resolve, reject) => {
		const Path = "./anu.webp";
		await ffmpeg(input)
			.outputOptions(['-vcodec', 'libwebp', "-framerate", "20", '-vf', `crop=w='min(min(iw\,ih)\,512)':h='min(min(iw\,ih)\,512)',scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1,fps=15`, "-q:v", "50", "-fs", "1M", '-loop', '0', '-preset', 'default', '-an', '-vsync', '0', '-s', '512:512'])
			.save(Path)
			.on("error", (err) => {
				if (fs.existsSync(Path))
					fs.unlinkSync(Path);
				if (fs.existsSync(input))
					fs.unlinkSync(input);
				return reject(new Error(err));
			})
			.on('end', () => {
				if (fs.existsSync(input))
					fs.unlinkSync(input);
				return resolve(Path);
			});
	});
};


exports.webp2mp4File = (path) => {
	return new Promise((resolve, reject) => {
		const bodyForm = new FormData()
		bodyForm.append('new-image-url', '')
		bodyForm.append('new-image', fs.createReadStream(path))
		Axios({
			method: 'post',
			url: 'https://s6.ezgif.com/webp-to-mp4',
			data: bodyForm,
			headers: {
				'Content-Type': `multipart/form-data; boundary=${bodyForm._boundary}`
			}
		}).then(({
			data
		}) => {
			const bodyFormThen = new FormData()
			const $ = cheerio.load(data)
			const file = $('input[name="file"]').attr('value')
			const token = $('input[name="token"]').attr('value')
			const convert = $('input[name="file"]').attr('value')
			const gotdata = {
				file: file,
				token: token,
				convert: convert
			}
			bodyFormThen.append('file', gotdata.file)
			bodyFormThen.append('token', gotdata.token)
			bodyFormThen.append('convert', gotdata.convert)
			Axios({
				method: 'post',
				url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
				data: bodyFormThen,
				headers: {
					'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
				}
			}).then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
				resolve({
					status: true,
					message: "Created By Riyan",
					result: result
				})
			}).catch(reject)
		}).catch(reject)
	})
}
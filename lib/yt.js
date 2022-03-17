 const axios = require("axios")

 /**
  * To Download Media From YouTube
  * 
  * @param {String} url
  * 
  * @return Object
  */
 exports.yt = async (url) => {
 	if (url.includes("youtu")) {
 		let form = new URLSearchParams()
 		form.append("q", url)
 		form.append("vt", "home")
 		let {
 			data
 		} = await axios("https://yt5s.com/api/ajaxSearch", {
 			method: "POST",
 			headers: {
 				accept: "*/*",
 				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
 				cookie: "_ga=GA1.2.554524686.1642841938; _gid=GA1.2.1657844542.1642841938; __atuvc=1|3; __atssc=google;1; __cflb=04dToSoFRg9oqH9pYF2En9gKJK4fe8D4nMCRWYbL7f; _gat_gtag_UA_122831834_4=1; _PN_SBSCRBR_FALLBACK_DENIED=1642857938152"
 			},
 			data: form
 		})
 		let res = await axios("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", {
 			method: "POST",
 			headers: {
 				accept: "*/*",
 				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
 				"x-requested-key": "de0cfuirtgf67a"
 			},
 			data: new URLSearchParams(Object.entries({
 				v_id: data.vid,
 				ftype: "mp3",
 				fquality: 128,
 				token: data.token,
 				timeExpire: data.timeExpires,
 				client: "yt5s.com"
 			}))
 		})
 		let result = await axios("https://jjjkl2.uoyadfrrea.xyz/api/json/convert", {
 			method: "POST",
 			headers: {
 				accept: "*/*",
 				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
 			},
 			data: new URLSearchParams(Object.entries({
 				v_id: data.vid,
 				ftype: "mp4",
 				fquality: "360p",
 				fname: data.title,
 				token: data.token,
 				timeExpire: data.timeExpires,
 			}))
 		})
 		return {
 			dl: {
 				mp3: res.data.d_url,
 				mp4: result.data.result
 			},
 			title: data.title,
 			author: data.a,
 			duration: data.t,
 			size: {
 				mp3: data.links.mp3["2"].size,
 				mp4: data.links.mp4["7"].size,
 			}
 		}
 	}
 }
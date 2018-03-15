const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.reddit.com/'

axios
    .get(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        let thumbnails = []
        let titles = []

        $('img').each(function (i, elem) {
            thumbnails.push($(this).attr('src'))
        })

        $('div .thing').each(function (i, elem) {
            if ($(this).attr('data-nsfw') == "false") {
                titles.push($(this).find('p .title').text())
            }
        })

        let frontPage = {
            thumbnails: thumbnails,
            titles: titles
        }

        console.log(frontPage)
    })
    .catch(err => {
        console.log("error", err)
    })
const puppeteer = require('puppeteer');
const run =async () => {
    let url = 'https://music.163.com/#/song?id=1338695683';
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(url);
    // 获取歌单的iframe
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');
    let data = await iframe.evaluate(function () {
        let d = document.querySelectorAll('#m-playlist');
        let list_n = document.querySelectorAll('.cmmts .itm .cnt a');
        let list_d = document.querySelectorAll('.cmmts .itm .cnt');
        let list_i = document.querySelectorAll('.cmmts .itm .head img');
        let data = [];
        for (let i = 0; i < list_n.length; i++) {
            let name = list_n[i].innerText;
            let icon = list_i[i].getAttribute('src');
            data.push({
                icon:icon.replace(/\/\r\n/g,'').trim(),
                name: name.trim(),
                desc: list_d[i].innerText.replace(name+'：',' ').replace(/\/\r\n/g,'').trim(),
            })
        }
        return data;
    });

    // let d = await page.$eval('#m-playlist .f-ff2', n=>n.innerText);
    // console.log('d',d);
    console.log('data', data);
}
run()

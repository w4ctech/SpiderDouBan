const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

let Url = 'https://movie.douban.com/top250'

request(Url,function (error,response,body) {
    if(response.statusCode == 200){
        const $ = cheerio.load(body);
        const imgData = [];
        $('img').each((i,e)=>{
            imgData.push($(e).attr('src'))
        })
        for(let index=0;index<imgData.length;index++){
            if(imgData[index].indexOf('http')!==-1){
                downImg(imgData[index],index)
            }else{
                if((imgData[index]).startsWith('//')){
                    imgData[index]= 'https:' + imgData[index]
                    downImg(imgData[index],index)
                }else{
                    imgData[index] = Url + imgData[index]
                    downImg(imgData[index],index)
                }
            }
        }
    }
    function downImg(imgurl,index) {
        console.log('已下载'+index+'张'+' \n url是'+imgurl +'  \n 图片名是'+index+'.jpg')
        request(imgurl).pipe(fs.createWriteStream(`./img/${index}.jpg`))
    }
})

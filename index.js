const req = require("axios")
const cheerio = require("cheerio")
var moment = require('moment');

async function axiosTest(url) {
    const response = await req.get(url)
    return response.data
}
 
var bbcdata = {
    "promo":[],
    "news":[],
    "sports":[],
    "forecasts":[],
    "regionals":[]
};


const classes = ['.module__promo',".module__news",".module__sport",".weather_forecasts",".module--regional-news",".module--editors-pick",".module-video",".module--more-bbc",".correspondent-headlines"];
/*

Children Needed:
.module__content > .media-list > media-list--item > .media__image > .responsive-image > img
                                                    .media-content > 
                                                                 > .media-title > .media__link
                                                                 > .media-summary
                                                                 > .media--tag


{
    "theme":promo,
    "title":Jeffrey Epstein appears in a photograph,
    "imageUrl":"https://random.com"
    "excerpt":U.S. financier Jeffrey Epstein appears in a photograph taken for the New York State Division of Criminal Justice Services' sex offender registry March 28, 2017,
    "link":https://ichef.bbc.co.uk/wwhp/{width}/cpsprodpb/C7E8/production/_130067115_epstein-index-reuters.jpg,
    "datetime":"12-03-2004"
}

*/

const getData = async() => {
    try{
        const response = await axiosTest("https://www.bbc.com");
        const $ = cheerio.load(response);

        // get module__ promo
        var $modulePromo = $('[class="module module--promo"]').find('.media-list').find('li');
        var $moduleNews = $('[class="module module--content-block"]').find('[class="module module--news   module--collapse-images"]').find('ul').find('li');
        var $moduleSports = $('[class="module module--content-block"]').find('[class="module module--sport   module--collapse-images"]').find('ul').find('li');
        //var $moduleForecast = $('[class="module module--weather"]').find('.weather--forecast--list').find('ul');
        var $moduleRGNews = $('[class="module module--regional-news   module--collapse-images"]').find('[class="media-list media-list--fixed-height"]').find('li');
        //var $moduleEPIC = $('[class="module--editors-pick"]').find('.media-list').find('li');

      $modulePromo.each((index,element)=>{
            let imageUrl  = $(element).find('img').attr('src');
            let imageData = $(element).find('img').attr('alt');
            let header = $(element).find('.media__title').text();
            let summary = $(element).find('.media__summary').text();
            let link = $(element).find('.block-link__overlay-link').attr('href');

            let tempObj = {
                "ImageUrl":imageUrl,
                "ImageData":imageData,
                "header":header,
                "summary":summary,
                "link":link
            };

            bbcdata["promo"].push(tempObj);

        }); 

         $moduleNews.each((index,element)=>{
            let imageUrl  = $(element).find('img').attr('src');
            let imageData = $(element).find('img').attr('alt');
            let header = $(element).find('.media__title').text();
            let summary = $(element).find('.media__summary').text();
            let link = $(element).find('.block-link__overlay-link').attr('href');

            let tempObj = {
                "ImageUrl":imageUrl,
                "ImageData":imageData,
                "header":header,
                "summary":summary,
                "link":link
            };

            bbcdata["news"].push(tempObj);

        }); 
 
        

        
        $moduleSports.each((index,element)=>{
            let imageUrl  = $(element).find('img').attr('src');
            let imageData = $(element).find('img').attr('alt');
            let header = $(element).find('.media__title').text();
            let summary = $(element).find('.media__summary').text();
            let link = $(element).find('.block-link__overlay-link').attr('href');

            let tempObj = {
                "ImageUrl":imageUrl,
                "ImageData":imageData,
                "header":header,
                "summary":summary,
                "link":link
            };

            bbcdata["sports"].push(tempObj);
        });
 

  
 


   /*     $moduleForecast.each((index,element)=>{
            let day  = $(element).find('.forecast--day').text();
            let high = $(element).find('.forecast--high').text();
            let low = $(element).find('.forecast--low').text();

            let tempObj = {
                "day":day,
                "high":high,
                "low":low
            };
            bbcdata["forecasts"].push(tempObj);
        });
     */   

        $moduleRGNews.each((index,element)=>{

            $image = $(element).find('.media__image').find('img').attr('src');
            $imageData = $(element).find('.media__image').find('img').attr('alt');
            $link = $(element).find('.media__content').find('a').attr('href');
            $header = $(element).find('.media__content').find('.media__link').text();
            $summary = $(element).find('.media__content').find('.media__summary').text();
            
            let tempObj = {
                "ImageUrl":$image,
                "ImageData":$,
                "header":$header,
                "summary":$summary,
                "link":$link
            };
                bbcdata["regionals"].push(tempObj);

        });
/*
        $moduleEPIC.each((index,element)=>{
            let text  = $(element).html();
            $tempArr.push(text);
        });
 */
       
        console.log(bbcdata);


      
    }
    catch(e)
    {
        console.log(e);
    }
    }
var data = getData().then((result)=>{
   console.log(data.toString()); 
});
module.exports = getData;

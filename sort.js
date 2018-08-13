var fs = require('fs');
var fetch = require('fetch').fetchUrl;

//Files
var firstFile = process.argv[2];
// var secondFile =  process.argv[3];


function callToOrderAPI() {

    fetch('https://order.api.my.chick-fil-a.com/orders/menu/nutrition/1.0', (err, response, body) => {
        if(err){
            console.log(err)
        }
        var data = JSON.parse(body);

        console.log(data.items.length)
        var tags = []
        var itemsObj = {
            items: []
        }
        //Capture nutrition tags
        for (var i = 0; i < data.items.length; i++) {
            tags.push(data.items[i].tag)
        }
        sortedTags = tags.sort()
        console.log(sortedTags)

        for (var j = 0; j < sortedTags.length; j++) {
            for (var k = 0; k < data.items.length; k++) {
                if (sortedTags[j] == data.items[k].tag) {
                    itemsObj.items.push(data.items[k])
                }
            }
        }

        writeFile(itemsObj);
    })
}

// //fs read file function
// function sort(fileName) {

//     var cleanData;
//     fs.readFile(fileName, 'utf8', (err,stream) => {
//         if (err){ 
//             console.log(err); 
//         }

//         var data = JSON.parse(stream)
//         console.log(data.items.length)
//         var tags = []
//         var itemsObj = {
//             items:[]
//         }
//         //Capture nutrition tags
//         for(var i=0;i<data.items.length; i++){
//             tags.push(data.items[i].tag)
//         }
//         sortedTags = tags.sort()
//         console.log(sortedTags)

//         for(var j=0;j<sortedTags.length;j++){
//             for (var k = 0; k < data.items.length; k++) {
//                 if(sortedTags[j] == data.items[k].tag){
//                     itemsObj.items.push(data.items[k])
//                 }
//             }
//         }

//         // console.log(itemsObj)
//         //Write new files will sorted data
//         writeFile(itemsObj);
//     })
// }

function writeFile(data){
    fs.writeFile('nutrition.json', JSON.stringify(data, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log('File has been created');
    });
}

//Run Function
callToOrderAPI(firstFile);
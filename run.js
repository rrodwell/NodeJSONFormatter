/* 

TO INSTALL PACKAGES
>> npm install 

TO RUN PROGRAM
>> node run.js command (FILE_NAME)

COMMANDS
1. generate 
2. sort FILE_NAME

*/


// ----------------- NPM PACKAGES --------------------- //
var fs = require('fs');
var fetch = require('fetch').fetchUrl;
var inquirer = require('inquirer');


// ----------------- ARGUMENTS --------------------- //
var command = process.argv[2];


// ----------------- FUNCTIONS --------------------- //

function callToOrderAPI() {
    /*
        This function will call the order API and capture the response JSON object. 
        Once the response is returned, the data is then passed onto the sort function.  
    */
    fetch('https://order.api.my.chick-fil-a.com/orders/menu/nutrition/1.0', (err, response, body) => {
        if(err){
            console.log(err)
        }
        var data = JSON.parse(body);
        console.log('Number of items: ', data.items.length)

        sortData(data);
    })
}

function readFile() {
    /*
         This function will read through a JSON file and capture the response as a JSON object.
         The file much be located in "NutritionFiles" folder inside the the project directory.
         Once the response is returned, the data is then passed onto the sort function.  
     */

    var fileName;

    inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'Enter file name. (Do not included file extension)'
        }
    ).then(function (input) {
        fileName = input.name;

        var FILE_PATH = './NutritionFiles/' + fileName + '.json';

        fs.readFile(FILE_PATH, 'utf8', (err, stream) => {
            if (err) {
                console.log('No such file.');
                console.log(err)
            }
            var data = JSON.parse(stream)
            console.log('Number of items: ',data.items.length)
            sortData(data);
        });
    });
}

function sortData(data) {
    /*
        This function will accept a JSON object with data from either the API or a previously parsed JSON file.
        The data will then be iterated through, capturing all of the nutrition tags and appending them to a list. 
        Once the list of tags is generated, the function will sort the list in alphabetic order. 
        The data will then be looped through again in order to build a newly sorted JSON object with the nutrition data.
        It is this new JSOn object that is passed to the writeFile function. 
    */
    var tags = []
    var itemsObj = {
        items:[]
    }
    //Capture nutrition tags
    for(var i=0;i<data.items.length; i++){
        tags.push(data.items[i].tag)
    }
    sortedTags = tags.sort()
    // console.log(sortedTags)

    for(var j=0;j<sortedTags.length;j++){
        for (var k = 0; k < data.items.length; k++) {
            if(sortedTags[j] == data.items[k].tag){
                itemsObj.items.push(data.items[k])
            }
        }
    }
    // console.log(itemsObj)
    writeFile(itemsObj);
}

function writeFile(data){
    /*
        This function will takes in a JSON object with recently sorted nutrition data. 
        It will then prompt the user for a file name. Once the file name has been determined, the function will format the JSON argument and write it to a newly created file. 
        This file will be saved in the saved in the project directory.
    */
    var OUTPUT_FILENAME;

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter new file name. (Do not included file extension)'
        }
    ]).then(function (input) {
        OUTPUT_FILENAME = input.name;
    
        var OUTPUT_PATH = './Output/' + OUTPUT_FILENAME + '.json'

        fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log('File has been created');
        });
    });
}


// ----------------- COMMANDS --------------------- //
switch (command) {
    case 'generate':
        //Run Function to call API
        callToOrderAPI();
        break;
    
    case 'sort':
        //Run Function to read file
        readFile();
        break;
}

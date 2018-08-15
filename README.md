NUTRITION FILE CLI TOOL

This program is a NodeJS command line tool used to generate a ServicePoint nutrition JSON file from the Order API, as well as sort and organize a previous nutrition JSON file.

In order to be able to run this program, the user will need to install NodeJS on their computer. 
To download, please follow the link below:
https://nodejs.org/en/download/

Once NodeJS is installed on the user's machine, open the command line to confirm a successful installation. The following commands should return a version number.
In the command line type the following:
>> node -v 

>> v8.9.4 (returned output)

>> npm -v

>> 6.2.0 (returned output)

After NodeJS is confirmed, navigate to the project directory in the terminal.
In the project directory, use the "npm install" command to install all of the packages from the package.json used by the program.
This command will only need to run once.

TO INSTALL PACKAGES

>> npm install 

Once all of the packages are installed successfully, the program is ready to be used. 

The tool will accept TWO commands. The first is a "generate" command that will generate a new file with the data returned from the Order API. The second command is a "sort" command that will read an existing JSON file then sort and format the nutrition information. 

All nutrition JSON files intended to be used for the "sort" command need to be placed in the "NutritionFiles" folder within the project.

COMMANDS

1. generate 
2. sort 

TO RUN PROGRAM

>> node run.js command 

The new JSON files created by the program will be saved to the "Output" folder within the project. If the new file is named the same as a previously generated file, the previous file will be overwritten by the program. 

If the program is successful, a message stating "File has been created" will be printed to the console to let the user know when once it has finished. 






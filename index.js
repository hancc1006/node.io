const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = [
    {
        type:"input",
        message: "Project name",
        name: "project"
    },
    {
        type:"input",
        message: "Project version (empty value to skip)",
        name: "version"
    },
    {
      type:"input",
      message: "License (empty value to skip)",
      name: "license"
  },
    {
        type: "input",
        message: "Project description",
        name: "description",
    },
    {
        type: "input",
        message: "Installation command(empty value to skip)",
        name: "install",
    },
    {
        type: "input",
        message: "Usage command (empty value to skip)",
        name: "usage",
    },
    {
        type: "input",
        message: "Test command (empty value to skip)",
        name: "test",
    },
    {
        message: "Enter your GitHub username",
        name: "username"
    },
    
    {
        type: "input",
        message: "Contributing",
        name: "contribution",
      },

];

inquirer
  .prompt(questions)
  .then(function(response) {
    const arr =[];
    console.log(response);
    arr.push(JSON.stringify(response));
    console.log(arr);
    let user = response.username;

    //console.log(response.username);
    const queryUrl = `https://api.github.com/users/${user}/repos?per_page=100`;
    axios
    .get(queryUrl)
    .then(function(res){
      //console.log(res.data);
      const { data } = res;
      const repoNames = data.map(repo=> repo.name);
      const repoNamesStr=repoNames.join('\n');

      //console.log("Repo name string", repoNamesStr);

      fs.writeFile('repos.txt', repoNamesStr,function(error){
        if (error){
          throw error;
        }
        console.log(`Saved ${repoNames.length} repos`);
      })

      fs.writeFile('README.md',arr ,function(error){
        if (error){
          throw error;
        }
        console.log(`Saved description repos`);
      })
    }); 
  });

  
  



function writeToFile(fileName, data) {
}

function init() {

}

//init();

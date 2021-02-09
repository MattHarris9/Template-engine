const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let mainArr = [];
let emptyId= [];

const confirmManager = [{
    type: 'confirm',
    name: 'Manager',
    message: "Are you a manager?"

}];




const managerInfo = [{
    type: "input",
    name: "managers_name",
    messgae: "What is your name?"

},
{
    type: "input",
    name: "mangers_id",
    message: "What is your id?"
},
{
    type: "input",
    name: "mangers_email",
    message: "What is your email?"
},
{
    type: "input",
    name: "mangers_officeNumber",
    message: "What is your office number?"
}];



const internInfo = [{
    type: "input",
    name: "interns_name",
    messgae: "What is your name?"

},
{
    type: "input",
    name: "interns_id",
    message: "What is your id?"
},
{
    type: "input",
    name: "interns_email",
    message: "What is your email?"
},
{
    type: "input",
    name: "interns_school",
    message: "What school did you go to?"
}];

const engineerInfo = [{
    type: "input",
    name: "engineers_name",
    messgae: "What is your name?"

},
{
    type: "input",
    name: "engineers_id",
    message: "What is your id?"
},
{
    type: "input",
    name: "engineers_email",
    message: "What is your email?"
},
{
    type: "input",
    name: "engineers_github",
    message: "What is your Github link?"
}];


const list = [{
    type: "list",
    name: "teamMembers_type",
    choices: ["Engineer", "Intern", "I dont' want to add another team member"],
    message: "Select the role you want to add to your team"
}];

inquirer.prompt(confirmManager).then(ans => {
    if (ans.Manager === true) {
        promptManager();
    } else {
        promptNext();
    }
});

const promptManager = () => {
    inquirer.prompt(managerInfo).then(ans => {
        console.log(ans);
        mainArr.push(new Manager(ans.managers_name, ans.managers_id, ans.managers_email, ans.managers_officeNumber));
        promptNext();
    });
};

const promptNext = () => {
    inquirer.prompt(list).then(data => {
        switch(data.teamMember_type) {
            case "Engineer":
                promptEngineer();
                break;
            case "Intern":
                promptIntern();
                break;
        }
    });
};

const promptEngineer = () => {
    inquirer.prompt(engineerInfo).then(ans => {
        console.log(ans);
        mainArr.push(new Engineer(ans.engineers_name, ans.engineers_id, ans.engineers_email, ans.engineers_github));
        promptNext();
    })
}

const promptIntern = () => {
    inquirer.prompt(internInfo).then(ans => {
        console.log(ans);
        mainArr.push(new Intern(ans.interns_name, ans.interns_id, ans.interns_email, ans.engineers_school));
        promptNext();
    })
}

//const createHtml = () => {
    //console.log('this is new html');
    //console.log(render(mainArr));
    //render(mainArr);
    //fs.writeFile('index.html', render(mainArr), function(err){
       // if(err) throw err;
    //})
//};







// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

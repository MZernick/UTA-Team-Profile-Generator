const fs = require("fs");
const inquirer = require("inquirer");
const path = require('path');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const teamMember = [];
const idArray = [];

function generator() {
    function createManager() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the manager's name?",
                    name: "mgrName",
                },
                {
                    type: "input",
                    message: "What is the manager's ID?",
                    name: "mgrId",
                },
                {
                    type: "input",
                    message: "What is the manager's email?",
                    name: "mgrEmail",
                },
                {
                    type: "input",
                    message: "What is the manager's office phone number?",
                    name: "officePhone",
                },
            ])
            .then((answers) => {
                console.log("creating manager");
                const manager = new Manager(answers.mgrName, answers.mgrId, answers.mgrEmail, answers.officeNum);
                teamMember.push(manager);
                idArray.push(answers.mgrId);
                console.table(teamMember);
                mainPrompt();
            })
            .catch((err) => console.error(err));
    }
    function mainPrompt() {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "What is the role of the new employee?",
                    name: "choice",
                    choices: ["Engineer", "Intern", "None"],
                },
            ])
            .then((choice) => {
                console.log(choice);
                switch (choice.choice) {
                    case "Engineer":
                        createEngineer();
                        console.log("creating New Engineer");
                        break;
                    case "Intern":
                        createIntern();
                        console.log("creating Intern");
                        break;
                    default:
                        init();
                        console.log("none selected");
                }
            });
    }

    function createEngineer() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the engineer's name?",
                    name: "engrName",
                },
                {
                    type: "input",
                    message: "What is the engineer's id?",
                    name: "engrId",
                },
                {
                    type: "input",
                    message: "What is the engineer's email?",
                    name: "engrEmail",
                },
                {
                    type: "input",
                    message: "What is the engineer's GitHub username?",
                    name: "gitHub",
                },
            ])
            .then((answers) => {
                // console.log("creating engineer");
                const engineer = new Engineer(answers.engrName, answers.engrId, answers.engrEmail, answers.gitHub);
                teamMember.push(engineer);
                idArray.push(answers.engrId);
                console.table(teamMember);
                mainPrompt();
            })
            .catch((err) => console.error(err));
    }

    function createIntern() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your intern's name?",
                    name: "internName",
                },
                {
                    type: "input",
                    message: "What is your intern's id?",
                    name: "internId",
                },
                {
                    type: "input",
                    message: "What is your intern's email?",
                    name: "internEmail",
                },
                {
                    type: "input",
                    message: "Where does your intern attend school?",
                    name: "school",
                },
            ])
            .then((answers) => {
                // console.log("creating intern");
                const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.school);
                teamMember.push(intern);
                idArray.push(answers.internId);
                console.table(teamMember);
                mainPrompt();
            })
            .catch((err) => console.error(err));
    }

    function buildTeam() {

        if (!fs.existsSync(DIST_DIR)) {
            fs.mkdirSync(DIST_DIR);
        }
        fs.writeFileSync(distPath, render(teamMember), 'utf-8');
    }

    createManager();
}

generator();
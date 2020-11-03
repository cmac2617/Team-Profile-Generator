// Constants and required modules.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const teamMembers = []
const arrayId = []

// Main function.
function appMenu() {
    // Function for adding additional team members.
    function createTeam() {
        // Function for building the team.
        function buildTeam() {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdir(OUTPUT_DIR)
            }
            fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        }
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "I am done adding team members."]
            }
        ]).then(chosen => {
            switch (chosen.memberChoice) {
                case "Engineer":
                    createEngineer();
                    break
                case "Intern":
                    createIntern();
                    break
                default:
                    buildTeam();
            }
        })
    }
    // Function for adding manager initially.
    createManager();
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's ID?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid ID."
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email address?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid email."
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the manager's office number?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid office number."
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager)
            arrayId.push(answers.managerId)
            createTeam();
            // Run function here that creates entire "team", prompting you to create another employee.
        })
    }

    // Function for adding engineers to the team.
    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's ID?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid ID."
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email address?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid email."
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's Github?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid Github."
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer)
            arrayId.push(answers.engineerId)
            createTeam();
        })
    }

    // Function for adding interns to the team.
    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's employee ID?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid ID."
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email address?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school does your intern attend?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid school."
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
            teamMembers.push(intern)
            arrayId.push(answers.interId)
            createTeam();
        })
    }
}

appMenu();

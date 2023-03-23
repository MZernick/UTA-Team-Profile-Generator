const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHub) {
        super(name, id, email);
        // this.name = name;
        // this.id = id;
        // this.email = email;
        this.gitHub = gitHub;
        // this.role = "Engineer";
    }
    getGithub() {
        return this.gitHub;
    }
    getRole() {
        return "Employee";
    }
}

module.exports = Engineer;
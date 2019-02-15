function randomTeams(formData) {

    // wont allow the user to calculate unless all inputs filled
    if (formData.option && formData.quantity) {

        const members = formData.members.split(",");
        const totalPeople = members.length;
        const teams = [];

        let membersPerTeam = 0;
        let numOfTeams = 0;
        let team = []

        switch (formData.option) {
            case "people":
                numOfTeams = totalPeople / formData.quantity;
                membersPerTeam = totalPeople / numOfTeams;
                break;

            case "team":
                membersPerTeam = totalPeople / formData.quantity;
                numOfTeams = formData.quantity;
                break;
        }

        for (let i = 0; i < numOfTeams; i++) {
            for (let i = 0; i < membersPerTeam; i++) {
                if (members.length > 0) {
                    randomNo = Math.floor((Math.random() * members.length));
                    team.push(members[randomNo]);
                    members.splice(randomNo, 1);
                }
            }
            teams.push(team)
            team = [];
        }

        return teams;
    }
}

module.exports = randomTeams;
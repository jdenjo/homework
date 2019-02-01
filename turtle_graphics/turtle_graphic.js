// this constructs the main Turtle class 
class Turtle {

    // constructor puts the turtle on the map at x and y coordinates
    constructor(xAxis, yAxis) {
        this.moveHistory = [
            [xAxis, yAxis]
        ];
        this.currentDirection = "East";
    }

    //method to move turtle object forward in current direction
    forward(steps) {

        this.currentPosition = this.moveHistory[this.moveHistory.length - 1]

        switch (this.currentDirection) {

            case "East":
                for (let i = 0; i < steps; i += 1) {
                    this.moveHistory.push([(this.currentPosition[0] + 1), this.currentPosition[1]]);
                    this.currentPosition = [(this.currentPosition[0] + 1), this.currentPosition[1]];
                }
                return this;
                break;

            case "South":
                for (let i = 0; i < steps; i += 1) {
                    this.moveHistory.push([this.currentPosition[0], (this.currentPosition[1] + 1)]);
                    this.currentPosition = [this.currentPosition[0], (this.currentPosition[1] + 1)];
                }
                return this;
                break;

            case "West":
                for (let i = 0; i < steps; i += 1) {
                    this.moveHistory.push([(this.currentPosition[0] - 1), this.currentPosition[1]])
                    this.currentPosition = [(this.currentPosition[0] - 1), this.currentPosition[1]]
                }
                return this;
                break;

            case "North":
                for (let i = 0; i < steps; i += 1) {
                    this.moveHistory.push([this.currentPosition[0], (this.currentPosition[1] - 1)]);
                    this.currentPosition = [this.currentPosition[0], (this.currentPosition[1] - 1)];
                }
                return this;
                break;
        }
    }

    // turn turtle right to new direction based on current direction
    right() {

        switch (this.currentDirection) {

            case "North":
                this.currentDirection = "East";
                return this;
                break;

            case "East":
                this.currentDirection = "South";
                return this;
                break;

            case "South":
                this.currentDirection = "West";
                return this;
                break;

            case "West":
                this.currentDirection = "North";
                return this;
                break;
        }

    }

    // turn turtle right to new direction based on current direction
    left() {

        switch (this.currentDirection) {

            case "North":
                this.currentDirection = "West";
                return this;
                break;

            case "East":
                this.currentDirection = "North";
                return this;
                break;

            case "South":
                this.currentDirection = "East";
                return this;
                break;

            case "West":
                this.currentDirection = "South";
                return this;
                break;
        }
    }

    // returns an array of the path the turtle took
    allPoints() {
        return this.moveHistory;
    }

    // prints out a visual cartesian plane of the turtle's path
    print() {

        // collect max and min coordinates for the cartesian plane
        // in order to dynamically size the output for the turtle map
        this.xMax = this.moveHistory[0][0];
        this.yMax = this.moveHistory[0][1];
        this.xMin = this.moveHistory[0][0];
        this.yMin = this.moveHistory[0][1];

        for (let i = 0; i < this.moveHistory.length; i += 1) {
            if (this.moveHistory[i][0] > this.xMax) {
                this.xMax = this.moveHistory[i][0];
            }
            if (this.moveHistory[i][0] < this.xMin) {
                this.xMin = this.moveHistory[i][0];
            }
        }

        for (let i = 0; i < this.moveHistory.length; i += 1) {
            if (this.moveHistory[i][1] > this.yMax) {
                this.yMax = this.moveHistory[i][1];
            }
            if (this.moveHistory[i][1] < this.yMin) {
                this.yMin = this.moveHistory[i][1];
            }
        }

        //put historical x and y coordinates in  array that is string-based
        //to use array search() methods when plotting coordinates
        this.cordinates = [];
        for (let i = 0; i < this.moveHistory.length; i += 1) {
            this.cordinates.push(this.moveHistory[i].toString());
        }

        //creates grid as string to be outputed
        this.grid = "";

        // loops through each row as y coordinates
        for (let i = (this.yMin - 1); i <= this.yMax; i += 1) {

            // loops through each column as x coordinates
            for (let n = this.xMin; n <= (this.xMax + 1); n += 1) {

                // checks to see if the turtle travelled on the coordinate
                // in quetion
                if (this.cordinates.includes(`${n},${i}`)) {
                    //if the turtle was here, draw a filled square
                    this.grid += ` ■ `;
                } else {
                    //if the turtle didnt come here, draw an empty square
                    this.grid += ` □ `;
                }
            }
            //on each row add a line break
            this.grid += "\n";
        }
        // print out the grid
        console.log(this.grid);
    }
}


// These are the scenarios in problem set
const flash = new Turtle(0, 4).forward(3).left().forward(3);
flash.print();
console.log(flash.allPoints());

console.log("\n");

new Turtle(0, 4)
  .forward(3)
  .left()
  .forward(3)
  .right()
  .forward(5)
  .right()
  .forward(8)
  .right()
  .forward(5)
  .right()
  .forward(3)
  .left()
  .forward(3)
  .print()

console.log("\n");

new Turtle(0, 0)
    .forward(5)
    .right()
    .forward(5)
    .right()
    .forward(5)
    .right()
    .forward(5)
    .print()
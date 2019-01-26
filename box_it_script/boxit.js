
const phrase = process.argv.slice(2);

boxIt(phrase);
// this function draws a bar based on the user input
function drawLine(length){
    // initialize the string of length to draw
    border = "";

    // create length for the amount needed
    for (let i = 0; i < length; i += 1){
        border += "━"
    }
    return border
}

// this function draws top borders at specified length
function drawTopBorder(length){

    return "┏" + drawLine(length) + "┓";
}

// this function draws a middle border at specified length
function drawMiddleBorder(length){

    return "┣" + drawLine(length) + "┫";
}

// this function draws a bottom border at specified length
function drawBottomBorder(length){

    return "┗" + drawLine(length) + "┛";
}

function drawBarsAround(phrase){    

    result = "┃" + phrase;
    
    for (i=0; i < columnWidth - phrase.length; i++){
        
        result += " ";
    };
    
    result += "┃";
    
    return result;
}

// main function to output the table of names
function boxIt(phrase){

    // if its not an array then send back an empty table
    if(phrase[0] === undefined){
        output = drawTopBorder(0) + "\n" + drawBottomBorder(0);
    }
    else{
    // initialise the string variable
    output = ""
    // initialise integer that gives table column width
    columnWidth = 0

    //find columnWidth string length from largest name 
    for (var key of phrase){
        if (key.length > columnWidth){
            columnWidth = key.length;
        }
    }

    //loop through names to make the new table
    for (let i = 0; i < phrase.length; i += 1){

        //write top cell
        if (i === 0){
            output += drawTopBorder(columnWidth) + "\n" + drawBarsAround(phrase[i]) 
            // if there is only one value in array make 1 cell
            if (phrase.length === 1){
                output += "\n" + drawBottomBorder(columnWidth) + "\n"  ;    
            }
            // if multiple values in array make border to accomodate below
            else{
                output += "\n" + drawMiddleBorder(columnWidth) + "\n"  ;    
            }
        }
        //write the middle cells
        else if (i < phrase.length -1){
            output += drawBarsAround(phrase[i]) + "\n"  + drawMiddleBorder(columnWidth) + "\n"  ; 
        }
        //write the bottom cell
        else if ( i === phrase.length -1){
        output += drawBarsAround(phrase[i]) + "\n" + drawBottomBorder(columnWidth) + "\n"  ; 
        }
    }
    }

    
    console.log(output);
}


// console.log(boxIt(['Jon Snow', 'Cersei Lannister' ,'Daenerys Targaryen']));
// console.log(boxIt(['Jon Snow']));
// console.log(boxIt());

// console.log(drawLine(4));
// console.log(drawLine(8));

// console.log(drawTopBorder(4)) //) returns '┏━━━━┓'
// console.log(drawTopBorder(0)) //) returns '┏┓'

// console.log(drawMiddleBorder(8)) // returns '┣━━━━━━━━━┫'
// console.log(drawMiddleBorder(0)) // returns '┣┫'

// console.log(drawBottomBorder(2)) // returns '┗━━┛'

// console.log(drawBarsAround("My name is Dan")) // returns "┃My name is Dan┃"
// console.log(drawBarsAround("You are Jane  ")) // returns "┃You are Jane  ┃"
// console.log(drawBarsAround("  You are Bill")) // returns "┃  You are Bill┃"


let mystery_word = "stranger"
let miss_count = 0;
let max_miss = 8;
let hit_count = 0;
let guessed_letters = new Set();

let win_audio = new Audio('./sounds/win.mp3');
let lose_audio = new Audio('./sounds/lose.mp3');


mystery_word = mystery_word.toUpperCase();
let word_array = mystery_word.split("");

$(document).ready(() => {

  // add the bars
  for (let index = 0; index < mystery_word.length; index++) {
    $(".bar_area").append(`<div id = "${index}" class="bar"> ___ </div>`);
  }

  //  sees if the letter is included and if it does changes 1 or many bars 
  $('li').on('mousedown', (event) => {
    if (miss_count < 6) {
      $(event.target).attr('style', 'background-color: red; color:white');

      if (!guessed_letters.has(event.currentTarget.innerHTML)) {
        for (let index = 0; index < mystery_word.length; index++) {
          if (word_array[index] === event.currentTarget.innerHTML) {
            $(`#${index}`).html("_" + event.currentTarget.innerHTML + "_");
            hit_count += 1;
          }
        }
      }


    }
  });

  //track hits and misses and end game if needed
  $('li').on('mouseup', (event) => {

    if (!guessed_letters.has(event.currentTarget.innerHTML)) {

      if (!mystery_word.includes(event.currentTarget.innerHTML)) {
        if (miss_count < 6)
          miss_count += 1;
        $("#hangman-image").attr("src", `./images/${miss_count + 1}.jpg`);
        if (miss_count >= 6) {
          lose_audio.play();
          alert("Better luck next time!")
        }
      } else {
        if (hit_count >= mystery_word.length) {
          win_audio.play();
          alert("Congratulations! You win!");

        }
      }
    }

    guessed_letters.add(event.currentTarget.innerHTML);
    
  });



});
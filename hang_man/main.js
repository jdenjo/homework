let mystery_word = "stranger"
let miss_count = 0;
let max_miss = 6;
let hit_count = 0;
let guessed_letters = new Set();

let win_audio = new Audio('./sounds/win.mp3');
let lose_audio = new Audio('./sounds/lose.mp3');

mystery_word = mystery_word.toUpperCase();
let word_array = mystery_word.split("");

$(document).ready(() => {

  for (let index = 0; index < mystery_word.length; index++) {
    $(".bar_area").append(`<div id = "${index}" class="bar"> ___ </div>`);
  }

  $('li').on('mousedown', (event) => {
    if (miss_count < max_miss) {
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

  $('li').on('mouseup', (event) => {
    if (!guessed_letters.has(event.currentTarget.innerHTML)) {
      if (!mystery_word.includes(event.currentTarget.innerHTML)) {
        if (miss_count < max_miss)
          miss_count += 1;
        $("#hangman-image").attr("src", `./images/${miss_count + 1}.jpg`);
      }
      if (miss_count >= 6) {
        lose_audio.play();
        setTimeout(function(){alert("Better luck next time!")}, 200);
      } else {
        if (hit_count >= mystery_word.length) {
          win_audio.play();
          setTimeout(function(){alert("Congratulations! You win!")}, 200);
        }
      }
    }
    //this adds guessed letters so the user doesnt push twice
    guessed_letters.add(event.currentTarget.innerHTML);
  });
});


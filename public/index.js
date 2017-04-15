var player1 = {};
var player2 = {};
var player3 = {};
var player4 = {};
var player5 = {};
var playerArray = [];
var currentScores = document.getElementById('currentScores')

var playerForm = document.getElementById('players');

playerForm.addEventListener('submit', function(event){
  event.preventDefault();

  player1.name = this.player1.value;
  player1.score = 0;
  player1.dealer = true;
  player2.name = this.player2.value;
  player3.name = this.player3.value;
  player4.name = this.player4.value;
  player5.name = this.player5.value;

  playerArray = [];

  playerArray.push(player1, player2, player3, player4, player5);

  playerArray.forEach((player, index)=>{
    if (index === 0) {
      player.dealer = true;
    } else {
      player.dealer = false;
    }
    player.score=0;

    renderPlayers(player);
  })
})

var renderPlayers = function(player) {
  var liEl = document.createElement('li');
  var name = document.createElement('h2');
  var score = document.createElement('h3');

  name.innerHTML = player.name;
  score.innerHTML = player.score

  if (player.dealer) {
    liEl.className = 'player dealer';
  } else {
    liEl.className = 'player';
  }

  liEl.appendChild(name).appendChild(score)
   currentScores.appendChild(liEl);


}

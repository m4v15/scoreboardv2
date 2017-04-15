var player1 = {};
var player2 = {};
var player3 = {};
var player4 = {};
var player5 = {};
var playerArray = [];
var currentScores = document.getElementById('currentScores')
var inputs = document.getElementById('inputs')

var playerForm = document.getElementById('players');

playerForm.addEventListener('submit', function(event){
  event.preventDefault();

  player1.name = this.player1.value;
  player2.name = this.player2.value;
  player3.name = this.player3.value;
  player4.name = this.player4.value;
  player5.name = this.player5.value;

  playerArray = [];

  playerArray.push(player1, player2, player3, player4, player5);

  playerArray.forEach((player, index, players)=>{
    if (index === 0) {
      player.dealer = true;
    } else {
      player.dealer = false;
    }
    player.score=0;

    renderPlayers(player);

  })

  renderEmptyInputs(playerArray, inputs, 'bid', bidListener);
})

var renderPlayers = function(player) {
  var liEl = document.createElement('li');
  var name = document.createElement('h2');
  var score = document.createElement('h3');
  var bid = document.createElement('h3');

  name.innerHTML = player.name;
  score.innerHTML = player.score;
  bid.innerHTML = 'Current bid: '+player.bid;

  if (player.dealer) {
    liEl.className = 'player dealer';
  } else {
    liEl.className = 'player';
  }

  liEl.appendChild(name).appendChild(score).appendChild(bid)
  currentScores.appendChild(liEl);
}

var replacePlayers = function(players) {
  var oldScores = document.getElementById('currentScores')
  oldScores.innerHTML='';
  players.forEach(function(player){
    var liEl = document.createElement('li');
    var name = document.createElement('h2');
    var score = document.createElement('h3');
    var bid = document.createElement('h3');

    name.innerHTML = player.name;
    score.innerHTML = player.score;
    bid.innerHTML = 'Current bid: '+player.bid;

    if (player.dealer) {
      liEl.className = 'player dealer';
    } else {
      liEl.className = 'player';
    }

    liEl.appendChild(name).appendChild(score).appendChild(bid)
    oldScores.appendChild(liEl);
  })
}

var renderEmptyInputs = function(players, form, inputType, listener, oldlist) {
  if (oldlist){
    console.log(oldlist);
    form.removeEventListener('submit', oldlist)
  }

  form.innerHTML='';
  players.forEach((player, index)=>{
    var liEl = document.createElement('li');
    var name = document.createElement('h2');
    var value = document.createElement('input');
    value.setAttribute('type', 'number');
    value.setAttribute('name', inputType);
    value.setAttribute('value', 1);
    value.setAttribute('id', inputType);

    name.innerHTML = player.name+'\'s '+inputType;
    liEl.appendChild(name).appendChild(value)

    form.appendChild(liEl);
  })

  var submiter = document.createElement('input');
  submiter.setAttribute('type', 'submit')
  submiter.setAttribute('value', 'Submit '+inputType)
  submiter.setAttribute('id', 'submitter')
  form.appendChild(submiter)

  form.addEventListener('submit', listener(players, inputType, inputs))
}

var bidListener = function (players, inputType, inputs) {
  return function(event){
    event.preventDefault();
    var formData = document.querySelectorAll('#'+inputType);
    players.forEach(function(player, index){
      player.bid = formData[index].valueAsNumber;
    })
    replacePlayers(players);
    inputs.style.display = 'none';
  }
}

// var trickListener = function (players, inputType) {
//   event.preventDefault();
//   var formData = document.querySelectorAll('#'+inputType);
//   console.log('tricking');
//
//   // players.forEach(function(player, index){
//   //   if (player.bid === formData[index].value){
//   //     player.score += 10 + formData[index].value;
//   //   } else {
//   //     player.score += formData[index].value;
//   //   }
//   //   player.bid = null;
//   // })
//   // replacePlayers(players)
// }

// var renderEmptyWonInputs = function(players, form) {
//   form.innerHTML = ''
//   players.forEach((player, index, array)=>{
//     var liEl = document.createElement('li');
//     var name = document.createElement('h2');
//     var value = document.createElement('input');
//     value.setAttribute('type', 'number')
//     value.setAttribute('name', won)
//     value.setAttribute('value', 1);
//     value.setAttribute('id', won)
//
//     name.innerHTML = 'Enter number of tricks '+player.name+' won:';
//     liEl.appendChild(name).appendChild(value)
//     form.appendChild(liEl);
//   })
//
//   var submiter = document.createElement('input');
//   submiter.setAttribute('type', 'submit')
//   submiter.setAttribute('value', 'Submit tricks won')
//   submiter.setAttribute('id', 'submitter')
//
//   inputs.innerHTML='';
//   inputs.removeEventListener('submit')
//   inputs.appendChild(submiter)
//
//   inputs.addEventListener('submit', function(event){
//     event.preventDefault();
//     var formData = this.querySelectorAll('#won');
//     players.forEach(function(player, index){
//       if (player.bid === formData[index].value){
//         player.score += 10 + formData[index].value;
//       } else {
//         player.score += formData[index].value;
//       }
//       player.bid = null;
//     })
//     replacePlayers(players)
//
//   })
// }

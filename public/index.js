// access forms from the page
var currentScores = document.getElementById('currentScores')
var playerForm = document.getElementById('players');

var bids = document.getElementById('bids')
var tricks = document.getElementById('tricks')

var roundChecker = document.getElementById('round');
console.log(roundChecker.innerHTML);

var roundNum = 10;
var down = true;


//When submit button on player names is pressed, create player objects with name, score and dealer keys
playerForm.addEventListener('submit', function(event){
  event.preventDefault();

  // create array to hold the player objects
  var playerArray = [];

  // create empty player objects and push to array
  var player1 = {};
  var player2 = {};
  var player3 = {};
  var player4 = {};
  var player5 = {};
  playerArray.push(player1, player2, player3, player4, player5);

  //access player names from form
  var playernames = this.querySelectorAll('#player')
  //loop through the players and fill in initial details
  playerArray.forEach((player, index, players)=>{
    player.name = playernames[index].value;

    if (index === 0) {
      player.dealer = true;
    } else {
      player.dealer = false;
    }
    if (!player.score) {player.score = 0};
    if (!player.bid) {player.bid = 'Waiting'};

    //render each player list item for each player object
    renderPlayers(player);

  })
  //render the input form for new bids
  renderEmptyInputs(playerArray);
})

//for a given player object, create a list element, with name, score and bid child nodes, append this to the current scores UL.
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


//for an array of players, loop through and replace currentScores of each player
var replacePlayers = function(players) {
  currentScores.innerHTML='';
  players.forEach(function(player){
    renderPlayers(player);
  })
  roundChecker.innerHTML = roundNum;
}

//render the inputs for bids/scores
var renderEmptyInputs = function(players) {

  // console.log('Html of form:', form.innerHTML);
  //empty the form
  bids.innerHTML='';
  // console.log('Html of form:', form.innerHTML);

  //for each player, create a list element holder the players name and an input box for them, changing what we ask for depending on inputType variable
  players.forEach((player, index)=>{

    var bidLiEl = document.createElement('li');
    var bidName = document.createElement('h2');

    var trickLiEl = document.createElement('li');
    var trickName = document.createElement('h2');

    var bidIpBox = document.createElement('input');
    bidIpBox.setAttribute('type', 'number');
    bidIpBox.setAttribute('name', 'bid');
    bidIpBox.setAttribute('value', 1);
    bidIpBox.setAttribute('id', 'bid');

    var trickIpBox = bidIpBox.cloneNode(true);
    trickIpBox.setAttribute('type', 'number');
    trickIpBox.setAttribute('name', 'trick');
    trickIpBox.setAttribute('value', 1);
    trickIpBox.setAttribute('id', 'trick');

    //access the name to personalise the name header
    bidName.innerHTML = player.name+'\'s bid:'
    trickName.innerHTML = 'Number of tricks '+player.name+' won:'

    bidLiEl.appendChild(bidName).appendChild(bidIpBox);
    trickLiEl.appendChild(trickName).appendChild(trickIpBox);

    //append this input box to the form
    bids.appendChild(bidLiEl);
    tricks.appendChild(trickLiEl);
  })

  //create a submit button
  var bidSubmitBtn = document.createElement('input');
  bidSubmitBtn.setAttribute('type', 'submit')
  bidSubmitBtn.setAttribute('value', 'Submit')
  bidSubmitBtn.setAttribute('id', 'submitter')

  var trickSubmitBtn = bidSubmitBtn.cloneNode(true);

  bids.appendChild(bidSubmitBtn);
  tricks.appendChild(trickSubmitBtn);

  //add event listener to the submit button
  bids.addEventListener('submit', bidListener(players))
  tricks.addEventListener('submit', trickListener(players))
  tricks.style.display = 'none';
}

//event listener function to add the bids in an input to the currentScores elements
var bidListener = function (players) {
  return function(event){
    event.preventDefault();
    console.log('bidding');
    //get the values from the form
    var formData = document.querySelectorAll('#bid');

    //loop through the players array and add their bid to the objects
    players.forEach(function(player, index){
      player.bid = formData[index].valueAsNumber;
    })
    //rerender the players
    replacePlayers(players);
    bids.style.display = 'none';
    tricks.style.display = 'inline';

//    renderEmptyInputs(players, inputs, 'trick', trickListener);
  }
}

var trickListener = function (players) {
  return function (event) {
    event.preventDefault();

    //loop through the players and add the score from the form correctly
    var formData = document.querySelectorAll('#trick');

    players.forEach(function(player, index){
      (player.bid === formData[index].valueAsNumber) ?
      player.score += 10 + formData[index].valueAsNumber :
      player.score += formData[index].valueAsNumber;
      player.bid = null;
    })
    if (down && roundNum === 1){
      down = false;
    } else if (down) {
      roundNum -= 1;
    } else {
      roundNum +=1
    }
    replacePlayers(players)

    tricks.style.display = 'none';
    bids.style.display = 'inline';

  }

}

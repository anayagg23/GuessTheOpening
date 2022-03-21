var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')
var sboard = Chessboard('sboard', 'start')
var failures = 0

var openings_list = [
  "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Bg7",
  "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O",
  "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6",
  "1. c4 c6 2. d4 d5 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5",
  "1. e4 e5 2. Nf3 d6 3. d4 exd4 4. Nxd4 Nf6 5. Nc3 Be7",
  "1. Nf3 Nf6 2. g3 b5 3. Bg2 Bb7 4. O-O e6 5. d3 Be7",
  "1. e4 c5 2. Nf3 Nc6 3. Bb5 g6 4. O-O Bg7 5. c3 Nf6",
  "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7",
  "1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. Bg5 Be7 5. Nc3 O-O",
  "1. e4 e5 2. Nf3 Nf6 3. Nc3 Nc6 4. d4 exd4 5. Nd5 Nxd5",
  "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 e6 5. Be2 Nf6",
  "1. d4 Nf6 2. c4 c5 3. d5 b5 4. e3 g6 5. cxb5 Bg7",
  "1. e4 c5 2. Nf3 d6 3. Bb5+ Bd7 4. Bxd7+ Qxd7 5. O-O Nf6",
  "1. e4 g6 2. d4 Bg7 3. Nc3 d6 4. Be3 Nd7 5. Qd2 a6",
  "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. d4 d6 5. f4 Bf5"
]

var rand_num = Math.floor(Math.random() * (openings_list.length - 1))

var opening = openings_list[rand_num]


function onDragStart (source, piece, position, orientation) {
  if (game.game_over()) return false
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // FIX: queen promotion only
  })

  if (move === null) return 'snapback'

  updateStatus()
}


function onSnapEnd () {
  board.position(game.fen())
}

function updateStatus () {
  var status = ''

  var moveColor = 'White'
  if (game.turn() === 'b') {
    moveColor = 'Black'
  }

  
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

 
  else if (game.in_draw()) {
    status = 'Game over, drawn position'
  }

  else {
    status = moveColor + ' to move'

    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
    if (failures == 0){
        var dummy_game_0 = new Chess()
        dummy_game_0.load_pgn(opening)
        sboard.position(dummy_game_0.fen())
    }
    if (failures == 1){
        var dummy_game_1 = new Chess()
        var opening_1 = opening.substring(0, opening.lastIndexOf(" "))
        dummy_game_1.load_pgn(opening_1)
        sboard.position(dummy_game_1.fen())
    }
    if (failures == 2){
        var dummy_game_2 = new Chess()
        var opening_2 = opening.substring(0, opening.lastIndexOf(" "))
        opening_2 = opening_2.substring(0, opening_2.lastIndexOf(" "))
        dummy_game_2.load_pgn(opening_2)
        sboard.position(dummy_game_2.fen())
    }
    if (failures == 3){
        var dummy_game_3 = new Chess()
        var opening_3 = opening.substring(0, opening.lastIndexOf(" "))
        opening_3 = opening_3.substring(0, opening_3.lastIndexOf(" "))
        opening_3 = opening_3.substring(0, opening_3.lastIndexOf(" "))
        opening_3 = opening_3.substring(0, opening_3.lastIndexOf(" "))
        dummy_game_3.load_pgn(opening_3)
        sboard.position(dummy_game_3.fen())
    }
    if (failures == 4){
        $("#exampleModal3").modal("show")
        document.getElementById("words3").innerHTML="Wow, you're total trash at this game! The opening was " + opening
    }
  }

  $status.html(status)
  $fen.html(game.fen())
  $pgn.html(game.pgn())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)


function isright(game){
    correct_opening = opening.substring(0, opening.lastIndexOf(" "))
    correct_opening = correct_opening.substring(0, correct_opening.lastIndexOf(" "))
    correct_opening = correct_opening.substring(0, correct_opening.lastIndexOf(" "))
    correct_opening = correct_opening.substring(0, correct_opening.lastIndexOf(" "))
    correct_opening = correct_opening.substring(0, correct_opening.lastIndexOf(" "))
    correct_opening = correct_opening.substring(0, correct_opening.lastIndexOf(" "))
    if (game.pgn()==correct_opening){
        var tries = failures + 1;
        $("#exampleModal").modal("show")
        document.getElementById("words").innerHTML="The opening was "+opening+". You got it in "+tries+" tries!"
    }else{
   
    failures++
    if (failures == 1){
        document.getElementById("fails").innerHTML="You have "+failures+" incorrect attempt"
    }else{
        document.getElementById("fails").innerHTML="You have "+failures+" incorrect attempts"
        }
    var moves = opening.split(" ")
    moves = [moves[1], moves[2], moves[4], moves[5], moves[7], moves[8]]
    var inputted_moves = (game.pgn()).split(" ")
    inputted_moves=[inputted_moves[1], inputted_moves[2], inputted_moves[4], inputted_moves[5], inputted_moves[7], inputted_moves[8]]
    var correct_num = 0
    for (var i = 0; i<6; i++){
      for (var j = 0; j<6; j++){
        if (moves[i]==inputted_moves[j] && (i-j) % 2 == 0){
          correct_num++
        }
      }
    }
    var str = "Incorrect, try again. You had " + correct_num + " correct move(s)"
    if (failures != 4){
      $("#exampleModal2").modal("show")
      document.getElementById('words2').innerHTML=str
    }
    updateStatus()
  }
}

$('#UndoBtn').on('click', function () {
    var str = game.pgn()
    str = removelastmove(str)
    game.load_pgn(str)
    board.position(game.fen())
    updateStatus()
  })

function removelastmove(str){
    return str.substring(0, str.lastIndexOf(" "))
}

document.onkeydown = function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    if(key===37){
        var str = game.pgn()
        str = removelastmove(str)
        game.load_pgn(str)
        board.position(game.fen())
        updateStatus()
    }
    if(key==13){
      isright(game)
    }
}

updateStatus()

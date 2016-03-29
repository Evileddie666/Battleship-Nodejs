var DEBUG = true;
//import Express
var app = require('express')();
var express = require('express');
//create a NodeJs http server
var http = require('http').Server(app);

var io = require('socket.io')(http);
app.use(express.static(__dirname + '/vuejs'));
app.use(express.static(__dirname + '/socket.io'));

var players = [];

io.on('connection', function(socket){

if (players.length >= 2){
	socket.emit('RoomIsFull', true);
	console.log('Room is ful');
	return;
}

	var id = socket.id;
	players.push({'id' : id, 'ready': false, 'takenHits': 0});
	// console.log('Player ' + id + ' joined' );

if(players.length > 1){
	socket.emit('enemyIsFound', 'enemyIsFound');
	socket.broadcast.emit('enemyIsFound', 'enemyIsFound');
	socket.on('init', function(players){
	var player;
	player = {'id' : socket.id, 'ready': true};

	//init with if statement to force the correct id
	if (id == socket.id) socket.emit('init', player)
	console.log(id + 'is ready to play');
	})
};


	socket.on('fire', function(obj){
		// var hit = false;
		// var enemy;

		// for(var i = 0; i < players.length; i++){
		// 	if(players[i].id != socket.id){
		// 		enemy = players[i];

		// 		for (var n = 0; n < players.length; n++) {
		// 			if(players.locations[n] == obj.coordination){
		// 				hit = true
		// 			}
		// 		}

		// 		if(hit){
		// 			console.log(enemy.takenHits++);
		// 		}
		// 	}
		// }
	});


	socket.on('disconnect', function(){
		players.splice(playerID(socket,id), 1)
			console.log('a Player disconnect');
	}); 
});

//let it listen on port
http.listen(1337, function()
{
	console.log('listening on port 1337');
});

function playerID(id)
{
	players.forEach(function(e, i)
	{
		if(e.id == id) return e;
	});
}

// for (var i = ships.length - 1; i >= 0; i--) {
// 	console.log(vm.ships[i].available)
// }
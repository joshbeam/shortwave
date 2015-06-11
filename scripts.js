var greet = shortwave.on('greet', function(e, data) {
	console.log(e, data);
});

shortwave.on('greet', function(e, data) {
	console.log('I still exist');
});

var adieu = shortwave.on('adieu', function(e, data) {
	console.log(e, data);
});

shortwave.emit('greet', {
	greeting: 'hello'
});

console.log(shortwave.get());

// .block() returns true or false if the removal of the handler was successful
console.log(shortwave.block(greet));

console.log(shortwave.get());

shortwave.emit('greet');
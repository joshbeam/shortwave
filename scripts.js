// You can store listeners in variables to remove them later
var greet = shortwave.on('greet', function(e, data) {
	console.log(e, data);
});

// But you don't have to store listeners in variables
shortwave.on('greet', function(e, data) {
	console.log('I still exist');
});

var adieu = shortwave.on('adieu', function(e, data) {
	console.log(e, data);
});

// You can check out all current event listeners and handlers
/*
    {
    	greet: Array[2], // 2 handlers
    	adieu: Array[1]  // 1 handler
    }
*/
console.log(shortwave.get());

shortwave.emit('greet', {
	greeting: 'hello'
});
// => { greeting: 'hello' }
// => 'I still exist'

// .block() returns true or false if the removal of the handler was successful
shortwave.block(greet, function(remainingEvents) {
	console.log('success :)', remainingEvents);
}, function(remainingEvents) {
	console.log('failure :(', remainingEvents);
});

// Let's see our updated events
/*
    {
    	greet: Array[1], // Only 1 handler now! Success!
    	adieu: Array[1]  // 1 handler
    }
*/
console.log(shortwave.get());

shortwave.emit('greet');
// => 'I still exist'
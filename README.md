# shortwave

Simple JavaScript implementation of the broadcast/receive or pub/sub method for sending and receiving events.

It's similar to how you would use `$rootScope.$broadcast` and `$rootScope.$on` in <a href="https://angularjs.org/">AngularJS</a>.

What can you use this repo for? <a href="https://facebook.github.io/react/">React</a>, for example.

## Install

```
git clone https://github.com/joshbeam/shortwave.git
```

Include `shortwave.js` at the end of the `<body>`.

Open `index.html` that is included in this repo for some examples of usage.

## Usage

```javascript
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
```
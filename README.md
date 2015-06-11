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
// Let's notify ourselves whenever we add a new event handler to shortwave
shortwave.on('add', notify);

function notify(e, eventName) {
    console.log(eventName + ' was added');
}


// You can store listeners in variables to remove them later
// After you attach an event handler, you can call .once() to do something real quick
var greet = shortwave.on('greet', function(e, data) {
    console.log(data);
}).once('add', 'greet');

// But you don't have to store listeners in variables
shortwave.on('greet', function(e, data) {
    console.log('I\'m another handler, I still exist');
}).once('add', 'greet');

shortwave.emit('greet', {
    greeting: 'hello'
});
// => { greeting: 'hello' }
// => 'I'm another handler, I still exist'

var adieu = shortwave.on('adieu', function(e, data) {
    console.log(e, data);
}).once('add', 'adieu');

// You can check out all current event listeners and handlers
/*
    {
        add:   Array[1], // 1 handler
        greet: Array[2], // 2 handlers
        adieu: Array[1]  // 1 handler
    }
*/
shortwave.get(get);

function get(events) {
    console.log('Events', events);
}

// Or just the names of events
shortwave.collect(collect);

function collect(eventNames) {
    console.log('Event names', eventNames);
}

// .block() returns true or false if the removal of the handler was successful
shortwave.block(greet, success /*, failure */);

function success(remainingEvents) {
    console.log('success :)', remainingEvents);
}

// Let's see our updated events (.get() doesn't always need a callback... we can just return the events)
/*
    {
        add:   Array[1], // 1 handler
        greet: Array[1], // Only 1 handler now! Success!
        adieu: Array[1]  // 1 handler
    }
*/
console.log(shortwave.get());

shortwave.emit('greet');
// => 'I'm another handler, I still exist'
```
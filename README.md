# shortwave

Simple JavaScript implementation of the broadcast/receive or pub/sub method for sending and receiving events.

It's similar to how you would use `$rootScope.$broadcast` and `$rootScope.$on` in <a href="https://angularjs.org/">AngularJS</a>.

What can you use this repo for? <a href="https://facebook.github.io/react/">React</a>, for example.

## Install

```
npm install --save shortwave
```

## Usage

You can use it with <a href="http://browserify.org/">Browserify</a> so that you can `require` it on the front-end.

```javascript
var HELLO = 'hello';

var remove = shortwave.on(HELLO, sayHello);

function sayHello() {
    console.log('Hello!');
}

shortwave.emit(HELLO);
// => 'Hello!'

var events = shortwave.get();
console.log(events);
/*
 * {
 *      hello: Array[1];
 * }
 */

shortwave.remove(remove, success, failure);

function success(remainingEvents) {
    console.log('success!')
}

function failure(remainingEvents) {
    console.log('failure');
}       
```
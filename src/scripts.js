import shortwave from './shortwave';

var hello = shortwave.on('hello', sayHi);

function sayHi() {
    console.log('hello');
}

shortwave.emit('hello');

shortwave.remove(hello).then((evts) => {
    console.log(evts)
});
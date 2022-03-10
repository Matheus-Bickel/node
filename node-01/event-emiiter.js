const EventEmiiter = require('evets')

class MyEmitter extends EventEmiiter {

}

const MyEmitter = new MyEmitter()
const eventName = 'user:click'

MyEmitter.on(eventName, function (click) {
    console.log('user clicked', click)
})

MyEmitter.emit(eventName, 'event 1')
MyEmitter.emit(eventName, 'event 2')

let count = 0
setInterval(function() {
    MyEmitter.emit(eventName, 'on ok ' + (count++))
},1000)
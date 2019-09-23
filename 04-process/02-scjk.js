#!/usr/bin/node

const EvenEmitter = require('events').EvenEmitter,
      util        = require('util');

function Radio(station){
  EvenEmitter,call(this);

  var self = this;

  setTimeout(() =>{
    self.emit('play');
  },0);

  setTimeout(() => {
    self.emit('stop');
  },5000);
}

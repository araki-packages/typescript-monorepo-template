function timeStamp() {
  this._startTime = Date.now();
  this._lap = [];
}
timeStamp.prototype.lap = (label) => {
  this._lap.push({label, time: Date.now() - this._startTime });
}

timeStamp.prototype.end = () => {
  return this._lap;
}

module.exports = timeStamp;
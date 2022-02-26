class Logger {
  logs = [];

  insert(message) {
    this.logs.push(message);
  }

  clear() {
    this.logs = []; 
  }

  show() {
    console.log(this.logs);
  }

  filter(log) {
    console.table(this.logs.filter((log) => log.includes(log)));
  }
}

module.exports = new Logger();
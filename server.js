const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require('figlet')
const PORT = 8000

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
  else if (page == "/api") {
    let name1 = params['student']
    if ("student" in params) {
      if (name1) {
        res.writeHead(200, { "Content-Type": "application/json" });
        let eightBall = Math.floor(Math.random()*11)
        function getEightBall() {
          switch (eightBall) {
            case 0:
              return `${name1}, you're gonna die.`
            case 1:
              return `${name1}, you're going to get mugged, although the only thing you lose is your dignity`
            case 2:
              return `${name1}, you're going to spill ketchup on your only shirt.`
            case 3:
              return `${name1}, you're going to trip and fall.`
            case 4:
              return `${name1}, you're going to have an average day.`
            case 5:
              return `${name1}, you're going to find a $20 bill on the ground.`
            case 6:
              return `${name1}, your worst enemy will get a paper cut.`
            case 7:
              return `${name1}, you're going to find a free hot dog voucher.`
            case 8:
              return `${name1}, you're going to find a long lost brother you never knew about is Bill Gates.`
            case 9:
              return `${name1}, you're going to be gifted your own private island, tax free.`
            case 10:
              return `${name1}, you're going to win the lottery and get to go to Mars for free.`
            default:
              return `Add your name.`
          }
        }
        const objToJson = {
          myFortune: getEightBall()
        };
        res.end(JSON.stringify(objToJson));
      } //student = leon
      else if (!name1) {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          myFortune: 'Gimme your name'
        };
        res.end(JSON.stringify(objToJson));
      } //student != leon
    } //student if
  } //else if
  else if (page == "/css/style.css") {
    fs.readFile("css/style.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == "/js/main.js") {
    fs.readFile("js/main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(process.env.PORT || PORT, ()=>{
  console.log(`The server is now running on port ${PORT}: Betta go catch it!`)
});

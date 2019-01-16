var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

function getById (id) {
  var i = "id"
  return urlDatabase[id]
}

function generateRandomString() {
  var inputs = ["a","b","c","d","e","f","g","h","i","j","k","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0",""]
  result = ''
  for (i = 0; i <6; i++) {
    result += inputs[Math.floor((Math.random() * inputs.length))]
  }
  return result
}

function addToDatabase(longUrl) {
  var i = generateRandomString()
  urlDatabase[i] = longUrl
  return i
}

function removeItem(object, item) {
delete object.item
}


var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
  "9r3204": "http://www.espn.com"
};

app.post("/urls/:id", (req,res) =>{
urlDatabase[req.params.id] = req.body.longURL
res.redirect("/urls/")

});
app.post("/urls/:id/delete", (req,res) =>{
  delete urlDatabase[req.params.id]
  console.log(req.params.id)
  res.redirect('/urls')
});
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
app.post("/urls", (req, res) => {
  var num = addToDatabase(req.body.longURL)
  res.redirect('/urls/' + num);
});
app.get("/u/:id", (req, res) => {
  let url = urlDatabase[req.params.id]
  if (url.substring(0,7) === 'http://'){
    res.redirect(url)
  } else {
    res.redirect('http://' + url)
  }
});
app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: [req.params.id]};
  res.render("urls_show", templateVars);
});
app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase};
  res.render("urls_index", templateVars);
});
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/tim", (req,res) => {
  res.send("<html><body>Tim built this!</body></html>\n")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


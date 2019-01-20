var cookieSession = require('cookie-session')
var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['key 1'],
}))

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}



function generateRandomString() {
  var inputs = ["a","b","c","d","e","f","g","h","i","j","k","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0",""]
  result = ''
  for (i = 0; i <6; i++) {
    result += inputs[Math.floor((Math.random() * inputs.length))]
  }
  return result
}



function removeItem(object, item) {
delete object.item
}

function emailChecker(input, dataBase){
  for (var user in dataBase) {
    if (dataBase[user]["email"] === input) {
      return dataBase[user];
    }
  }
  return null;
}

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "asdf"
  }
}


var urlDatabase = {
  "b2xVn2": {"longURL": "http://www.lighthouselabs.ca",
              "id": "original item"},
  "9sm5xK": {"longURL": "http://www.google.com",
            "id": "original item"}
};



app.get("/login", (req,res) => {
  req.session.user_id
  res.render("login",res.body)
})
app.post("/register", (req,res) => {
  var check
  var user_id
  if (req.body.email && req.body.password){
    for (key in users) {
      if (users[key].email === req.body.email) {
        check = true
        user_id = key
        break
      }
    }
    if (check === true) {
        return res.send("you are already registered")
    } else {
          const password = req.body['password'];
          const hashedPassword = bcrypt.hashSync(password, 10)
          let userId = generateRandomString()
          users[userId] = {"id": userId, 'email':req.body['email'], 'password': hashedPassword}
          req.session.user_id = userId
          return res.redirect('/urls')
              }
    } else {
      res.send("please enter a valid email AND password")
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/register", (req,res) => {
  res.render("register", res.body);
});
app.post("/logout", (req,res) => {
  req.session.user_id = null
  res.redirect('/urls')
});
app.post("/login", (req,res) => {
  for (user in users) {
    if (users[user]["email"] === req.body["email"] && bcrypt.compareSync(req.body["password"], users[user]["password"])) {
     req.session.user_id
     res.redirect('/urls')
    }
  }
  res.redirect('/register')
});
app.post("/urls/:id", (req,res) =>{
  urlDatabase[req.params.id] = req.body.longURL
res.redirect("/urls")

});
app.post("/urls/:id/delete", (req,res) =>{
  delete urlDatabase[req.params.id]
  res.redirect('/urls')
});
app.get("/urls/new", (req, res) => {
  if (req.session.user_id in users) {
   templateVars = {user: users[req.session.user_id], longURL: "blank"}
   return res.render("urls_new", templateVars);
  } else {
  res.redirect("/register")
}
});
app.post("/urls", (req, res) => {
  console.log(users)
  var i = generateRandomString()
  urlDatabase[i] = {longURL: req.body.longURL, id: req.session.user_id}
  res.redirect('/urls/' + i);
});
app.get("/u/:id", (req, res) => {
  let url = urlDatabase[req.params.id]['longURL']
  if (url.substring(0,7) === 'http://'){
    res.redirect(url)
  } else {
    res.redirect('http://' + url)
  }
});
app.post("/update", (req, res) => {
  console.log(req.params.body, "<-body:sess id->", req.session.user_id)
req.session.user_id
res.send("hello")
});
app.get("/urls/:id", (req, res) => {
  console.log("this is the req params", urlDatabase[req.params.id]["id"])
  console.log("this is sess id", req.session.user_id)
  console.log(urlDatabase)
  req.session.user_id
  if (req.session.user_id === urlDatabase[req.params.id]["id"]) {
    let templateVars = { shortURL: [req.params.id], longURL: urlDatabase[req.params.id]["longURL"], user: users[req.session.user_id]};
    return res.render("urls_show", templateVars, );
  } else {
    res.render("not_your_url")
  }
});
app.get("/urls", (req, res) => {
  console.log(req.body, "this is from urls", req.session.user_id, "session Id")
  let userId = req.session.user_id
  if (!userId) {
    return res.render("login");
  } else {
    let templateVars = { urls: urlDatabase, user: users[userId]}
    req.session.user_id
    res.render("urls_index", templateVars);
  }
});
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
app.get("/tim", (req,res) => {
  res.send("<html><body>Tim built this!</body></html>\n")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

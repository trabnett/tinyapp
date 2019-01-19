var cookieParser = require('cookie-parser')
var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

function getById (id) {
  var i = "id"
  return urlDatabase[id]
}

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

// function addToDatabase(longUrl,cookies) {
//   var i = generateRandomString()
//   urlDatabasecookies["id"][i] = longUrl
//   return i
// }

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
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};



app.get("/login", (req,res) => {
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
        res.cookie("id", users[user_id])
        return res.redirect("/urls")
    } else {
          let tag = generateRandomString()
          users[tag] = req.body
          users[tag]['id'] = tag
          res.cookie("id",users[tag])
          return res.redirect('/urls')
              }
    } else {
      res.send("error: 404")
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/register", (req,res) => {
  res.render("register", res.body);
});
app.post("/logout", (req,res) => {
  res.clearCookie("id",req.body["id"])
  res.redirect('/urls')
});
app.post("/login", (req,res) => {
  for (user in users) {
    if (users[user]["email"] === req.body["email"] && users[user]["password"] === req.body["password"]) {
     res.cookie("id", users[user])
     res.redirect('/')
    }
  }
  res.render('error404')
});
app.post("/urls/:id", (req,res) =>{
  urlDatabase[req.params.id] = req.body.longURL
res.redirect("/urls/")

});
app.post("/urls/:id/delete", (req,res) =>{
  delete urlDatabase[req.params.id]
  res.redirect('/urls')
});
app.get("/urls/new", (req, res) => {
  if (isEmpty(req.cookies) === false) {
   templateVars = {"id": req.cookies["id"], longURL: "blank"}
   return res.render("urls_new", templateVars);
  } else {
  res.redirect("/register")
}
});
app.post("/urls", (req, res) => {
  console.log("cookies when posting", req.cookies["id"]["id"])
  var i = generateRandomString()
  var j = req.cookies["id"]["id"]
  console.log(i, j)
  var j = req.cookies["id"]["id"]
  urlDatabase[i] = {longURL: req.body.longURL, id: j}
  console.log("user database at /urls", urlDatabase)
  res.redirect('/urls/' + i);
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
  console.log("urlDatabase", urlDatabase)
  let templateVars = { shortURL: [req.params.id], longURL: urlDatabase[req.params.id]["longURL"], "id": req.cookies["id"]};
  res.render("urls_show", templateVars, );
});
app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase, "id": req.cookies["id"]};
  res.render("urls_index", templateVars);
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

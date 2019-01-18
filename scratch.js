
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
function checkIfEqual (value1, value2) {
  console.log("check-----------------")
  if (value1 === value2){
  return true
  } else {
    return false
    }
}
var id
const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
}
var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
  "9r3204": "http://www.espn.com"
};

app.get("/login", (req,res) => {
  res.render("login")
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
        console.log("this is user ID:", users[key])
        res.cookie("id", user_id)
        return res.redirect("/urls")
    } else {
          let tag = generateRandomString()
          users[tag] = req.body
          users[tag]['id'] = tag
          console.log(users[tag])
          console.log("this is tag:", tag)
          res.cookie("id",tag)
          return res.redirect('/urls')
              }
    } else {
      res.render("error404")
  }
});



app.get("/register", (req,res) => {
  res.render("register", res.body);
});
app.post("/logout", (req,res) => {
  res.clearCookie("id",req.body[id])
  res.redirect('/urls')
});
app.post("/login", (req,res) => {
  console.log("HEY",res)
  var check
  var user_id
  if (req.body.email && req.body.password) {
    for (key in users) {
      if (users[key].email === req.body.email) {
        console.log(users[key])
        check = true
        user_id = key
        break
      }
    }
    if (check === true) {
      console.log("this is user ID:", users[key])
        for (key in users) {
        if (users[key].password === req.body.password) {
            check = true
            user_id = key
            break
        }
      }
      if (check === true) {
          console.log("this is user ID:", users[key])
          res.cookie("id", user_id)
          return console.log("it's a match")
          res.redirect("/urls")
      } else {
        console.log("what!")
        return res.redirect('/urls/register')
        }
        } else {
        // res.render("error404")
        }
  }
  res.cookie(username,req.body)
  // res.redirect('/urls/login')
console.log("the fuck")
});
app.post("/urls/:id", (req,res) =>{
urlDatabase[req.params.id] = req.body.longURL
res.redirect("/urls/new")

});
app.post("/urls/:id/delete", (req,res) =>{
  delete urlDatabase[req.params.id]
  console.log(req.params.id)
  res.redirect('/urls')
});
app.get("/urls/new", (req, res) => {
  let templateVars = {users: "id"}
  res.render("urls_new", templateVars);
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
  let templateVars = { users: "id"};
  res.render("urls_show", templateVars, );
});
app.get("/urls", (req, res) => {
  console.log(users)
  let templateVars = { users: "id", urls: urlDatabase}
  res.render("urls_index", templateVars);
});
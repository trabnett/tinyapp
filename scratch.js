const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "timrabnett@hotmail.com",
    password: "dishwasher-funk"
  }
}
var car = 1
var body = {
}

let email
body.email = "timrabnett@hotmail.com"
console.log("body.email", body.email)

function alter (obj, value) {
  a = obj.value
  return a
}


console.log("alter", alter(body,email))


function checkIfEqual (value1, value2) {
  if (value1 === value2){
  console.log("check-----------------")
  return true
} else {
  return false
}
}

  console.log(checkIfEqual("hello","hello"))
// console.log(body.email)
// console.log(checkIfEqual(users, body, email))
    // { let tag = generateRandomString()
    //   req.body.id = tag
    //   users[tag] = req.body
    //   // res.cookie("username",tag)
    //   console.log("match", users, tag)



    //  console.log("new user", users)

    //   return res.redirect('/urls/register')


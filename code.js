function emailChecker(input, dataBase){
  var a
  for (var user in dataBase) {
    console.log("this is user.email", dataBase[user]["email"])
    console.log("this is input", input)
    if (dataBase[user]["email"] === input) {
      return dataBase[user]

    } else {
      return undefined
    }
  }
}


var data = {
  "id": {
    id: "asdfasdf",
    email: "iasdf@lksdfg.com",
    name: "tim"
    },
  "id": {
    id: "affsdfafdfsdf",
    email: "i00f@lksdfg.com",
    name: "bill"
    },
  "id": {
    id: "898sdfasdf",
    email: "0df@lksdfg.com",
     name: "jeff"
    }
}

console.log(emailChecker("iasdf@lksdfg.com", data))
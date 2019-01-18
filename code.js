function emailChecker(input, dataBase){
  for (var user in dataBase) {
    if (dataBase[user]["email"] === input) {
      return dataBase[user];
    }
  }
  return null;
}







var data = {
  "idf": {
    id: "asdfasdf",
    email: "iasdf@lksdfg.com",
    name: "tim"
    },
  "ids": {
    id: "affsdfafdfsdf",
    email: "i00f@lksdfg.com",
    name: "bill"
    },
  "ido": {
    id: "898sdfasdf",
    email: "0df@lksdfg.com",
     name: "jeff"
    }
}

console.log(emailChecker("iasdf@lksdfg.com", data))



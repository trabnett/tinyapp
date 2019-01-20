function urlsForId(id, data) {
    a = {}
  for (entry in data) {
    if (data[entry]["id"] === id) {
      a[entry] = data[entry]
    }
  }
return a
}



var urlDatabase = {
  "b2xVn2": {"longURL": "http://www.lighthouselabs.ca",
              "id": "original item"},
  "9sm5xK": {"longURL": "http://www.google.com",
            "id": "original item"},
  "b2xVsf": {"longURL": "http://www.fff.ca",
              "id": "original item"},
  "9ssaxK": {"longURL": "http://www.tocya.com",
            "id": "tim"},
  "b2ffs2": {"longURL": "http://www.fun.ca",
              "id": "original item"},
  "9sm5rr": {"longURL": "http://www.hell.com",
            "id": "tim"},
  "b2xvvv": {"longURL": "http://www.lighth.ca",
              "id": "original item"},
  "9ssses": {"longURL": "http://www.smith.com",
            "id": "tim"}
};
console.log(urlsForId("tim", urlDatabase))
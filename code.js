let a = {a: "asdfasdf"}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

console.log(isEmpty(a))
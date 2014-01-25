'use strict';

var tokenChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

exports.randomString = function (tokenLength) {
    var result = '';
    for (var i = tokenLength; i > 0; --i) {
        result += tokenChars[Math.round(Math.random() * (tokenChars.length - 1))];
    }
    return result;
}

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getRandomInt = getRandomInt;

// Pick n different random integers
exports.getNRandomInt = function (min,max,n) {
    var arr = []
    while(arr.length < n){
        var randomnumber = getRandomInt(min,max);
        var found=false;
        for( var i=0 ; i<arr.length; i++){
            if(arr[i] == randomnumber){
                found=true;
                break
            }
        }

        if(!found) {
            arr[arr.length]=randomnumber;
        }
    }

    return arr;
}

exports.shuffleArray = function (o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
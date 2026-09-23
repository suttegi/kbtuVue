var createCounter = function(n) {
    let num = n;
    return function() {
        return num++;
    };
};

var expect = function(val) {
    return {
        toBe: function(n) {
            if (val !== n) throw new Error("Not Equal");
            return true;
        },
        notToBe: function(n) {
            if (val === n) throw new Error("Equal");
            return true;
        }
    }
};

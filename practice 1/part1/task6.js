var join = function(arr1, arr2) {
    const map = new Map;
    for (const item of [...arr1, ...arr2]) {
        map.set(item.id, {
            ...map.get(item.id),
            ...item
        });
    }
    return [...map.values()];
};

function arrayToTree(items, parentId = null) {
    return items
        .filter(item => item.parentId === parentId)
        .map(item => ({ ...item, children: arrayToTree(items, item.id) }));
}

const items = [
    { id: 1, parentId: null, name: "节点1" },
    { id: 2, parentId: 1, name: "节点1.1" },
    { id: 3, parentId: 1, name: "节点1.2" },
    { id: 4, parentId: 2, name: "节点1.1.1" },
    { id: 5, parentId: null, name: "节点2" },
    { id: 6, parentId: 5, name: "节点2.1" }
];

console.log(JSON.stringify(arrayToTree(items)))
// 实现一个方法 array2tree，接收一个节点列表（节点顺序不确定），返回转换后 tree 的根节点。需要在 O(n) 复杂度内完成
// 限制条件：根节点一定存在，且 id 为 0，子节点一定存在 parentId，且 parentId 对应的节点一定存在于输入中
// 输入：
// [
//   { id: 0, name: '中国' },
//   { id: 1000, name: '武汉', parentId: 1 },
//   { id: 1, name: '湖北', parentId: 0 },
// ]

// 输出：
// {
//   id: 0,
//   name: '中国',
//   children: [
//     {
//       id: 1,
//       name: '湖北',
//       children: [
//         {
//           id: 1000,
//           name: '武汉',
//         },
//       ],
//     },
//   ],
// }

let arr = [
    { id: 0, name: "中国" },
    { id: 1000, name: "武汉", parentId: 1 },
    { id: 1, name: "湖北", parentId: 0 },
];

function array2tree(nodes) {
    // 创建一个映射表，用于快速查找节点
    const idToNodeMap = new Map();

    // 初始化所有节点，将它们添加到映射表中
    nodes.forEach((node) => {
        // 给每个节点添加一个 children 数组，用于存储其子节点
        node.children = [];
        idToNodeMap.set(node.id, node);
    });

    // 根节点变量，用于最后返回
    let root = null;

    // 遍历节点，构建父子关系
    nodes.forEach((node) => {
        if (node.parentId === undefined) {
            // 如果没有 parentId，说明是根节点
            root = node;
        } else {
            // 找到当前节点的父节点，并将当前节点添加到父节点的 children 数组中
            const parent = idToNodeMap.get(node.parentId);
            if (parent) {
                delete node.parentId;
                parent.children.push(node);
            }
        }
    });

    return root;
}

console.log(JSON.stringify(array2tree(arr)));
console.log(arr);

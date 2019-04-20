/**
 * tree ADT
 */

// definition
class TreeNode {
  constructor({
    element = 0,
    parent = null,
    firstChild = null,
    nextSibling = null,
    size = 0
  }) {
    this.element = element;
    this.parent = parent;
    this.firstChild = firstChild;
    this.nextSibling = nextSibling;

    // size用来模拟这个节点所占的磁盘空间。int
    this.size = size;
  }
}

const createNode = param => new TreeNode(param);

// 构造一个目录树

// depth = 5
const nodeSum97Syl = createNode({ element: "sum97 -> syl.r" });
const nodeSpr97Syl = createNode({ element: "spr97 -> syl.r" });
const nodeFall96Syl = createNode({ element: "fall96 -> syl.r" });

const nodeFall97Grades = createNode({ element: "nodeCop3212Fall97 -> grades" });
const nodeFall97Prog1 = createNode({
  element: "nodeCop3212Fall97 -> prog1.r",
  nextSibling: nodeFall97Grades
});
const nodeFall97Prog2 = createNode({
  element: "nodeCop3212Fall97 -> prog2.r",
  nextSibling: nodeFall97Prog1
});

const nodeFall96Prog2 = createNode({ element: "nodeCop3212Fall96 -> prog2.r" });
const nodeFall96Prog1 = createNode({
  element: "nodeCop3212Fall96 -> prog1.r",
  nextSibling: nodeFall96Prog2
});
const nodeFall96Grades = createNode({
  element: "nodeCop3212Fall96 - > grades.r",
  nextSibling: nodeFall96Prog1
});

// depth = 4
const nodeCop3530Sum97 = createNode({
  element: "nodeCop3530Sum97",
  firstChild: nodeSum97Syl
});
const nodeCop3530Spr97 = createNode({
  element: "nodeCop3530Spr97",
  nextSibling: nodeCop3530Sum97,
  firstChild: nodeSpr97Syl
});
const nodeCop3530Fall96 = createNode({
  element: "nodeCop3530Fall96",
  firstChild: nodeFall96Syl,
  nextSibling: nodeCop3530Spr97
});
const nodeCop3212Fall97 = createNode({
  element: "nodeFall97",
  firstChild: nodeFall97Prog2
});
const nodeCop3212Fall96 = createNode({
  element: "nodeCop3212Fall96",
  nextSibling: nodeCop3212Fall97,
  firstChild: nodeFall96Grades
});

// depth = 3
const nodeBookCh3 = createNode({ element: "nodeBookCh3" });
const nodeBookCh2 = createNode({
  element: "nodeBookCh2",
  nextSibling: nodeBookCh3
});
const nodeBookCh1 = createNode({
  element: "nodeBookCh1",
  nextSibling: nodeBookCh2
});
const nodeCop3212 = createNode({
  element: "nodeCop3212",
  firstChild: nodeCop3212Fall96
});
const nodeCop3530 = createNode({
  element: "nodeCop3530",
  firstChild: nodeCop3530Fall96
});

// depth = 2
const nodeBillCourse = createNode({
  element: "nodeBillCourse",
  firstChild: nodeCop3212
});
const nodeBillWork = createNode({
  element: "nodeBillWork",
  nextSibling: nodeBillCourse
});
const nodeAlexJunk = createNode({ element: "nodeAlexJunk" });
const nodeMarkJunk = createNode({ element: "nodeMarkJunk" });
const nodeMarkCourse = createNode({
  element: "nodeMarkCourse",
  firstChild: nodeCop3530,
  nextSibling: nodeMarkJunk
});
const nodeMarkBook = createNode({
  element: "nodeMarkBook",
  firstChild: nodeBookCh1,
  nextSibling: nodeMarkCourse
});

//depth = 1
const nodeBill = createNode({ element: "bill", firstChild: nodeBillWork });
const nodeAlex = createNode({
  element: "alex",
  nextSibling: nodeBill,
  firstChild: nodeAlexJunk
});
const nodeMark = createNode({
  element: "mark",
  nextSibling: nodeAlex,
  firstChild: nodeMarkBook
});

// depth = 0
const root = createNode({ element: "root", firstChild: nodeMark });

// console.log(root);

/*
 * 以下是帮助函数
 */
const printName = (node, depth, tabSign = "----") => {
  const tab = Array(depth)
    .fill(tabSign)
    .join("");
  const element = node.element;
  console.log(`${tab}${isDir(node) ? "/" + element : element}`);
};

const isDir = node => node.firstChild !== null;

/**
 * 树的先序遍历-对节点的处理是在所有子节点之前
 */

const preListDir = (tree, depth = 0) => {
  printName(tree, depth);
  if (isDir(tree)) {
    let child = tree.firstChild;
    while (child) {
      preListDir(child, depth + 1);
      child = child.nextSibling;
    }
  }
};
console.log("先序遍历如下：");
preListDir(root);
console.log("");
/**
 * 树的后序遍历 - 对节点的处理是在所有子节点之后
 * @param tree
 * @param depth
 */
const postListDir = (tree, depth = 0) => {
  if (isDir(tree)) {
    let child = tree.firstChild;
    while (child) {
      postListDir(child, depth + 1);
      child = child.nextSibling;
    }
  }
  printName(tree, depth);
};
console.log("后序遍历如下：");
postListDir(root);

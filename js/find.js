let tree =
  '[{"children":[{"children":[{"children":[{"iconCls":"icon-manage","id":"24","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgOrganization/manager","text":"部门要素管理"},{"iconCls":"icon-manage","id":"11279444","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgOrganization/manager2","text":"部门要素修改"},{"iconCls":"icon-user","id":"25","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgUser/manager","text":"人员要素管理"},{"iconCls":"icon-position","id":"26","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgPosition/manager","text":"角色要素管理"},{"iconCls":"tree-leaf","id":"112893339","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgPlace/orgPlaceManager","text":"保管中心管理"}],"iconCls":"tree-org","id":"11","menumodeltype":"0","nodeType":"menu1","openType":"","openURL":"","state":"closed","text":"组织机构要素管理"},{"children":[{"iconCls":"tree-leaf","id":"11250974","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgManager/orgManager","text":"组织机构分配"},{"iconCls":"tree-leaf","id":"11250975","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgRoleAssign/manager","text":"角色权限分配"},{"iconCls":"tree-leaf","id":"11250976","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgManagerRight/manager","text":"管理角色权限分配"},{"iconCls":"tree-leaf","id":"33","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgUserRealRight/manager","text":"查看人员实际权限"},{"iconCls":"tree-leaf","id":"112908342","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/editUserApproval/manager","text":"人员审批"}],"iconCls":"tree-org","id":"13","menumodeltype":"0","nodeType":"menu1","openType":"","openURL":"","state":"closed","text":"组织机构权限管理"},{"children":[{"iconCls":"tree-leaf","id":"112908189","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgNorm/manage","text":"标准组织机构管理"},{"iconCls":"tree-leaf","id":"112908190","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgNormUser/personnel","text":"标准组织机构分配"},{"iconCls":"tree-leaf","id":"112908191","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgChange/examine","text":"标准组织机构变更审批"},{"iconCls":"tree-leaf","id":"112908192","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgChange/history","text":"标准组织机构变更历史"},{"iconCls":"tree-leaf","id":"112908193","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgAdmin/manage","text":"标准组织机构管理员"}],"iconCls":"tree-org","id":"112908188","menumodeltype":"0","nodeType":"menu1","openType":"","openURL":"","state":"closed","text":"标准组织机构"}],"iconCls":"tree-org","id":"8","menumodeltype":"0","nodeType":"menu1","openType":"","openURL":"","state":"closed","text":"组织机构管理"}],"iconCls":"icon-favorite","id":"4","nodeType":"system","state":"closed","text":"基础框架系统"}]'
tree = JSON.parse(tree)
let res = []
function findFatherId(id, data) {
  for (let item of data) {
    if (item.children) {
      res.push(item.id)
      findFatherId(id, item.children)
    } else {
      if ((item.id = id)) {
      }
    }
  }
}

//根据id,找到父id
//expect [112908188, 13, 8, 4]
let ids = ['112908189', '11250974']

const find = (value, data) => {
  let result = []
  let findArr = data
  let skey = ''
  for (let i = 0, l = value.length; i < l; i++) {
    skey += value[i]
    let item = findArr.find(item => {
      return item.id == skey
    })

    if (!item) {
      return []
    }

    result.push(item.id)
    if (item.children) {
      findArr = item.children
    } else {
      if (i < l - 1) return []
      return result
    }
  }
}
//work
const fn = (data, value) => {
  let res = []
  const dfs = (arr, temp = []) => {
    for (const node of arr) {
      if (node.children) {
        dfs(node.children, temp.concat(node.id))
      } else {
        if (node.id === value) {
          res = temp
        }
        return
      }
    }
  }
  dfs(data)
  return res
}
for (let item of ids) {
  let result = fn(tree, item)
  res.push(...result)
}
res = [...new Set(res)]
console.log(res)

//third
function fn(value) {
  // 回溯的标记
  let _p = Symbol('parent');
  // 找到子节点
  let result;
  function _fn(arr, p) {
      for (let i = 0; i < arr.length; i++) {
          arr[i][_p] = p;
          if (arr[i].id === value) {
              result = arr[i];
              return;
          }
          !result && arr[i].children && _fn(arr[i].children, arr[i])
      }
      if (result) return;
  }
  _fn(list, null);
  let tmp = [];
  if (!result) return null;
  while (result) {
      tmp.unshift(result.id);
      result = result[_p];
  }
  return tmp;
}
//four
const findItem = (value, list, graph) => {
  return list.some(item => {
      if (item.id === value) {
          graph.push(item.id)
          return true
      }
      if (item.children) {
          graph.push(item.id)
          return findItem(value, item.children, graph)
      }
  })
}

const fn = value => {
  let graph = []
  list.some(item => {
      graph.push(item.id)
      if (item.id === value) return true
      if (item.children) {
          let res = findItem(value, item.children, graph)
          if (!res) graph = []
          return res
      }
  })
  return graph
}
//five
const fn = (value) => {
  let graph = []
  const mapData = new Map();
  function ParentMap(data, parentId) {
      parentId = parentId || 0;
      data.forEach(item => {
          mapData[item.id] = { ...item, parentId }
          if (item.children) {
              ParentMap(item.children, item.id);
          }
      })
  }
  ParentMap(data)
  function getId(data, value) {
      graph.unshift(data[value].id)
      if (data[value].parentId !== 0) {
          getId(data, data[value].parentId)
      }
  }
  getId(mapData, value)
  return graph;
}
//six
const fn = (value) => {
  let err = 'return start'
  let interim = JSON.parse(JSON.stringify(data))
  let result = []
  try {
      while (interim.length > 0) {
          let point = interim.pop() 
          let child = point.children
          let queue = child
          let cresult = []
          result.push(point.id)
          while (queue && queue.length > 0) {
              let cpoint = queue.pop()
              cresult.push(cpoint.id)
              if (!cpoint.children || cpoint.id == value) {
                  if (cresult.indexOf(value) > -1) {
                      queue.length = 0
                  } else {
                      cresult = []
                  }
                  continue
              }
              queue.push(...cpoint.children)
          }
          if (result.concat(cresult).indexOf(value) > -1) {
              result = result.concat(cresult)
              throw new Error(err)
          } else {
              result = []
          }
      }
  } catch (e) {
      if (e.message === err) {
          console.log(result.map(v => parseInt(v)))
          return result.map(v => parseInt(v))
      } else {
          throw e
      }
  }
}
//seven
function dfsFn(list, value) {
  let res = []

  function dfs(arr, ids=[]) {
    for (const item of arr) {
      if (item.id === value) {
        res = [...ids, ...[item.id]]
        return
      } else {
        if (item.children) {
          dfs(item.children, ids.concat([item.id]))
        }
      }
    }
  }

  dfs(list)

  return res
}
//eight

const findId = (list, value) => {
  let len = list.length;

  for (let i in list) {
    const item = list[i];

    if (item.id == value) {
      return res.push(item.id), [item.id];
    }

    if (item.children) {
      if (findId(item.children, value).length) {
        res.unshift(item.id);
        return res;
      }
    }

    if (i == len - 1) {
      return res;
    }
  }
};

//nine
function getIdChain(data, id, idkey = "id", childrenKey = "children") {
  if (check(data, id)) {
    return [];
  }

  loop.chain = [];
  loop(data, id);
  return loop.chain;

  function check(data, id) {
    return !Array.isArray(data) || !data.length || (!id && id !== 0);
  }

  function loop(arr, v) {
    if (check(arr, v)) {
      return false;
    }
    return arr.some(i => {
      return i[idkey] === v || (i[childrenKey] && loop(i[childrenKey], v))
        ? (loop.chain.unshift(i[idkey]), true)
        : false;
    });
  }
}
//ten
const bfs = data => {
  const queue = [...data]
  let res = []
  while(queue.length) {
    let node = queue.shift()
    if (node.children) {
      for (let child of node.children) {
        queue.push(child)
      }
      res.push(node.id)
    }
  }
  return res
}
//11

function findAllParentId(tree, id) {
  const stack = [tree];
  while(stack.length > 0) {
    const top = stack.slice().pop();
    if (top.id === id) break;
    if (top.children && top.children.length>0) {
      const cTop = top.children.pop();
      stack.push(cTop);
    } else {
      stack.pop();
    }
  }
  return stack.map(n => n.id);
}
//12
function fn(data, value) {
  let res = []
  const dfs = (arr, temp = []) => {
    for (const node of arr) {
      if (node.id === value) {
        res = temp
        return
      } else {
        node.children && dfs(node.children, temp.concat(node.id))
      }
    }
  }
  dfs(data)
  return res
}
//13
const findId = (data, tarId, parentId = []) =>
data.reduce((acc, item) =>
  acc.concat(item.id == tarId
    ? [...parentId, item.id]
    : item.children
      ? findId(item.children, tarId, [...parentId, item.id])
      : [])
  , [])
  //14
  function dfs (tree) {
    const stack = [...tree].reverse();

    while (stack.length) {
      const parent = stack.pop();
      const children = parent.children;
      // console.log(parent);

      if (children) {
        for (let i = children.length - 1; i > -1; i--) {
          const child = children[i];
          stack.push(child);
        }
      }
    }
  }

  function bfs (tree) {
    const queue = [...tree];

    while (queue.length) {
      const parent = queue.shift();
      const children = parent.children;
      // console.log(parent);

      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          queue.push(child);
        }
      }
    }
  }
// 想到的第一种方式，加入一个hash

  function findByDfs (tree, id) {
    const stack = [...tree].reverse();
    const map = new WeakMap();

    while (stack.length) {
      const parent = stack.pop();
      const children = parent.children;

      if (parent.id === id) {
        return map.get(parent) || [parent.id];
      }

      if (children) {
        for (let i = children.length - 1; i > -1; i--) {
          const child = children[i]
          stack.push(child);
          // 波澜在在这里
          if (!map.get(parent)) {
            map.set(parent, [parent.id])
          }
          map.set(child, [...map.get(parent), child.id])
        }
      }
    }
  }

  function findByBfs (tree, id) {
    const queue = [...tree];
    const map = new WeakMap();

    while (queue.length) {
      const parent = queue.shift();
      const children = parent.children;

      if (parent.id === id) {
        return map.get(parent) || [parent.id];
      }

      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          queue.push(child);
          // 波澜在这里
          if (!map.get(parent)) {
            map.set(parent, [parent.id])
          }
          map.set(child, [...map.get(parent), child.id]);
        }
      }
    }
  }
// dfs还想到一种方式，就是在操作的模拟栈中放入一点小波澜即可！！！

  function findByDfs (tree, id) {
    const stack = [...tree].reverse();
    let result = [];

    while (stack.length) {
      const parent = stack.pop();

      if (parent === -1) {
        result.pop();
      } else {
        if (parent.id === id) {
          return result.concat(id);
        }
        const children = parent.children;

        if (children) {
          result.push(parent.id);
          // 我是小波澜！
          stack.push(-1);
          for (let i = children.length - 1; i > -1; i--) {
            stack.push(children[i])
          }
        }
      }
    }
  }
  /**
   * bfs利用队列实现，循环中做的是push => shift => push => shift
     dfs利用栈实现，循环中做的是push => pop => push => pop
   */
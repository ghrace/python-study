let tree='[{"children":[{"children":[{"children":[{"iconCls":"icon-manage","id":"24","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgOrganization/manager","text":"部门要素管理"},{"iconCls":"icon-manage","id":"11279444","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgOrganization/manager2","text":"部门要素修改"},{"iconCls":"icon-user","id":"25","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgUser/manager","text":"人员要素管理"},{"iconCls":"icon-position","id":"26","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgPosition/manager","text":"角色要素管理"},{"iconCls":"tree-leaf","id":"112893339","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgPlace/orgPlaceManager","text":"保管中心管理"}],"iconCls":"tree-org","id":"11","menumodeltype":"0","nodeType":"menu1","openType":"","openURL":"","state":"closed","text":"组织机构要素管理"},{"children":[{"iconCls":"tree-leaf","id":"11250974","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgManager/orgManager","text":"组织机构分配"},{"iconCls":"tree-leaf","id":"11250975","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgRoleAssign/manager","text":"角色权限分配"},{"iconCls":"tree-leaf","id":"11250976","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgManagerRight/manager","text":"管理角色权限分配"},{"iconCls":"tree-leaf","id":"33","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgUserRealRight/manager","text":"查看人员实际权限"},{"iconCls":"tree-leaf","id":"112908342","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/editUserApproval/manager","text":"人员审批"}],"iconCls":"tree-org","id":"13","menumodeltype":"0","nodeType":"menu1","openType":"","openURL":"","state":"closed","text":"组织机构权限管理"},{"children":[{"iconCls":"tree-leaf","id":"112908189","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgNorm/manage","text":"标准组织机构管理"},{"iconCls":"tree-leaf","id":"112908190","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgNormUser/personnel","text":"标准组织机构分配"},{"iconCls":"tree-leaf","id":"112908191","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgChange/examine","text":"标准组织机构变更审批"},{"iconCls":"tree-leaf","id":"112908192","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgChange/history","text":"标准组织机构变更历史"},{"iconCls":"tree-leaf","id":"112908193","menumodeltype":"0","nodeType":"menu2","openType":"1","openURL":"http://manage.jwzh.online:9017/jwzh-manage/orgAdmin/manage","text":"标准组织机构管理员"}],"iconCls":"tree-org","id":"112908188","menumodeltype":"0","nodeType":"menu1","openType":"","openURL":"","state":"closed","text":"标准组织机构"}],"iconCls":"tree-org","id":"8","menumodeltype":"0","nodeType":"menu1","openType":"","openURL":"","state":"closed","text":"组织机构管理"}],"iconCls":"icon-favorite","id":"4","nodeType":"system","state":"closed","text":"基础框架系统"}]'
tree=JSON.parse(tree)
let res=[]
function findFatherId(id,data){
    for(let item of data){
        if(item.children){
            res.push(item.id)
            findFatherId(id,item.children)
        }else{
            if(item.id=id){
                
            }
        }
    }
}
function dfs(root,targetID,ancestors= []) {
    if(root===null) return 
    if (root.id === targetID){
        res.push(Array.from(ancestors))
        return
    } 
    ancestors.push(root.id)
    for (let child of root.children) {
        dfs(child,targetID,ancestors)
    }
    ancestors.pop()
}
//expect [112908188, 13, 8, 4]
let ids=["112908189","11250974"]
for (let item of ids){
    dfs(tree,item)
}
res=[...new Set(res)]
console.log(res)
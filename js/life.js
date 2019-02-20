const _ = require('lodash')
// 人类对象
const human = {
    preTotalNum: 0,
    totalNum: 0,
    birthrate: 0,
    deathrate: 0,
    rich: {
        level: 1,
        wealth: 1,
        num: 10,
        sex: null,
        married: false
    },
    middle: {
        level: 0,
        wealth: 0,
        num: 100,
        sex: null,
        married: false
    },
    poor: {
        level: -1,
        wealth: -1,
        num: 1000,
        sex: null,
        married: false
    }
}

// 初始化
function init() {
    // 人类对象数组
    let humanArr = []
    // 富人数组
    for (let i = 0; i < human.rich.num; i++) {
        let rich = {
            ...human.rich
        }
        if (i < human.rich.num / 2) {
            rich.sex = 0 // 男性
        } else {
            rich.sex = 1 // 女性
        }
        humanArr.push(rich)
    }
    // 中人数组
    for (let i = 0; i < human.middle.num; i++) {
        let middle = {
            ...human.middle
        }
        if (i < human.middle.num / 2) {
            middle.sex = 0
        } else {
            middle.sex = 1
        }
        humanArr.push(middle)
    }
    // 穷人数组
    for (let i = 0; i < human.poor.num; i++) {
        let poor = {
            ...human.poor
        }
        if (i < human.poor.num / 2) {
            poor.sex = 0
        } else {
            poor.sex = 1
        }
        humanArr.push(poor)
    }
    return humanArr
}

// 生命代数迭代，一次递归一代人
function calc(humanArr) {
    // 新生代人数组
    humanNewArr = []
    // 遍历全人类
    for (let i = 0; i < humanArr.length; i++) {
        let people = humanArr[i] // 当前人
        // 已婚育，忽略
        if (people.married) {
            continue
        }
        // 根据阶层计算恋爱次数，阶层越高越多
        let contactNum = 10 * (Math.pow(3 + people.level, 2))
        for (let j = 0; j < contactNum; j++) {
            // 新恋人
            let lover = humanArr[Math.floor(Math.random() * humanArr.length)]
            // 恋人已婚或两人不是异性，忽略
            if (lover.married || people.sex == lover.sex) {
                // j--
                continue
            }
            // 1/两人阶层差距的平方 * 爱情概率，结合并产生后代
            if (1 / Math.pow((Math.abs(people.level - lover.level) + 1), 1) * 0.5 >= Math.random()) {
                // 两人结合
                people.married = true
                lover.married = true
                // 产生后代数量0-5
                let childNum = 0
                let randomNum = _.random(100)
                if (_.inRange(randomNum, 0, 10)) {
                    childNum = 0
                } else if (_.inRange(randomNum, 11, 25)) {
                    childNum = 1
                } else if (_.inRange(randomNum, 26, 80)) {
                    childNum = 2
                } else if (_.inRange(randomNum, 81, 90)) {
                    childNum = 3
                } else if (_.inRange(randomNum, 91, 99)) {
                    childNum = 4
                } else {
                    childNum = 5
                }
                for (let k = 0; k < childNum; k++) {
                    // 每一代财富根据GDP增长
                    let gdp = 0.2
                    let wealth = parseFloat(((people.wealth + lover.wealth) * (1 + gdp) / childNum).toFixed(2))
                    let sex = Math.round(Math.random())
                    // 新生代
                    humanNewArr.push({
                        wealth,
                        sex
                    })
                }
                break
            }
        }
    }
    return humanNewArr
}

/**
 * @param {*} humanArr 
 * 财富值前1%的人设定为rich
 * 财富值1%——10%的人设定为middle
 * 财富值10%——100%的人设定为poor
 */
function reLevel(humanArr) {
    humanArr = _.orderBy(humanArr, ['wealth'], ['desc'])
    for (let i = 0; i < humanArr.length; i++) {
        if (i <= humanArr.length * 0.01) {
            humanArr[i].level = 1
        } else if (i <= humanArr.length * 0.1) {
            humanArr[i].level = 0
        } else {
            humanArr[i].level = -1
        }
    }
    return humanArr
}

function stat(humanArr) {
    let maleNum = 0
    let femaleNum = 0
    for (let i = 0; i < humanArr.length; i++) {
        if (humanArr[i].sex == 0) {
            maleNum++
        } else {
            femaleNum++
        }
    }
    let maxHuman = _.maxBy(humanArr, function (item) {
        return item.wealth
    })
    let minHuman = _.minBy(humanArr, function (item) {
        return item.wealth
    })
    console.log(`人口:${humanArr.length}`)
    console.log(`男性:${maleNum}`)
    console.log(`女性:${femaleNum}`)
    console.log(`财富差距:${Math.abs(maxHuman.wealth - minHuman.wealth).toFixed(2)}`)

    // let countMap = _.countBy(humanArr, 'level')
    // let countMapKeys = Object.keys(countMap)
    // let minLevel = _.min(countMapKeys)
    // let maxLevel = _.max(countMapKeys)
    // console.log(`人口:${humanArr.length}`)
    // console.log(`男性:${maleNum}`)
    // console.log(`女性:${femaleNum}`)
    // console.log(`阶层数量:${countMapKeys.length}`)
    // console.log(`财富差距:${Math.abs(maxLevel - minLevel)}`)
}

function main() {
    console.log('人类文明开始')
    let genNum = 1 //文明代数
    // 诞生人类数组
    let humanArr = init()
    // 人类文明迭代
    while (humanArr.length > 0) {
        console.log(`${genNum}代文明结束,以下是该代文明数据`)
        // 新一代文明
        stat(humanArr)
        humanArr = calc(humanArr)
        humanArr = reLevel(humanArr)
        genNum++
    }
    console.log(`文明总代数:${genNum}`)
    console.log('人类文明结束')
}

main()
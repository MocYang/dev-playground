/**
 * @Author: yangqixin
 * @TIME: 2021/12/10 14:16
 * @FILE: fetchCitiesAndParse.js
 * @Email: 958292256@qq.com
 * @Description:
 */
const dataSource = '../asserts/js/cities.json'

function flatten(source, level = 2) {
  let ret = {}
  let currentLevel = 0
  function extract(node, target) {
    target['name'] = node.name
    target['value'] = node.value

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (currentLevel > level) {
          continue
        }

        if (!target.children) {
          target.children = []
        }

        let child = node.children[i]
        let newChild = {}
        target.children.push(newChild)

        currentLevel++
        extract(child, newChild)
        currentLevel--
      }

    }
  }

  extract(source, ret)
  return ret
}

async function fetchCitiesData(rect = [300, 300], cb) {
  let [width, height] = rect
  const source = await fetch(dataSource)
  let data = await source.json()

  data = flatten(data, 1)

  const regions = d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value)

  const pack = d3.pack()
    .size([width, height])
    .padding(5)
  const root = pack(regions)

  cb && cb(root)
}

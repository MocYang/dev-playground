import {
  copyToClipboard,
  createEventBus,
  detectDeviceType,
  observeMutations,
  scrollToTop,
  scrollIntoView
} from '../browser'

const query = (selector) => document.querySelector(selector)

const copyBtn = query('#copy-btn')
copyBtn.onclick = function (e) {
  let str = 'abcd'
  copyToClipboard(str)
}

const handler = msg => console.log(msg)
const bus = createEventBus()

bus.on('message', handler)
bus.on('message', () => console.log('message event fired.'))

bus.emit('message', 'abcd')
bus.emit('message', 'dcba')

console.log(detectDeviceType())


const mutationBtn = query('#mutation-btn')
let id = 0
mutationBtn.onclick = function () {
  mutationBtn.setAttribute('data-set', id++)
}

const obs = observeMutations(mutationBtn, function (m) {
  const mutationP = query('#mutation')
  const valueKey = m.attributeName.split('-')[1]
  mutationP.innerHTML = `mutation type: ${m.type}, ${m.attributeName}=${m.target.dataset[valueKey]}`
  console.log(m)
})

const stopMutationBtn = query('#stop-mutation')
stopMutationBtn.onclick = function () {
  obs.disconnect()
}

const scrollTopBtn = query('#scroll-top')
scrollTopBtn.onclick = function () {
  scrollToTop()
}

const scrollIntoViewBtn = query('#scroll-into-view')
scrollIntoViewBtn.onclick= function () {
  scrollIntoView(query('#scroll-into-view-text'))
}

import {
  Map,
  OrderedMap,
  Set,
  OrderedSet,
  Stack,
  Range,
  Repeat,
  Seq,
  fromJS,
  is,
} from 'immutable'

const deepRawObject = {
  a: 1,
  b: {
    b1: 2,
    b2: {
      b21: [1, 2, 3]
    }
  }
}

const map1 = Map({a: 1, b: 3, c: 3})
const map2 = map1.set('b', 4)
console.log(map1)
console.log(map2)

const set1 = Set([1, 2, 3])
console.log(set1)

const stack1 = Stack([1, 2, 3])
const newStack1 = stack1.shift()
console.log(stack1)
console.log(newStack1)

const range1 = Range(1, 100, 2)
console.log(range1)

const repeat2 = Repeat(2, 5)
console.log(repeat2)

const seq1 = Seq([1, 2, 3, 4, 5, 6, 7, 8])
const newSeq1 = seq1.filter(n => n % 2 === 1).map(n => n ** 2)
console.log(newSeq1.toJS())

const deepObject = fromJS(deepRawObject)
console.log(deepObject.toJS())

const isMap1 = Set([1, 3, 4])
const isMap2 = Set([1, 4, 3])
console.log(is(isMap1, isMap2))

console.log(map1.get('b'))
console.log(deepObject.getIn(['b', 'b2', 'b21']).toJS())
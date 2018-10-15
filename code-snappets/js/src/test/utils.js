import {
 deepclone_iterate,
 deepclone_json
} from '../utility'

const source1 = {
  a1: 12,
  a2: {
    b1: 21,
    b2: {
      c1: 3,
      c2: null
    }
  }
}

const target1 = deepclone_json(source1)
console.log(target1)

const target2 = deepclone_iterate(source1)


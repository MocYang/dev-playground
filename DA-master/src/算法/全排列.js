/**
 *
 * 求给定序列的全排列
 */

 const fixedList = [1, 2, 3]

 const fullArrange = (list) => {
   const length = list.length

   for (let i = 0; i < length; i++) {
     for (let j = 0; j < length - i; j++) {
      let sequence = []
      for (let k = j; k <= (j + i); k++) {
        sequence.push(list[k])
      }
      console.log(sequence)
     }
   }
 }

 fullArrange(fixedList)


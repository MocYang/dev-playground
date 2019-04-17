// interface Person {
//   firstName: string,
//   lastName: string
// }
//
// class Student {
//   fullname: string
//
//   constructor(public firstName: string, public lastName: string) {
//     this.fullname = `${firstName} ${lastName} `
//   }
// }
//
// const greeter = (person: Person) => {
//   return 'Hello' + person
// }
//
// let user = 'Jane baba'
//
// // greeter(user)
// greeter({firstName: '123', lastName: '456'})
// greeter(new Student('bob', 'aac'))
//
//
// declare function create(o: object | null) : void
//
// interface LabelObj {
//   label: string
//   size?: number
// }
//
// function printer(labelObj: LabelObj) {
//   console.log(labelObj.label)
// }
//
// printer({label: '123'})
//
// interface SquareConfig {
//   width?: number
//   size?: string
//   [propName: string]: any
// }
//
// function createSquare(square: SquareConfig): void {
//
// }
//
// let mySquare = createSquare({colour: 'red', width: 122})


// interface SearchFunc {
//   (source: string, to: string): boolean
// }
//
// let searchFunc: SearchFunc
//
// searchFunc = (from, to) => {
//
//   return !!0
// }

// interface MumberDictionary {
//   [index: string]: number;
//   length: number;    // ok, length is a number
//   name: string;      // error, the type of 'name' is not a subtype of the indexer
// }

// interface ClockInstance {
//   tick(): void
// }
//
// interface ClockConstuctor {
//   new(hour: number, minute: number): ClockInterface
// }
//
// class Clock implements ClockConstuctor {
//   constructor(h: number, m: number) {
//
//   }
//
//   tick() {
//   }
//
// }
//
// const myClock = new Clock(12, 3)




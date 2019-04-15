let a: number[] = [1, 2, 3]

let b: Array<number> = [1, 2, 3]

let c: ReadonlyArray<number> = [1, 2, 3]

a[1] = 1

b[1] = 2

// c[1] = 2

// b = <number[]> c

console.log(a, b, c)



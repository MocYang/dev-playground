interface Person {
  firstName: string,
  lastName: string
}

class Student {
  fullname: string

  constructor(public firstName: string, public lastName: string) {
    this.fullname = `${firstName} ${lastName} `
  }
}

const greeter = (person: Person) => {
  return 'Hello' + person
}

let user = 'Jane baba'

// greeter(user)
greeter({firstName: '123', lastName: '456'})
greeter(new Student('bob', 'aac'))

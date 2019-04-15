var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullname = firstName + " " + lastName + " ";
    }
    return Student;
}());
var greeter = function (person) {
    return 'Hello' + person;
};
var user = 'Jane baba';
// greeter(user)
greeter({ firstName: '123', lastName: '456' });
greeter(new Student('bob', 'aac'));

//ex1
const a = [1, 2, 3, 4];
const b = a.map((n) => n * 2);
console.log("2n: ", b);

//ex2
const birthYear = [1994, 1997, 2003, 1993, 2001];
const ages = birthYear.map((year) => 2025 - year);
console.log("ages: ", ages);

//ex3
const people = [
  { id: 1, name: "DORJ", age: 19 },
  { id: 2, name: "BOLD", age: 13 },
  { id: 3, name: "BAT", age: 15 },
  { id: 4, name: "TURUU", age: 20 },
  { id: 15, name: "SUMBEE", age: 23 },
];

const adults = people.filter((person) => person.age >= 18);
console.log("adults: ", adults);

//ex4
const users = [
  { id: 11, name: "bat", age: 23, group: "editor" },
  { id: 47, name: "sukhee", age: 28, group: "admin" },
  { id: 75, name: "bymbaa", age: 34, group: "editor" },
  { id: 33, name: "bandia", age: 19, group: "admin" },
  { id: 45, name: "tumee", age: 27, group: "editor" },
];

users.map(
  (user) => (user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1))
);
console.log("users: ", users);

//ex5
const users1 = [
  { id: 11, name: "Bat", age: 23, group: "editor" },
  { id: 47, name: "Bold", age: 28, group: "admin" },
  { id: 85, name: "Tulga", age: 34, group: "editor" },
  { id: 97, name: "Suren", age: 28, group: "admin" },
];

const admins = users1.filter((user) => user.group === "admin");
console.log("admins: ", admins);

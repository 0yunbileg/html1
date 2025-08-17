//ex1
const students = [
    { name: "Anu", grade: 85 },
    { name: "Bold", grade: 92 },
    { name: "Tuvshin", grade: 78 },
    { name: "Naraa", grade: 88 },
    { name: "Solongo", grade: 95 }
  ];

const topStudents = students.filter(student => student.grade > 90);
// console.log(topStudents);

students.sort((a, b) => a.grade - b.grade);
// console.log(students);

let highest = 0;
students.forEach(student => {if(highest < student.grade) {highest = student.grade}});
const topStudent = students.find(student => student.grade === highest);
// console.log(topStudent);

//ex2
const products = [
    { id: 1, name: "Laptop", price: 2500 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Monitor", price: 400 },
    { id: 4, name: "Keyboard", price: 100 },
    { id: 5, name: "Phone", price: 1200 }
  ];

const cheapProductNames = new Array();
products.forEach(product => {
if(product.price < 500) {
    cheapProductNames.push(product.name);
}
});
// console.log(cheapProductNames);

products.sort((a, b) => a.price - b.price);
// console.log(products);

const firstProductHigherThan1000 = products.find(product => product.price > 1000);
// console.log(firstProductHigherThan1000);


//ex3
const students1 = [
    { id: 1, name: "Anu", grades: [90, 88, 95] },
    { id: 2, name: "Bold", grades: [75, 80, 85] },
    { id: 3, name: "Anu", grades: [92, 91, 94] },
    { id: 4, name: "Tuvshin", grades: [80, 78, 82] },
    { id: 5, name: "Solongo", grades: [95, 94, 93] }
  ];

function getAvgGrade(grades) {
    let total = 0;
    grades.forEach(grade => total += grade);
    return Math.round(total / 3);
}

let newStudents = new Array;
students1.forEach(student => {
    let isSameName = false

    newStudents.forEach(newStudent => {
        if(newStudent.name == student.name) {
            if(getAvgGrade(newStudent.grades) < getAvgGrade(student.grades)) {
                newStudent.grades = student.grades;
            }
            isSameName = true;
        }
    });

    if(!isSameName) {
        newStudents.push(student);
    }
});
// console.log(newStudents);

newStudents.sort((a, b) =>  getAvgGrade(b.grades) - getAvgGrade(a.grades));
// console.log(newStudents);

const firstStudentLowerThan80 = newStudents.find(student => getAvgGrade(student.grades) <= 80);
// console.log(firstStudentLowerThan80);


//ex4
const products1 = [
    { id: 101, name: "Laptop", prices: [2000, 2100, 1900] },
    { id: 102, name: "Mouse", prices: [25, 27, 24] },
    { id: 103, name: "Keyboard", prices: [100, 110, 90] },
    { id: 104, name: "Laptop", prices: [1950, 1980, 2000] },
    { id: 105, name: "Monitor", prices: [400, 390, 410] }
  ];

function getAvgPrice(prices) {
let total = 0;
prices.forEach(price => {total += price});
return Math.round(total / 3);
}

products1.forEach(product => {
product.averagePrice = getAvgPrice(product.prices);
});

// console.log(products1);

let newProducts = new Array();
products1.forEach(product => {
    let isSameNameProduct = false;
    newProducts.forEach(newProduct => {
        if(newProduct.name === product.name) {
            if(newProduct.averagePrice > product.averagePrice) {
                newProduct.averagePrice = product.averagePrice;
            }
            isSameNameProduct = true;
        }
    })

    if(!isSameNameProduct) {
        newProducts.push(product);
    }
})

// console.log(newProducts);

newProducts.sort((a, b) => a.averagePrice - b.averagePrice);
// console.log(newProducts);

const productHigherThan1000 = newProducts.find(product => product.averagePrice > 1000);
// console.log(productHigherThan1000);

newProducts.forEach((product, index) => {
    // console.log(`Index of ${product.name} is ${index}.`)
});

//ex5
const moviesA = [
    { id: 1, title: "Inception", genre: "Sci-Fi", rating: 9 },
    { id: 2, title: "Titanic", genre: "Romance", rating: 8 },
    { id: 3, title: "The Matrix", genre: "Sci-Fi", rating: 9 }
];

const moviesB = [
    { id: 4, title: "The Godfather", genre: "Crime", rating: 10 },
    { id: 5, title: "Titanic", genre: "Romance", rating: 8 },
    { id: 6, title: "Interstellar", genre: "Sci-Fi", rating: 9 }
];

const allMovies = moviesA.concat(moviesB);

const uniqueMovies = new Array();
allMovies.forEach(movie => {
    let isSameMovie = false
    uniqueMovies.forEach(umovie => {
        if(umovie.title === movie.title) {
            isSameMovie = true;
        }
    })
    if(!isSameMovie) {
        uniqueMovies.push(movie)
    }
})

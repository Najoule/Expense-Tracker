const expenses = [
    { description: "Coffee" , amount: 5 },
    { description: "Lunch" , amount: 12 },
    { description: "Bus" , amount: 3 }
];

console.log(expenses);

const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
);

console.log("Total: $" + total);

const newExpense = { description: "Snack" , amount: 4 };

const updatedExpenses = [
    ...expenses,
    newExpense
];

console.log(updatedExpenses);

const updatedTotal = updatedExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
);

console.log("Updated total: $" + updatedTotal);

function addExpense(expenses, newExpense) {
    return [...expenses, newExpense];
}

const expensesAfterFunction = addExpense(expenses, newExpense);

console.log(expensesAfterFunction);

const totalAfterFunction = expensesAfterFunction.reduce(
    (sum, expense) => + expense.amount,
    0
)

function getTotal(expenses) {
    return expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );
}

const totalFromFunction = getTotal(expensesAfterFunction);

console.log("Total using getTotal: $" + totalFromFunction);

const expensiveExpenses = expenses.filter(
    expense => expense.amount > 4

);

console.log(expensiveExpenses);

const filteredTotal = expensiveExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
);

console.log("filtered total: $" + filteredTotal);


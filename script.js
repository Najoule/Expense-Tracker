const descriptionInput = document.getElementById("descriptionInput");

const amountInput = document.getElementById("amountInput");

const addExpenseBtn = document.getElementById("addExpenseBtn");

const errorMessage = document.getElementById("errorMessage");

const expenseList = document.getElementById("expenseList");

const savedExpenses = localStorage.getItem("expenses");

const expenses = savedExpenses ? JSON.parse(savedExpenses) : [];

function calculateTotal() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    return total;
}

function createExpenseRow(expense) {

    const row = document.createElement("tr");

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = expense.description;
    row.appendChild(descriptionCell);

    const amountCell = document.createElement("td");
    amountCell.textContent = `$${expense.amount.toFixed(2)}`;
    row.appendChild(amountCell);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    const deleteCell = document.createElement("td");
    deleteCell.appendChild(deleteButton);

    row.appendChild(deleteCell);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const editCell = document.createElement("td");
    editCell.appendChild(editButton);

    row.appendChild(editCell);

    deleteButton.addEventListener("click", function() {

        const index = expenses.indexOf(expense);

        expenses.splice(index, 1);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        row.remove();

    });

    editButton.addEventListener("click", function() {

    if (editButton.textContent === "Edit") {

        descriptionInput.value = expense.description;
        amountInput.value = expense.amount;

        editButton.textContent = "Save";

    } else {

    if (descriptionInput.value === "") {
        errorMessage.textContent = "Please enter a description.";
        return;
    }

    if (amountInput.value === "") {
        errorMessage.textContent = "Please enter an amount.";
        return;
    }

    if (isNaN(amountInput.value)) {
        errorMessage.textContent = "Please enter a valid number.";
        return;
    }

    const amount = Number(amountInput.value);

    if (amount <= 0) {
        errorMessage.textContent = "Amount must be greater than zero.";
        return;
    }

    errorMessage.textContent = "";

    expense.description = descriptionInput.value;
    expense.amount = amount;

    localStorage.setItem("expenses", JSON.stringify(expenses));

    descriptionCell.textContent = expense.description;
    amountCell.textContent = `$${expense.amount.toFixed(2)}`;

    editButton.textContent = "Edit";

    const total = calculateTotal();

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;

    descriptionInput.value = "";
    amountInput.value = "";
    }

    });

    return row;
}

function renderExpenses() {
    
    expenses.forEach(function(expense) {

        const row = createExpenseRow(expense);

        expenseList.appendChild(row);

    });

    const total = calculateTotal();

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

const totalDisplay = document.getElementById("totalExpenses");


renderExpenses();



addExpenseBtn.addEventListener("click", function() {

    const description = descriptionInput.value;
    const amountInputValue = amountInput.value;

    if (description === "") {
        errorMessage.textContent = "Please enter a description.";
        return;
    }

    if (amountInputValue === "") {
        errorMessage.textContent = "Please enter an amount.";
        return;
    }

    if (isNaN(amountInputValue)) {
        errorMessage.textContent = "Please enter a valid number.";
        return;
    }

    const amount = Number(amountInputValue);

    if (amount <= 0) {
        errorMessage.textContent = "Amount must be greater than zero.";
        return;
    }

    errorMessage.textContent = "";

    const expense = {
        description: description,
        amount: amount
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    const total = calculateTotal();

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;

    const row = createExpenseRow(expense);

    expenseList.appendChild(row);

    descriptionInput.value = "";
    amountInput.value = "";

});


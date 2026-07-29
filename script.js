let myExpenses = JSON.parse(localStorage.getItem("tripExpenses")) || [];
let currentId = -1;

const itemInput = document.getElementById("expenseName");
const costInput = document.getElementById("expenseCost");
const catInput = document.getElementById("expenseCategory");
const mainBtn = document.getElementById("mainBtn");

function updateStorage() {
    localStorage.setItem("tripExpenses", JSON.stringify(myExpenses));
}

function showExpenses() {
    const tableRows = document.getElementById("tableRows");
    tableRows.innerHTML = "";

    myExpenses.forEach((item, index) => {
        tableRows.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.cost}</td>
                <td>${item.category}</td>
                <td>
                    <button class="edit-link" onclick="editExpense(${index})">Edit</button>
                    <button class="delete-link" onclick="deleteExpense(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addOrUpdateExpense() {
    const name = itemInput.value.trim();
    const cost = costInput.value.trim();
    const category = catInput.value.trim();

    if (!name || !cost || !category) {
        alert("Please fill out everything first!");
        return;
    }

    const expenseObject = { name, cost, category };

    if (currentId === -1) {
        myExpenses.push(expenseObject);
    } else {
        myExpenses[currentId] = expenseObject;
        currentId = -1;
        mainBtn.innerText = "Save Expense";
        mainBtn.classList.remove("changing");
    }

    clearForm();
    updateStorage();
    showExpenses();
}

function editExpense(index) {
    currentId = index;
    const selected = myExpenses[index];

    itemInput.value = selected.name;
    costInput.ةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةةvalue = selected.cost;
    catInput.value = selected.category;

    mainBtn.innerText = "Update Expense";
    mainوزووةزوةزوةةوةزةوززةوووووةوزةزوةوزةوزةزوةزوززوةوةزوةزوةوزةوةوززوزوةوةوزةوةوةوزةوةوةوةووةووةوةوةزوةزوةوزةوزةوةزوةوزةوةةزوةوةزوةزوةوزةوزةوةووزةوةوزةوةوةوةوزةزوةوزةووزووةزةزةوزةوزةةزووزوةوةوةوةزوزوةزوةوزةوزBtn.classList.add("changing");
}
مننمتمتنمتمتتنتمنتنمتنمتمنتمنتمنتمنتنمنتمنتنمتمنتمنتمنتمتتمنتننتنمتمنتمنتمنتمنمتمنتمنتمتمنتمنتمتمتنمتنمتنمتنتمنتمنتنمتنمتنمتنمنتنمتنمنمتنتمتمنتنمتنمتمنتنتمنتنمنتمنتمنتتنمنتنمتمتمتمتم
function deةوةةوةةةىةوىوةىوةىوةىوةىوةىوةىوىوةىوةىوةىوةىوةوىوةىوىوةوةوىوةىوةىوةىوىوىوةىوىةوىوةىوةىةوةىوةىىوونىممنمنتنمنىنمنىمنىمنىىنننمممىنمىننىنمىنمنمىمىنىننىنىننىنىنىمنمىمنىنمىممنىمنمىنىمنىنمنىىننمىنىمنىمنمنىنىمنىمنمنىمنمنىنىمننمىمنىنىنمىمنىمنمنىممنىمنىمنىنىنىنىمنىنىنىمنىنىنىمنىنىنمىمىننمنىننىنمنىنمنىنىمنىنىنمىننىمىمنىنىىمنىنمىنىنىننمىنىنىنىمنىنىنمىنىنىنمممىىىىنننننممممىىمىنىمىنىممنةنمةنممنةمةنمنتنننتمنتمنتمنتنمنمنتمنتمنتمنتمنمتمنتنمتمتنمتنمتمنتمتمنتمنتمنتتمتمنتمتنمتنتمنتمننمتمنتننمتنمتنمتنممنتمنتنمنتتنمتمنتنمتممنتمنتممتننمتمنتمتنمنتنمتممتننمتمنتمنتنمتنتنمنتمنمتنمتمنتمنتمنتتمنتمتنممتنمتممنتمنتمنمتمتمننمتمنتممنتمتنمتمنمنتمتننمتمننىنمنتمنتنمتمنتنمتتنتمنتمتنمتتنتنتنتمنتمتمنتنمتنمتمنتمنتمنتمتنمتنمتنمتمنتمنتنمتنمتنمتمنتنمتمتنتمتنتمنتنتمنتمنتمتنمتمتنمتمنتنمتمنتنمتنمتنمتنمتمنتتمنمنتنتمنتمتنتنمتنتنتنمتنتنتمنتنتمنتنمتنتمنتنتنتمتنمتمنتمنتمنتنمتنمتمنتنمتمنتمنتمتنمتمتمننتنمتنتنتنتنتمنتمنتنمتمتنمنتمتمتمنمنتمتتكمتتككمنتمكتمتتنتمننمتككتنمتكنمتننممنتككمتمنتمتكمنتكمنتكمنتكتننتنتنممننتتككممنمنمنمتنمتنمتتككتنمتننمنتنمتنتنتنتنمتننمتنتنمتنتنمتتنمنمتمنمنمتتنتتنتنتننتنتنتنتنتنتتتنتنمتممكنleteExpense(index) {
    myExpenses.splice(index, 1);
    updateStنىننتىتنىنتىتنىتىنتىنىتىنتىنتىنىتنىتنىتنىنىتنىنىتنىتىتنىتىتنىتنىتىتىنتىتىىنىنىىتىنىنىتىنىتنىنىتىنىىنىتنىتنىتىننتىنىنىتنىتنىتىتنىتىتنىنتىنتىتىتنorage();
    showExpenses();
}

function clearForm() {
    itemInput.value = "";
    costInput.value = "";
    catInput.value = "";
}

showExpenses();

document.getElementById("expense-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount, date }),
    });

    fetchExpenses();
    fetchTotalExpenses();
});

async function fetchExpenses() {
    const res = await fetch("http://localhost:3000/expenses");
    const expenses = await res.json();
    const list = document.getElementById("expense-list");
    list.innerHTML = "";
    expenses.forEach((expense) => {
        const formattedDate = formatDate(expense.date);
        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.description} - R$${expense.amount.toFixed(2)} ${formattedDate.substring(0,2) + "/" + formattedDate.substring(17,19) + "/" + formattedDate.substring(20,24)}
            <button class="edit" data-id="${expense._id}" data-description="${expense.description}" data-amount="${expense.amount}" data-date="${expense.date}">Edit</button>
            <button class="delete" data-id="${expense._id}">Delete</button>
        `;
        list.appendChild(li);
    });

    document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", async (e) => {
            const id = e.target.getAttribute("data-id");
            await deleteExpense(id);
            fetchExpenses();
            fetchTotalExpenses();
        });
    });

    document.querySelectorAll(".edit").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const description = e.target.getAttribute("data-description");
            const amount = e.target.getAttribute("data-amount");
            const rawDate = e.target.getAttribute("data-date");

            openEditModal(id, description, amount, formatDate(rawDate));
        });
    });
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
}

function formatDateForInput(dateString) {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`; // Converts back to yyyy-mm-dd for input compatibility
}

function openEditModal(id, description, amount, formattedDate) {
    const modal = document.getElementById("edit-modal");
    document.getElementById("edit-description").value = description;
    document.getElementById("edit-amount").value = amount;
    document.getElementById("edit-date").value = formatDateForInput(formattedDate); // Convert back to yyyy-mm-dd for the input
    modal.style.display = "block";

    document.getElementById("save-edit").onclick = async () => {
        const updatedDescription = document.getElementById("edit-description").value;
        const updatedAmount = parseFloat(document.getElementById("edit-amount").value);
        const updatedDate = document.getElementById("edit-date").value;

        await fetch(`http://localhost:3000/expenses/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: updatedDescription, amount: updatedAmount, date: updatedDate }),
        });

        modal.style.display = "none";
        fetchExpenses();
        fetchTotalExpenses();
    };

    document.getElementById("close-modal").onclick = () => {
        modal.style.display = "none";
    };
}

async function deleteExpense(id) {
    await fetch(`http://localhost:3000/expenses/${id}`, {
        method: "DELETE",
    });
}

async function fetchTotalExpenses() {
    const res = await fetch("http://localhost:3000/expenses/total");
    const { total } = await res.json();
    document.getElementById("total-expenses").textContent = total.toFixed(2);
}

fetchExpenses();
fetchTotalExpenses();

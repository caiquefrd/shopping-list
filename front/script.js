document.getElementById("shopping-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    await fetch("http://localhost:3000/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount}),
    });

    fetchshopping();
    fetchTotalshopping();
});

async function fetchshopping() {
    try {
        const res = await fetch("http://localhost:3000/shopping");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const shopping = await res.json();
        const list = document.getElementById("shopping-list");
        list.innerHTML = "";
        shopping.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.description} - R$${item.amount}</span>
                <button class="edit" data-id="${item._id}" data-description="${item.description}" data-amount="${item.amount}">Edit</button>
                <button class="delete" data-id="${item._id}">Delete</button>
            `;
            list.appendChild(li);
        });

        document.querySelectorAll(".delete").forEach((button) => {
            button.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");
                await deleteshopping(id);
                fetchshopping();
                fetchTotalshopping();
            });
        });

        document.querySelectorAll(".edit").forEach((button) => {
            button.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                const description = e.target.getAttribute("data-description");
                const amount = e.target.getAttribute("data-amount");

                openEditModal(id, description, amount);
            });
        });
    } catch (error) {
        console.error("Failed to fetch shopping list:", error);
    }
}

function openEditModal(id, description, amount) {
    const modal = document.getElementById("edit-modal");
    document.getElementById("edit-description").value = description;
    document.getElementById("edit-amount").value = amount;
    modal.style.display = "block";

    document.getElementById("save-edit").onclick = async () => {
        const updatedDescription = document.getElementById("edit-description").value;
        const updatedAmount = parseFloat(document.getElementById("edit-amount").value);

        await fetch(`http://localhost:3000/shopping/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: updatedDescription, amount: updatedAmount }),
        });

        modal.style.display = "none";
        fetchshopping();
        fetchTotalshopping();
    };

    document.getElementById("close-modal").onclick = () => {
        modal.style.display = "none";
    };
}

async function deleteshopping(id) {
    await fetch(`http://localhost:3000/shopping/${id}`, {
        method: "DELETE",
    });
}

fetchshopping();

# expenses-register
Basic expenses tracker using typescript, javascript html and mongoose with mongodb

Expense Tracker

A web application for managing personal expenses. Users can:

    Add expenses with descriptions, amounts, and dates.
    View a list of all expenses.
    Edit or delete existing expenses.
    View the total amount of expenses.

The application is built using:

    Frontend: HTML, CSS, JavaScript
    Backend: Node.js, TypeScript, Express, MongoDB, Mongoose

Features

    Add Expenses: Use the form to input description, amount, and date.
    View Expenses: Displays a list of expenses in a readable format (dd-mm-yyyy).
    Edit Expenses: Modify an existing expense via a popup modal.
    Delete Expenses: Remove an expense from the list and the database.
    Total Expenses: Automatically calculates and displays the total expense.

Requirements

    Node.js (v16 or newer)
    MongoDB (local instance or cloud)
    NPM (Node Package Manager)

Installation and Setup
Clone the Repository

git clone https://github.com/caiquefrd/expense-tracker.git
cd expense-tracker

Backend Setup

Navigate to the backend directory:

    cd back

Install dependencies:

    npm install

Start MongoDB:

Ensure your MongoDB server is running locally or replace the connection string in src/index.ts with your MongoDB URI.

Run the backend server:

    npm start

The backend will run on http://localhost:3000.

Frontend Setup

Navigate to the frontend directory:

    cd front

Open index.html in your browser:

    You can use a live server (e.g., the Live Server extension in VS Code) to preview.

Project Structure:

    expense-tracker/
    ├── front/              # Frontend code
    │   ├── index.html      # Main HTML file
    │   ├── styles.css      # Styles for the frontend
    │   └── script.js       # Frontend logic
    ├── back/               # Backend code
    │   ├── src/            # Source code
    │   │   ├── index.ts    # Entry point of the server
    │   │   ├── models/     # Mongoose models
    │   │   │   └── expense.ts
    │   │   └── routes/     # Routes for CRUD operations
    │   │       └── expenseRoutes.ts
    │   ├── package.json    # Dependencies and scripts
    │   └── tsconfig.json   # TypeScript configuration
    └── README.md           # Project documentation


License

This project is open-source and available under the MIT License.

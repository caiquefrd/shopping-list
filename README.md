# shopping-list
Basic shopping list tracker using TypeScript, JavaScript, HTML, and Mongoose with MongoDB

Shopping List Tracker

A web application for managing shopping items. Users can:

    Add items with descriptions and amounts.
    View a list of all items.
    Edit or delete existing items.
    View the total amount of items.

The application is built using:

    Frontend: HTML, CSS, JavaScript
    Backend: Node.js, TypeScript, Express, MongoDB, Mongoose

Features

    Add Items: Use the form to input description and amount.
    View Items: Displays a list of items.
    Edit Items: Modify an existing item via a popup modal.
    Delete Items: Remove an item from the list and the database.
    Total Amount: Automatically calculates and displays the total amount.

Requirements

    Node.js (v16 or newer)
    MongoDB (local instance or cloud)
    NPM (Node Package Manager)

Installation and Setup
Clone the Repository

    git clone https://github.com/caiquefrd/shopping-list.git
    cd shopping-list

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

    shopping-list/
    ├── front/              # Frontend code
    │   ├── index.html      # Main HTML file
    │   ├── styles.css      # Styles for the frontend
    │   └── script.js       # Frontend logic
    ├── back/               # Backend code
    │   ├── src/            # Source code
    │   │   ├── index.ts    # Entry point of the server
    │   │   ├── models/     # Mongoose models
    │   │   │   └── shopping_model.ts
    │   │   └── routes/     # Routes for CRUD operations
    │   │       └── shopping_routes.ts
    │   ├── package.json    # Dependencies and scripts
    ��   └── tsconfig.json   # TypeScript configuration
    └── README.md           # Project documentation

License

This project is open-source and available under the MIT License.

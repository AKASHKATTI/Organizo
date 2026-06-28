<<<<<<< HEAD
# Organizo - Task Management App

Organizo is a modern, full-stack task management application designed to help users organize their daily tasks efficiently. It features an interactive Kanban board, a dynamic daily planner, and user authentication, all wrapped in a clean and responsive user interface.

![Organizo Screenshot](https://i.imgur.com/your-screenshot-url.png) <!-- It's a good idea to add a screenshot of your app here -->

## Features

*   **User Authentication**: Secure user registration and login using JWT.
*   **Task Management**: Full CRUD (Create, Read, Update, Delete) functionality for tasks.
*   **Interactive Kanban Board**:
    *   View tasks in "Todo", "In Progress", and "Completed" columns.
    *   Seamlessly drag and drop tasks to update their status.
*   **Dynamic Daily Planner**:
    *   A visually engaging week-long view to navigate between days.
    *   A date picker to jump to any specific date.
*   **Daily Productivity Stats**: View statistics like total tasks, completed tasks, and a productivity score for the selected day.
*   **Responsive UI**: A polished and intuitive interface built with React and Tailwind CSS that works on all screen sizes.
*   **Optimistic UI Updates**: Task state updates instantly on the frontend for a smooth user experience while syncing with the backend.

---

## Tech Stack

### Backend

*   **Node.js**: JavaScript runtime environment.
*   **Express**: Web framework for Node.js.
*   **MongoDB**: NoSQL database for storing user and task data.
*   **Mongoose**: ODM for modeling application data.
*   **JWT (JSON Web Tokens)**: For secure user authentication.
*   **bcryptjs**: For password hashing.
*   **dotenv**: For managing environment variables.

### Frontend

*   **React**: A JavaScript library for building user interfaces.
*   **React Router**: For client-side routing and navigation.
*   **Axios**: For making HTTP requests to the backend API.
*   **@hello-pangea/dnd**: For beautiful and accessible drag-and-drop functionality.
*   **date-fns**: For robust date manipulation.
*   **Tailwind CSS**: A utility-first CSS framework for styling.
*   **lucide-react**: For a clean and consistent icon set.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn
*   MongoDB Atlas account (or a local MongoDB instance)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/organizo.git
    cd organizo
    ```

2.  **Setup the Backend:**
    *   Navigate to the backend directory:
        ```sh
        cd backend
        ```
    *   Install dependencies:
        ```sh
        npm install
        ```
    *   Create a `.env` file in the `backend` directory and add the following environment variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_key
        ```
    *   Start the backend server:
        ```sh
        npm start
        ```
        The server will be running on `http://localhost:5000`.

3.  **Setup the Frontend:**
    *   Open a new terminal and navigate to the frontend directory:
        ```sh
        cd frontend
        ```
    *   Install dependencies:
        ```sh
        npm install
        ```
    *   Start the frontend development server:
        ```sh
        npm run dev
        ```
        The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## Available Scripts

### Backend (`/backend`)

*   `npm start`: Starts the backend server using `nodemon` for automatic restarts on file changes.

### Frontend (`/frontend`)

*   `npm run dev`: Starts the frontend development server with Vite.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Lints the project files.
*   `npm run preview`: Serves the production build locally.

---

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
=======
# Organizo
>>>>>>> 418c176d3ca2d83da6ceb96fe0e5c7ccbeba162b

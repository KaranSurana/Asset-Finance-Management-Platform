# Asset Finance Management Platform

## Project Overview
The **Asset Finance Management Platform** is a comprehensive application designed to manage user applications efficiently. It includes a robust backend, a user-friendly frontend, and implements key features like user authentication and API documentation.

- **Frontend URL(aws)** - https://d12gtgoagbp5j.cloudfront.net/
- **Backend URL(aws)** - https://py7hbtq3ha76yu77qnaapqx6qy0jntaz.lambda-url.ap-southeast-2.on.aws/health
                    (replace health with any api endpoints)
- **Swagger URL(aws)** - https://py7hbtq3ha76yu77qnaapqx6qy0jntaz.lambda-url.ap-southeast-2.on.aws/api-docs

Tasks Attempted

- Frontend: Completed Entirely ✅
- Backend: Completed Entirely ✅
- DB: Completed Entirely ✅
- Additional Considerations: Completed Entirely ✅
- Deliverables: Completed Entirely ✅
- Bonus: Completed Entirely ✅

---

## **To set up the project locally, follow the instructions provided below, after the implementation details.**


## Backend Implementation

### Structure
The backend is structured to ensure maintainability and scalability. The file structure includes:
- **Routes**: Handles all API endpoints.
- **Controllers**: Handles logic for the application.
- **Middleware**: Manages authentication logic.
- **Models**: Stores all database schemas.
- **Configs**: Includes database configurations.
- **Test Files**: Contains unit tests for the backend.

### Database
The database consists of two primary schemas:
1. **Users**: Stores user-related information.
2. **Applications**: Stores data about applications created by users.

### Entry Point
- **index.js** serves as the entry point for the backend application.

### Documentation
- API documentation is implemented using **Swagger**, ensuring clear and concise API documentation for developers.

---

## Frontend Implementation

### Structure
The frontend is built using **React** as a Single Page Application (SPA). The file structure includes:
- **Source Folder (`src`)**:
  - **Components**: Contains all reusable components used throughout the application.
  - **Styles**: Stores all CSS and styling resources.
  - **index.js**: The entry point for the React application.

### Features
1.  Segregated logic into appropriate components for modularity.
2. **Logging and Monitoring**: Added throughout the application to report specific issues or errors during the running of the application.    
    - Logging: Logs are visible in CloudWatch Logs, allowing for detailed tracking of application activity and errors.
    - Monitoring: CloudWatch Metrics are visible for tracking Lambda performance (e.g. Invocations, Errors, and Duration).
---

## Additional Features/Enhancements Added

1. **Login/Register Functionality**: Ensures that only authenticated users can view and manage their applications.

2. **Commit Structure**:
   - Commit messages follow a structured format:
     - **Feature**: Prefix.
     - **Feature Name**: Matches the assessment task deliverable (e.g., DB, Frontend, Bonus).
     - **Point Number**: Refers to the specific task point.
     - **Comment**: Describes the commit's content.

   - Example: Feature Frontend 2: users can now create, update and delete their finance applications

---

## Future Scope
1. **Frontend Enhancements**:
- Separate components and pages into distinct directories for improved organization.
2. **Version Control Improvements**:
- Use Git branching to separate features into dedicated branches.
3. **Admin Functionality**:
- Add an admin view to allow approval or rejection of applications created by users.


---


# Setup

## Prerequisites

*   Install Node.js (v16 or above).

## Backend Setup

1.  Clone the repository:

    ```bash
    git clone git@github.com:KaranSurana/Asset-Finance-Management-Platform.git
    ```

2.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Start the backend server:

    ```bash
    npm start
    ```

## Frontend Setup

1.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the frontend application:

    ```bash
    npm start
    ```

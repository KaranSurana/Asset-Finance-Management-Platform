# Backend CI/CD Pipeline

## 1. Trigger Conditions

The backend pipeline runs automatically when:

- A push is made to the `v1` branch, and the changes are within the `backend/` folder.

---

## 2. Pipeline Structure

The backend pipeline consists of two main jobs:

### **Job 1: Test**

This job ensures the backend code is functional and passes all tests before deployment.

**Working Directory:** `./backend`

#### **Steps:**

1. **Checkout Code:**  
   - The repository code is checked out.

2. **Setup Node.js:**  
   - Node.js is installed.  
   - Dependencies are cached using `package-lock.json`.

3. **Install Dependencies:**  
   - Dependencies are installed using `npm`.

4. **Run Tests:**  
   - Automated tests are executed using `npm test`.  

---

### **Job 2: Deploy**

If the tests pass successfully, the deployment job starts.

**Working Directory:** `./backend`  
**Dependency:** Relies on the test job completing successfully.

#### **Steps:**

1. **Checkout Code:**  
   - The repository code is checked out.

2. **Setup Node.js:**  
   - Node.js installed.  
   - Dependencies are cached.

3. **Install Dependencies:**  
   - Production dependencies are installed.

4. **Prepare Deployment Package:**  
   - The package is prepared for deployment.

5. **Push to Lambda:**  
   - Using AWS credentials with appropriate permissions, the zipped package is pushed to AWS Lambda.  
   - All AWS credentials are stored as repository secrets on github.

# Frontend CI/CD Pipeline

## 1. Trigger Conditions

The frontend pipeline runs automatically when:

- A push is made to the `v1` branch, and the changes are within the `frontend/` folder.

---

## 2. Pipeline Structure

The frontend pipeline consists of a single deployment job:

### **Job: Build and Deploy**

This job handles building and deploying the frontend application.

**Working Directory:** `./frontend`

### **Steps:**

1. **Checkout Code:**  
   - The repository code is checked out.

2. **Setup Node.js:**  
   - Node.js is installed.  
   - Dependencies are cached using `package-lock.json`.

3. **Install Dependencies:**  
   - Dependencies are installed using `npm`.

4. **Build the Frontend:**  
   - The frontend code is built to create optimized production files using `npm run build`.

5. **Set Up AWS Credentials:**  
   - AWS credentials are configured using secrets stored in the repository.

6. **Push to S3:**  
   - Using AWS credentials with appropriate permissions, the built frontend files are uploaded to the S3 bucket, and outdated files are removed.  
   - All AWS credentials are stored as repository secrets on github.

7. **Invalidate CloudFront Cache:**  
   - The CloudFront cache is invalidated to ensure updated files are served immediately.

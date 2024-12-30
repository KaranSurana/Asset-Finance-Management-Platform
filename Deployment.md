# Deployment Documentation

## Backend Deployment

### Serverless-HTTP Integration:
- Wrapped the application using the `serverless-http` module.
- Exported the app as a handler for AWS Lambda.

### Lambda Function Setup:
1. Zipped the entire backend code.
2. Created a Lambda function in AWS using the latest Node.js runtime.
3. Uploaded the zipped backend code.

### API Gateway Configuration:
1. Created a REST API in API Gateway.
2. Added a resource and configured it as a proxy resource to forward all requests and associated request bodies to the Lambda function.
3. Enabled CORS in API Gateway.
4. Integrated the Lambda function with the proxy resource.
5. Deployed the API.

### Lambda Configuration:
- Updated the Lambda function's timeout setting from the default (3 seconds) to 60 seconds to ensure sufficient time for operations to complete.

## Frontend Deployment

### Amazon S3 Setup:
1. Created an S3 bucket.
2. Named the bucket and enabled public access to allow users to access the frontend application.

### Frontend Build and Upload:
1. Updated the backend URL in the `config.js` file.
2. Built the frontend application.
3. Uploaded the build version to the S3 bucket.

### CloudFront Distribution:
1. Created a CloudFront distribution.
2. Set the origin domain to the S3 bucket.
3. Configured the Viewer Protocol Policy to redirect HTTP to HTTPS.

### Testing and Validation:
- Ensured that both the backend and frontend were properly connected.
- Validated API responses and frontend rendering.

## Final Notes
- Ensure proper IAM roles and permissions are set for Lambda, API Gateway, and S3.
- Regularly monitor API Gateway and Lambda logs for debugging and performance optimization.
- Use AWS CloudWatch for monitoring and alerts.

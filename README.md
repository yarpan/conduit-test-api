# Test API Conduit

This project is an API test automation framework for the Conduit API, built using TypeScript and Playwright. It includes various utilities, schemas, and test cases to validate the functionality of the API endpoints.

---
## Project Structure

test-api-conduit/  
├── app/  
│   ├── constants.ts  
│   ├── interfaces/  
│   └── schemas/  
├── api-client/  
│   ├── ApiClient.ts  
│   └── controllers/  
├── fixtures/  
├── helpers/  
├── test-data/  
├── tests/  
├── .env  
├── [package.json]  
└── [README.md]  


### 1. **`app/`**
Contains application-level constants, schemas, and interfaces.

- **`constants.ts`**: Defines reusable constants such as API endpoints and validation messages.
- **`schemas/`**: Contains JSON schemas for validating API responses.
- **`interfaces/`**: Defines TypeScript interfaces for API request and response objects.

### 2. **`api-client/`**
Contains the API client implementation and controllers for interacting with the Conduit API.

- **`BaseController.ts`**: A base class for all API controllers, providing shared functionality.
- **`controllers/`**: Contains specific controllers for different API modules:
  - `UserController.ts`: Handles user-related API operations (e.g., login, registration, profile management).
  - `ArticleController.ts`: Manages article-related API operations.
  - `CommentsController.ts`: Handles article comments.
- **`ApiClient.ts`**: A wrapper around Playwright's `request` API for making HTTP requests.

### 3. **`test-data/`**
Contains test data and utilities for generating dynamic data.

### 4. **`tests/`**
Contains test cases organized by feature.

  - `article-comments.spec.ts`: Tests for article comments.
  - `article-favorites.spec.ts`: Tests for article favorites.

### 5. **`fixtures/`**
Contains Playwright fixtures for setting up test environments.

### 6. **`helpers/`**
Utility functions to support test execution.



---

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **Playwright**: Install Playwright dependencies for your platform.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd test-api-conduit

   # Test API Conduit

## Installation

Install dependencies:
```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory and define the following variables:

USER_EMAIL=[test-user-email]  
USER_NAME=[test-user-username]  
USER_PASSWORD=[test-user-password]  

## Running Tests

Run all tests: 
```bash 
npx playwright test
```
Run tests with specific tags:  
```bash
npx playwright test --grep @tag
```
Run a specific test file:  
```bash
npx playwright test tests/NEW/article-comments.spec.ts
```
Debug tests:  
```bash
npx playwright test --debug
```  
To open the HTML report after a run:

```bash
npx playwright show-report
```
## Project Features

- **TypeScript Support**: Ensures type safety and better developer experience.  
- **Playwright Integration**: Provides a robust framework for API testing.  
- **Dynamic Test Data**: Uses faker and predefined data for generating test inputs.  
- **JSON Schema Validation**: Validates API responses against predefined schemas.  
- **Fixtures**: Simplifies test setup and teardown.  

---

##  Running Tests with Scripts

| Command                      | Description                    |
|-----------------------------|--------------------------------|
| `npm run test`              | Run all tests                  |
| `npm run test:headed`       | Run tests with browser visible |
| `npx playwright show-report`| Open test report in browser    |

---


##  CI Integration

The project uses **GitHub Actions** for automated testing.

See the workflow file:  
`.github/workflows/*.yml`


---

## Contributing

1. Fork the repository.  
2. Create a feature branch:  
```bash
   git checkout -b feature/your-feature  
   ```
3. Commit your changes:  
```bash
   git commit -m "Add your message"  
```
4. Push to the branch:  
```bash
   git push origin feature/your-feature  
```
5. Open a pull request.  

##  License

MIT – Free to use and modify.  
  

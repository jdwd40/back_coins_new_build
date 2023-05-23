Here's a suggested breakdown of sprints and tasks for your crypto coins exchange simulator app, using a Test-Driven Development (TDD) approach. As a solo developer, you'll tackle one task at a time, writing tests before implementing the code. 

Sprint 1: Project Setup and Backend

1. [x] Set up the development environment
   - [x] Install Node.js, Express, and required libraries
   - [x] Set up the chosen database and its driver
   - [x] Create a new project directory and initialize a Git repository

2. [x] Design the database schema
   - [x] Define the schema for Users, Coins, Transactions, and CoinPriceHistory

3. [ ] Implement user authentication
   - [ ] Write tests for user registration and login
   - [ ] Implement the registration and login API endpoints
   - [ ] Add token-based authentication

4. [ ] Implement simulated coins and price generation
   - [ ] Write tests for fake coin generation and price simulation
   - [ ] Implement coin generation and initial price simulation logic
   - [ ] Implement scheduled price updates every 5 minutes
   - [ ] Implement the API endpoint to fetch the list of coins with their prices

5. [ ] Implement portfolio management
   - [ ] Write tests for buying and selling coins
   - [ ] Implement the API endpoints for buying and selling coins
   - [ ] Implement the API endpoint to fetch a user's portfolio

6. [ ] Implement transactions recording
   - [ ] Write tests for transaction recording and retrieval
   - [ ] Implement the API endpoint to fetch a user's transaction history

7. [ ] Implement coin price history
   - [ ] Write tests for coin price history recording and retrieval
   - [ ] Implement the API endpoint to fetch the historical price chart for each coin

Sprint 2: Frontend

1. [ ] Set up the frontend project
   - [ ] Create a new React app
   - [ ] Install Chakra UI and any required dependencies

2. [ ] Create reusable UI components
   - [ ] Design and implement basic UI components like buttons, forms, and tables

3. [ ] Implement user registration and login
   - [ ] Write tests for user registration and login components
   - [ ] Implement the registration and login forms
   - [ ] Integrate the forms with the backend API

4. [ ] Implement the main screen with the list of coins and their prices
   - [ ] Write tests for the coin list component
   - [ ] Implement the coin list component and fetch data from the backend API

5. [ ] Implement portfolio management
   - [ ] Write tests for the portfolio component
   - [ ] Implement the portfolio component to display a user's portfolio
   - [ ] Implement buy/sell forms and integrate with the backend API

6. [ ] Implement transactions history
   - [ ] Write tests for the transactions history component
   - [ ] Implement the transactions history component and fetch data from the backend API

7. [ ] Implement coin price history
   - [ ] Write tests for the coin price history component
   - [ ] Implement the coin price history component and fetch data from the backend API

Sprint 3: Testing, Deployment, and Documentation

1. [ ] Perform thorough testing
   - [ ] Test frontend components and interactions
   - [ ] Test backend API endpoints and database operations

2. [ ] Deploy the app
   - [ ] Choose a hosting platform (e.g., Heroku, AWS, or Vercel)
   - [ ] Deploy the frontend and backend to the chosen platform

3. [ ] Write documentation
   - [ ] Create a README file
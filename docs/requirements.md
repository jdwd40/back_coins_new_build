Understood! In that case, you will generate fake coin names and simulate coin prices instead of fetching real-time data from an external API. Here's an updated requirements list for your app:

Functional Requirements:

1. Simulated coin prices:
   - The app should generate a list of fake coins with random names and symbols.
   - The app should simulate coin prices and display them on the main screen.

2. User authentication:
   - Users should be able to register with a unique username, email, and password.
   - Users should be able to log in with their email and password.
   - Users should have a starting balance of funds.

3. Portfolio management:
   - Users should be able to view their portfolio, including the coins they own and their current value.
   - Users should be able to buy coins using their available funds.
   - Users should be able to sell coins and receive funds in return.

4. Transactions recording:
   - The app should record every transaction made by the user (buying and selling coins).
   - Users should be able to view their transaction history.

5. Random coin price changes:
   - Coin prices should randomly change every 5 minutes.
   - The app should update the displayed coin prices accordingly.

6. Coin price history:
   - The app should record the coin price history every 5 minutes.
   - Users should be able to view the historical price chart for each coin.

Non-functional Requirements:

1. Performance:
   - The app should have fast response times and efficiently handle multiple concurrent users.

2. Scalability:
   - The app should be designed to scale horizontally, allowing for increased load and user traffic.

3. Security:
   - User authentication should be secure, with hashed passwords and token-based authentication.
   - API endpoints should be protected from unauthorized access.

4. Maintainability:
   - The code should be modular, well-documented, and easy to understand for future developers.

5. Compatibility:
   - The app should be compatible with major browsers and devices.

6. Technologies:
   - The app should be built using Node.js, Express, axios, React, and Chakra UI.

To generate fake coin names and symbols, you can create an array of random words or use a library like Faker.js. For simulating coin prices, you can use a random number generator within a specified range to generate initial prices and subsequent price changes. Remember to store the generated coin data and price history in your database, so you can display it to users and manage their portfolios.
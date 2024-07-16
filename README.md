# Virtual Stock Game

## Overview

The Virtual Stock Game is an application that allows users to simulate stock trading within a controlled environment. The project comprises three main components: the Frontend, Backend, and a Discord Bot. The frontend displays the user's portfolio, including a table of each stock they own and a graph showing the portfolio's development. The Discord Bot provides commands for users to interact with their portfolios. The backend handles all the business logic, including transactions and portfolio management, and uses Discord OAuth2 for authentication.

## Components

### 1. Frontend

The frontend component is responsible for displaying the user's portfolio. It includes:
- **Portfolio Table**: A table listing each stock the user owns, including details such as the ticker, current price, number of shares, and more.
- **Portfolio Graph**: A graph showing the historical performance and development of the user's portfolio over time.

### 2. Discord Bot

The Discord Bot allows users to manage their portfolios directly from Discord. It includes the following commands:
- **buy**: Allows the user to purchase shares of a stock.
  - **Usage**: `$buy [ticker] [number of shares]`
  - **Example**: `$buy AAPL 10` will buy 10 shares of Apple Inc.

- **sell**: Allows the user to sell shares of a stock they own.
  - **Usage**: `$sell [ticker] [number of shares]`
  - **Example**: `$sell AAPL 5` will sell 5 shares of Apple Inc.

- **createPortfolio**: Initializes a new portfolio for the user.
  - **Usage**: `$createPortfolio`
  - **Example**: `$createPortfolio` will create a new portfolio for the user.

- **portfolio**: Displays the current state of the user's portfolio.
  - **Usage**: `$portfolio`
  - **Example**: `$portfolio` will show the user their current portfolio, including all owned stocks and their values.

### 3. Backend

The backend component is the core of the application, handling all the business logic, such as:
- Managing user accounts and authentication via Discord OAuth2.
- Handling transactions (buying and selling of stocks).
- Managing portfolio data and calculations.
- Interfacing with external stock market APIs to fetch real-time stock data.

## Authentication

The application uses Discord OAuth2 for user authentication. This ensures that users can securely log in using their Discord accounts and interact with their portfolios either through the frontend or the Discord bot.

## Setup and Installation

### Prerequisites

- Node.js and npm
- Python
- Docker
- Discord account and a registered Discord bot
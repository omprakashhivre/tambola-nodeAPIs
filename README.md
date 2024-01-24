# onito-backend-coding-task

# Tambola Ticket Generator

This Node.js application generates Tambola tickets and stores them in a SQLite database.

## Getting Started

### Prerequisites

- Node.js installed
- SQLite database (not required)

### Installation

1. Clone the repository:

   ```Github SSH
   gh repo clone omprakashhivre/onito-backend-coding-task
   cd onito-backend-coding-task
   ```

2. install the required libraries
   ```
   npm install
   ```
    
3. create the ".env" file and add property 'PORT=8080' to start the on defined port
4. start the server
   ```
   npm start
   ```


This commands will start the server on port 8080 locally or in the enviromnent where you want to start it.

To add or generate new Ticket/tickets
```
http://localhost:8080/api/v1/tambola/generatetickets/6
```
Hit the following URL to get your generated tickets
```
http://localhost:8080/api/v1/tambola/gettickets?page=5&limit=1
```

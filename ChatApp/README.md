# ChatApp

ChatApp is a real-time chat application built using Node.js, Express.js, and Socket.IO. It allows users to join different chat rooms and exchange messages with other users in real-time. This README provides an overview of the codebase and instructions on how to set up and run the application.

## Features

- Multiple users can join a chat room and exchange messages in real-time.
- Users are provided with a list of active users in the room.
- Users receive system messages when they join or leave a room.
- Messages are timestamped and display the sender's username.

## Prerequisites

- Node.js (at least version 12.x)
- npm (Node Package Manager)

## Getting Started

1. **Clone the Repository**: Start by cloning this repository to your local machine.

   ```sh
   git clone https://github.com/your-username/chatapp.git
   cd chatapp
   ```

2. **Install Dependencies**: Install the required dependencies using npm.

   ```sh
   npm install
   ```

3. **Run the Application**: Start the Node.js server to run the application.

   ```sh
   npm start
   ```

   The server will start running on the default port `3000`. If you want to use a different port, you can set the `PORT` environment variable.

4. **Access the Application**: Open a web browser and go to `http://localhost:3000` (or the port you specified). You will be directed to the login page, where you can enter your email, username, and select a chat room to join.

5. **Chatting**: Once you've joined a chat room, you can exchange messages with other users in real-time. New messages will appear on the screen as they are sent.

## Code Structure

- The main server file is `server.js`, responsible for setting up the Express server, Socket.IO, and handling the socket connections.
- The `public` directory contains static assets for the front-end, including HTML, CSS, and client-side JavaScript (`main.js`).
- The `helpers` directory contains utility functions for managing users and formatting messages.
- The front-end JavaScript code (`main.js`) handles interactions with the Socket.IO server and updates the DOM with messages and user information.

## Contributing

If you'd like to contribute to ChatApp, feel free to fork this repository and submit pull requests. You can also open issues for bug reports, feature requests, or general discussions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

ChatApp was inspired by the need for real-time communication tools and was built using various technologies and libraries.

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Socket.IO](https://socket.io/)

## Contact

If you have any questions or need assistance, you can contact the author:

- Author: Raj
- Email: rj6207491172@gmail.com

Feel free to reach out with any feedback or inquiries related to the project.

---

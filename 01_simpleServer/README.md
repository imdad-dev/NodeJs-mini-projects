# 📂 Project 01: Simple Static Server
A fundamental exploration of Node.js core modules. This project demonstrates how to handle HTTP requests and serve physical files from the local file system without using heavy frameworks like xpress.

**🛠️ Core Concepts Covered**
http Module: Creating a server and managing Request/Response cycles.

fs Module: Reading HTML and text files asynchronously to stream them to the browser.

path Module: Handling file paths cross-platform.

MIME Types: Understanding how to tell the browser what kind of file is being sent.

🏗️ How it Works
The HTTP module listens for incoming connections on a specific port (e.g., 3000).

When a request hits, the FS module looks for the requested file (like index.html).

If found, the server sends a 200 OK status and the file content.

If not found, it gracefully serves a 404 Not Found page.

🚀 Getting Started
To run this specific project:

Navigate to the directory: cd 01_simpleServer

Run the server: node server.js

Open your browser at: http://localhost:3000
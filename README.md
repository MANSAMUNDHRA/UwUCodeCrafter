Deployed Link : https://codepilot-9op9.onrender.com/

# AI Code Assistant 💻

A full-stack AI-powered code generation and execution platform built with Node.js, Express, and the Hugging Face Inference API.  
Originally started during AISOC Chronos v1.0 and evolved into a professional AI coding assistant focused on clean code generation and interactive execution.

---

## What is AI Code Assistant? ✨

AI Code Assistant consists of two main components:

1. **AI Code Generation Service**
   - Uses a Large Language Model via Hugging Face Inference API
   - Generates clean, real programming code in real time
   - Streams responses using Server-Sent Events (SSE)
   - Supports structured prompts for beginner-friendly or production-style code
   - Provides an interactive chat interface

2. **Code Execution Engine (Python)**
   - Executes generated Python code securely in temporary files
   - Captures stdout and stderr output
   - Includes safety controls:
     - Execution timeout
     - Output size limits
     - Isolated temporary working directory

---

## Features 🌟

### Core Features
- Real-time AI code generation
- Streaming code responses
- Interactive chat-style coding interface
- Syntax-highlighted code output
- Edit and re-run generated code
- Copy code with one click

### Code Execution
- Run generated Python code directly inside the app
- View execution output in a terminal-style panel
- Error handling and output display

### UI & Experience
- Modern developer-focused interface
- Chat history sidebar
- Theme accent customization
- Loading states and live status indicators
- Responsive design

---

## How It Works 🔧

### AI Code Generation Service

The backend server:

- Receives prompts from the frontend
- Sends them to the LLM via Hugging Face API
- Streams generated tokens back to the UI
- Updates the code block in real time

Example flow:

Frontend → Express Server → Hugging Face API → Streaming Response → UI


---

### Code Execution Engine

Generated code is:

1. Saved to a temporary Python file
2. Executed using Python runtime (`spawn`)
3. Output captured and returned to the frontend
4. Temporary files cleaned automatically

Safety features include:

- Timeout-based execution termination
- Output length protection
- Isolated execution directory

---

## Tech Stack 🛠️

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI Model**: Hugging Face Inference API (LLM-based)
- **Runtime**: Python (code execution)
- **Streaming**: Server-Sent Events (SSE)
- **Syntax Highlighting**: Prism.js
- **Styling**: FontAwesome icons, CSS animations

---

## Technical Highlights 💫

1. **Real-time Streaming**
   - Token-by-token response streaming
   - Live code rendering in the UI
   - Smooth incremental updates

2. **AI Integration**
   - Prompt engineering for clean code output
   - Streaming model output handling
   - Error-resilient response parsing

3. **Execution Safety**
   - Timeout enforcement
   - Output limits
   - Temporary isolated execution environment

4. **User Experience**
   - Interactive chat interface
   - Code editing and re-execution
   - Clipboard integration
   - Responsive layout

---

## Security Considerations 🔒

⚠️ Code execution currently runs locally and is **not fully sandboxed**.

Implemented safeguards:

- Temporary file isolation
- Execution timeout
- Output size limits
- Input validation and error handling

This project is intended for educational and portfolio purposes.

---

## Project Structure 📂

.
├── server.js
├── index.html
├── package.json
├── .env
├── tmp/
└── share/


---

## Future Improvements 🚀

- Multi-language execution (JavaScript, C++, Java)
- Docker-based sandboxing
- Model selection from UI
- Persistent conversation storage
- User authentication

---

## Learning Outcomes 🧠

- Integrating LLM APIs into real applications
- Real-time streaming with SSE
- Frontend ↔ backend communication patterns
- Async programming in Node.js
- Safe handling of user-generated code execution

---

Built with 💻 during and after AISOC Chronos v1.0 as a practical AI engineering project.


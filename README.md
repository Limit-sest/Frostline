# Frostline

A real-time collaborative pixel art whiteboard built with vanilla HTML, CSS, JS, and Socket.IO.

## Features

- **Real-time Collaboration**: Multiple users can draw simultaneously with instant synchronization
- **Drawing Tools**:
  - Pen - Draw freehand pixel art
  - Eraser - Remove pixels
  - Line - Draw straight lines between two points
  - Bucket Fill - Fill connected areas with color
- **Brush Sizes**
- **Different colors**
- **Stickers**: Use pre-made drawings

## Tech Stack

- **Backend**: Node.js with Express and Socket.IO
- **Frontend**: Vanilla JS with HTML5 Canvas

## Installation

1. Clone the repository:

```bash
git clone git@github.com:Limit-sest/Frostline.git
cd Frostline
```

2. Install dependencies:

```bash
bun install
```

## Usage

1. Start the backend server:

```bash
bun run index.ts
```

The server will start on `http://localhost:3000` also serving the html client

2. For development with hot reload, you can use Vite with `bunx vite`

## How It Works

- Server (`index.ts`):
  - Handles WebSocket connections via Socket.IO
  - Maintains canvas state in memory
  - Broadcasts pixel changes to all connected clients
  - Syncs new clients with current canvas state

- Client (`index.html`):
  - HTML5 Canvas for rendering
  - Drawing with tools
  - WebSocket client for communication
  - Optimized batch updates

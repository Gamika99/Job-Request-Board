# Job-Request-Board

A mini service request board where homeowners can post service requests and tradespeople can browse, view details, and manage job status.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Gamika99/Job-Request-Board.git
cd globaltna-job-board

### 2. Backend Setup
cd backend
npm install

Create a .env file
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobboard?retryWrites=true&w=majority

Start the backend server
```bash
npm run dev

### 3. Frontend Setup
cd frontend
npm install

Create a .env.local file
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start the frontend server
```bash
npm run dev
# RAG ChatBot UI

> Making news chat bot with modern web technologies

A modern, intelligent chatbot interface built with React and TypeScript that leverages Retrieval-Augmented Generation (RAG) technology to provide contextual responses about news and current events.

## 🚀 Features

- **🤖 Intelligent Chat Interface** - Clean, responsive chat UI for seamless user interaction
- **📰 News-Focused RAG** - Retrieval-Augmented Generation for accurate, contextual news responses
- **⚡ Real-time Communication** - WebSocket integration for instant messaging
- **🎨 Modern UI/UX** - Built with React 18 and TypeScript for a smooth user experience
- **📱 Responsive Design** - Works seamlessly across desktop, tablet, and mobile devices
- **🔒 User Authentication** - Secure user sessions and personalized chat history

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time bidirectional communication

### Backend Integration
- **Node.js/Express** - RESTful API and WebSocket server
- **MongoDB** - User data and chat history storage
- **Redis** - Session management and caching
- **Vector Database** - Semantic search for news content
- **Google Gemini AI** - Advanced language model integration

## 🏗️ Project Structure

```
RAG-CHATBOT-UI/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Chat/          # Chat interface components
│   │   ├── UI/            # Common UI elements
│   │   └── Layout/        # Layout components
│   ├── pages/             # Application pages/routes
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service functions
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── styles/            # Global styles and themes
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**
- **Backend Server** - Make sure the RAG-CHATBOT-BACKEND is running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tush8788/RAG-CHATBOT-UI.git
   cd RAG-CHATBOT-UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:4000/api
   VITE_GOOGLE_CLIENT_ID = google_client_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production

## 🔧 Configuration

### API Integration

The application communicates with the backend through:

- **REST API** - For user authentication and data fetching
- **WebSocket** - For real-time chat messaging

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:4000/api` |
| `VITE_GOOGLE_CLIENT_ID` | Google client id | `1234hdg7733neu7` |

## 🌟 Key Features Deep Dive

### Chat Interface
- **Message History** - Persistent chat history for 1 hour
- **Typing Indicators** - Real-time typing status

### News Intelligence
- **Contextual Responses** - AI-powered responses based on news data
- **Source Citations** - Links to original news sources
- **Real-time Updates** - Latest news integration
- **Topic Filtering** - Focus on specific news categories

### User Experience
- **Responsive Design** - Mobile-first approach
- **Performance** - Optimized for speed and efficiency

## 🚀 Deployment

### Production (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Production (Netlify)
```bash
npm run build
# Upload dist/ folder to Netlify
```

**Connection Issues**
- Ensure backend server is running
- Check API URLs in environment variables
- Verify CORS settings on backend

## 📚 Related Projects

- [RAG-CHATBOT-BACKEND](https://github.com/tush8788/RAG-CHATBOT-BACKEND) - Backend API and services

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tushar** - [@tush8788](https://github.com/tush8788)

# CodeSage AI - Frontend

AI-Powered Code Review and Developer Portfolio Builder

## Features

- **AI Code Review**: Get instant feedback on your code quality, security, and best practices
- **Developer Portfolio**: Showcase your projects and code reviews
- **Real-time Analytics**: Track your coding progress and improvements
- **Code Editor**: Built-in Monaco editor for seamless code editing
- **Authentication**: Secure user authentication and authorization
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Monaco Editor** - Code editor
- **Chart.js** - Data visualization
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

## Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running (see backend README)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Hillary90/codesage_ai_frontend.git
cd codesage_ai_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=CodeSage AI
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Access at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── layout/      # Layout components (Navbar, Sidebar, Footer)
│   ├── CodeEditor.jsx
│   ├── PortfolioCard.jsx
│   └── ReviewCard.jsx
├── hooks/           # Custom React hooks
├── pages/           # Page components
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── CodeReview.jsx
│   ├── Portfolio.jsx
│   ├── Analytics.jsx
│   ├── Profile.jsx
│   └── Settings.jsx
├── services/        # API services
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

##  Testing

```bash
npm run test
```

##  Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `CodeSage AI` |

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License.

##  Author

**Hillary**
- GitHub: [@Hillary90](https://github.com/Hillary90)

## Acknowledgments

- OpenAI for AI capabilities
- Monaco Editor for code editing
- React community for amazing tools

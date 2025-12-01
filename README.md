# Tetra Pak ESG Assistant

A web-based chat interface for asking questions about Tetra Pak's Environmental, Social, and Governance (ESG) practices, powered by OpenAI's AI agents.

## Team Members
- Anna Pirrelli 3266584
- Sveva Morini 3242739
- Natalia Yasmine Atabaki 3389334
- Nami Macelloni 3252291
- Virginia Valenti 3247223
- Amalia Fernandez 3386094

## Features
- 🌱 Modern ESG-themed design with sustainable color palette
- 💬 Interactive chat interface
- 📄 Sidebar with source documents
- 🤖 AI-powered responses based on Tetra Pak sustainability reports
- 📱 Fully responsive design

## Technology Stack
- **Frontend**: React 18 with Vite
- **Styling**: Custom CSS with gradient designs
- **Icons**: Lucide React
- **Backend**: Vercel Serverless Functions
- **AI**: OpenAI API

## Local Development

### Prerequisites
- Node.js 18+ installed
- OpenAI API key

### Setup Instructions

1. **Clone or download this project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:5173`

## Deployment on Vercel (Recommended)

### Step 1: Prepare Your Code

1. Create a GitHub account if you don't have one: https://github.com
2. Create a new repository
3. Upload all project files to the repository

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign up with your GitHub account
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project

### Step 3: Configure Environment Variables

**IMPORTANT**: Before deploying, add your environment variable:

1. In the Vercel project settings, go to "Environment Variables"
2. Add a new variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environment**: Production (and optionally Preview and Development)
3. Click "Add"

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. Vercel will give you a live URL (like `your-project.vercel.app`)
4. Share this URL with your professors!

### Updating Your Site

Every time you push changes to GitHub, Vercel will automatically rebuild and deploy your site.

## Project Structure

```
tetra-pak-esg-chat/
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Styles
│   └── main.jsx         # React entry point
├── api/
│   └── chat.js          # Serverless API endpoint
├── index.html           # HTML entry point
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── vercel.json          # Vercel configuration
└── README.md            # This file
```

## How It Works

1. User types a question in the chat interface
2. Frontend sends the question to `/api/chat` endpoint
3. Serverless function processes the question using OpenAI API
4. AI classifies if question is ESG-related
5. If ESG-related, routes to appropriate agent (Environmental, Social, or Governance)
6. Response is sent back and displayed in the chat

## Source Documents

The assistant bases its answers on:
- [Tetra Pak Sustainability Report FY24](https://www.tetrapak.com/content/dam/tetrapak/publicweb/gb/en/sustainability/reporting-and-performance-data/TetraPak_Sustainability-Report_FY24.pdf)
- LCA Meta Study (Life Cycle Assessment)

## Customization

### Changing Colors

Edit `src/App.css` to modify the color scheme. Current palette uses sustainable greens:
- Primary: `#2e7d32`
- Secondary: `#388e3c`
- Light: `#e8f5e9`

### Adding More Documents

Edit the `sources` array in `src/App.jsx`:
```javascript
const sources = [
  {
    name: 'Document Name',
    url: 'https://document-url.com/file.pdf'
  }
];
```

## Troubleshooting

### API Not Working
- Check that `OPENAI_API_KEY` is set in Vercel environment variables
- Verify your OpenAI API key is valid and has credits

### Build Fails
- Make sure all dependencies are in `package.json`
- Check Node.js version (should be 18+)

### Styling Issues
- Clear browser cache
- Check if `App.css` is properly imported in `App.jsx`

## Support

For issues or questions, contact any team member listed above.

## License

This project is for educational purposes as part of a university assignment.

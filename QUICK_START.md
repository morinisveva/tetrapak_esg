# 🚀 Quick Start Guide - Tetra Pak ESG Assistant

## ⏱️ Deploy in 10 Minutes

### Step 1: Get Your Files (1 min)
Download all project files to your computer.

### Step 2: GitHub Upload (3 min)
1. Go to https://github.com → Sign up/Login
2. Click "+" → "New repository"
3. Name: `tetra-pak-esg-assistant`
4. Select "Public"
5. Click "Create repository"
6. Click "uploading an existing file"
7. Drag ALL project files
8. Click "Commit changes"

### Step 3: Vercel Deploy (5 min)
1. Go to https://vercel.com → "Sign Up with GitHub"
2. Click "Add New..." → "Project"
3. Find and import `tetra-pak-esg-assistant`
4. **BEFORE clicking Deploy:**
   - Expand "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your-api-key`
   - Select all environments (Production, Preview, Development)
5. Click "Deploy"
6. Wait 2-3 minutes
7. 🎉 Done! Copy your URL

### Step 4: Test (1 min)
Open the URL and ask: "What are Tetra Pak's carbon reduction targets?"

---

## 📁 Project Structure

```
tetra-pak-esg-chat/
├── 📄 README.md                     ← Full documentation (English)
├── 📄 DEPLOYMENT_GUIDE_IT.md        ← Italian step-by-step guide
├── 📄 API_VERSIONS.md               ← Explains simple vs advanced API
├── 📄 EXAMPLE_QUESTIONS.md          ← Test questions for demo
├── 📄 QUICK_START.md                ← This file
│
├── 📁 src/
│   ├── App.jsx                      ← Main React component
│   ├── App.css                      ← Styling (ESG colors)
│   └── main.jsx                     ← React entry point
│
├── 📁 api/
│   ├── chat.js                      ← Simple API (RECOMMENDED ✅)
│   └── chat-advanced.js             ← Advanced multi-agent API
│
├── package.json                     ← Dependencies
├── vite.config.js                   ← Build configuration
├── vercel.json                      ← Deployment settings
├── index.html                       ← HTML entry
├── .gitignore                       ← Git ignore rules
└── .env.example                     ← API key template
```

---

## 🎯 What You Get

### ✅ Features
- Modern ESG-themed design (sustainable greens)
- Real-time chat with AI
- Source documents sidebar
- Team members displayed
- Fully responsive (mobile, tablet, desktop)
- Professional and ready for grading

### 🛠️ Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: Custom CSS
- **Icons**: Lucide React
- **Backend**: Vercel Serverless Functions
- **AI**: OpenAI GPT-4
- **Hosting**: Vercel (free!)

---

## 💰 Cost Estimate

Using the **simple version** (recommended):
- **Vercel hosting**: FREE forever
- **OpenAI API**: ~$0.02 per question
- **Monthly estimate**: 
  - 100 questions = ~$2
  - 500 questions = ~$10
  - 1000 questions = ~$20

**Tip**: Create a separate OpenAI API key just for this project and set a spending limit!

---

## 🐛 Common Issues & Solutions

### "Build failed"
- Check that all files are uploaded
- Verify `package.json` is present
- Try: Delete and re-import project in Vercel

### "API Error" or "500 Internal Server Error"
- Go to Vercel → Settings → Environment Variables
- Verify `OPENAI_API_KEY` is correctly set
- Check OpenAI account has credits
- Redeploy: Deployments → Click "..." → "Redeploy"

### "Response is slow"
- First load is always slower (cold start)
- Normal response time: 2-5 seconds
- If using advanced version: 8-15 seconds

### "Changes not showing"
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Wait for Vercel to finish deploying
- Check Vercel → Deployments → Status should be "Ready"

---

## 📚 Documentation Files

- **README.md**: Complete English documentation
- **DEPLOYMENT_GUIDE_IT.md**: Detailed Italian instructions
- **API_VERSIONS.md**: Technical comparison of API versions
- **EXAMPLE_QUESTIONS.md**: Test questions for your demo
- **QUICK_START.md**: This file - fastest path to deployment

---

## 🎓 For Your Presentation

### What to Show (4 minutes)
1. **Live Demo** (2 min)
   - Ask environmental question
   - Ask social question
   - Ask governance question
   - Show it rejects non-ESG question

2. **Source Integration** (30 sec)
   - Click PDF link in sidebar
   - Show it goes to official Tetra Pak report

3. **Technical Stack** (1 min)
   - React frontend
   - OpenAI GPT-4 backend
   - Multi-agent routing system
   - Deployed on Vercel

4. **Mobile Responsive** (30 sec)
   - Open on phone or resize browser
   - Show it adapts perfectly

### What to Submit
1. **Live URL**: `https://your-project.vercel.app`
2. **GitHub Repo**: `https://github.com/your-username/tetra-pak-esg-assistant`
3. **Screenshots**: 3-4 screenshots showing different questions
4. **Demo Video** (optional): 2-minute screen recording

---

## 🔐 Security Best Practices

### ✅ Do:
- Use environment variables for API key
- Keep `.env` file in `.gitignore`
- Set spending limits on OpenAI account
- Use a separate API key for this project

### ❌ Don't:
- Never commit API keys to GitHub
- Don't share your API key publicly
- Don't use your main OpenAI key

---

## 🆘 Need Help?

### Resources:
1. **Vercel Docs**: https://vercel.com/docs
2. **React Docs**: https://react.dev
3. **OpenAI API Docs**: https://platform.openai.com/docs

### Troubleshooting:
1. Check console logs (F12 in browser)
2. Check Vercel function logs (Deployments → Click deployment → Functions tab)
3. Test API key: https://platform.openai.com/playground

### Emergency Contact:
If nothing works, ask ChatGPT or Claude:
"I'm deploying a React app to Vercel with OpenAI API and getting [error]. Here's my error message: [paste error]"

---

## ✨ Optional Enhancements

If you have extra time:

### Easy:
- Change welcome message in `src/App.jsx`
- Modify colors in `src/App.css`
- Add LCA Meta Study PDF link when found

### Medium:
- Add loading animation
- Add typing indicator
- Add error messages

### Hard:
- Switch to advanced API version
- Add conversation history export
- Add dark mode toggle

---

## 🎉 Final Checklist

Before submission:

- [ ] Site is live on Vercel
- [ ] API key is working (test with a question)
- [ ] All team members' names are displayed
- [ ] PDF link works
- [ ] Mobile version looks good
- [ ] GitHub repo is public
- [ ] Screenshots taken
- [ ] URL shared with professors

---

## 📊 Grading Criteria Alignment

This project demonstrates:

✅ **Technical Skills**
- Full-stack development (React + Node.js)
- API integration (OpenAI)
- Modern deployment (Vercel, GitHub)
- Responsive design

✅ **AI/ML Understanding**
- Prompt engineering
- Multi-agent systems
- Classification and routing
- Natural language processing

✅ **ESG Knowledge**
- Understanding of ESG framework
- Integration with real sustainability reports
- Proper categorization (E, S, G)

✅ **Professional Quality**
- Clean, modern design
- Proper documentation
- Production-ready deployment
- User-friendly interface

---

Good luck with your project! 🍀

Your site will be live at: `https://[your-project-name].vercel.app`

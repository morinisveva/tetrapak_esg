# 🚀 Deploy con il Tuo Codice OpenAI Agents

## ⚠️ Situazione

Il tuo workflow usa `@openai/agents` SDK che NON funziona su Vercel Serverless Functions. Hai bisogno di un server Node.js dedicato.

## 📋 Cosa Serve

1. **Frontend su Vercel** (React - hosting gratuito)
2. **Backend su Render.com** (Node.js - hosting gratuito)

---

## PARTE 1: Deploy Backend (Server Node.js)

### Step 1: Crea Account Render.com

1. Vai su https://render.com
2. Sign up with GitHub
3. Autorizza Render

### Step 2: Prepara il Backend

Sul tuo computer, nella cartella `tetra-pak-esg-chat`:

```bash
# Rinomina il file per il server
mv server-package.json package-server.json

# Crea una nuova cartella per il backend
mkdir backend
cp server.js backend/
cp package-server.json backend/package.json
cp .env.example backend/.env
```

### Step 3: Carica Backend su GitHub

**Opzione A - Stesso Repository (più semplice):**

```bash
cd /Users/svevamorini/Downloads/tetra-pak-esg-chat

git add backend/
git commit -m "Add backend server"
git push origin main
```

**Opzione B - Repository Separato:**

```bash
cd backend
git init
git add .
git commit -m "Initial commit - backend"
git remote add origin https://github.com/morinisveva/tetrapak-backend.git
git push -u origin main
```

### Step 4: Deploy su Render

1. Vai su https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Scegli il repo `tetrapak` (o `tetrapak-backend` se separato)
5. Configurazione:
   - **Name**: `tetrapak-esg-api`
   - **Root Directory**: `backend` (se nel stesso repo) o lascia vuoto
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

6. **Environment Variables** (MOLTO IMPORTANTE):
   Click "Advanced" → Add Environment Variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: La tua chiave OpenAI (sk-...)

7. Click **Create Web Service**

8. **Attendi 5-10 minuti** per il deploy

9. **Copia l'URL** che ti da Render (tipo: `https://tetrapak-esg-api.onrender.com`)

---

## PARTE 2: Aggiorna Frontend per Usare il Nuovo Backend

### Step 1: Modifica il Frontend

Nel file `src/App.jsx`, cambia l'URL dell'API:

```javascript
// PRIMA (non funziona con agents):
const response = await fetch('/api/chat', {

// DOPO (usa il tuo backend Render):
const response = await fetch('https://TUO-BACKEND.onrender.com/api/chat', {
```

Sostituisci `TUO-BACKEND` con l'URL che ti ha dato Render.

### Step 2: Carica su GitHub

```bash
cd /Users/svevamorini/Downloads/tetra-pak-esg-chat

git add src/App.jsx
git commit -m "Update API endpoint to use backend server"
git push origin main
```

### Step 3: Vercel farà Redeploy Automatico

Il frontend si aggiornerà automaticamente in 2-3 minuti.

---

## ✅ Verifica che Funzioni

1. Apri il tuo sito Vercel
2. Fai una domanda
3. Dovrebbe funzionare con i tuoi agenti!

Se vedi errori:
- Apri Console del browser (F12)
- Controlla i log su Render → Logs tab

---

## 💰 Costi

- **Vercel (Frontend)**: GRATUITO
- **Render (Backend)**: GRATUITO
  - ⚠️ Nota: Il piano gratuito di Render "dorme" dopo 15 minuti di inattività
  - La prima richiesta dopo il "sonno" impiega 30-60 secondi
  - Richieste successive sono veloci

- **OpenAI API**: Paghi solo l'uso
  - Con gpt-4o-mini: ~$0.001-0.002 per domanda (MOLTO economico!)

---

## 🐛 Problemi Comuni

### "Cannot find module '@openai/agents'"

Render non ha installato le dipendenze. Controlla:
1. `package.json` è nella root della cartella backend
2. Build Command è `npm install`
3. Guarda i logs di build

### "OpenAI API Error"

1. Verifica Environment Variable su Render
2. Controlla che la chiave inizi con `sk-`
3. Verifica credits su OpenAI

### "Service Unavailable" o "Timeout"

Il server Render si sta "svegliando". Aspetta 60 secondi e riprova.

### Backend "dorme" troppo spesso

Puoi:
- **Opzione A**: Usare un servizio ping (es. UptimeRobot) per mantenerlo sveglio
- **Opzione B**: Passare a Render paid plan ($7/mese)
- **Opzione C**: Usare Railway.app (più veloce, 500h gratis/mese)

---

## 🔄 Alternative a Render

Se Render non funziona o è troppo lento:

### Railway.app (CONSIGLIATO)
- Più veloce
- 500 ore gratis/mese
- Non dorme
- Deploy: https://railway.app

### Fly.io
- Ottimo per Node.js
- 3 macchine gratis
- Deploy: https://fly.io

### Heroku
- Classico ma robusto
- $5/mese (no piano free)
- Deploy: https://heroku.com

---

## 📝 Checklist Finale

- [ ] Backend deployato su Render
- [ ] Environment variable `OPENAI_API_KEY` configurata
- [ ] URL backend copiato
- [ ] Frontend aggiornato con nuovo URL
- [ ] Push su GitHub fatto
- [ ] Sito testato e funzionante

---

## 🎯 Struttura Finale

```
GitHub Repo (tetrapak)
├── src/              → Frontend React
├── api/              → (non più usato)
├── backend/          → Server Node.js con agents
│   ├── server.js
│   └── package.json
├── package.json      → Frontend
└── vercel.json

Vercel (Frontend)
└── https://tetrapak.vercel.app

Render (Backend)
└── https://tetrapak-esg-api.onrender.com
```

---

## ⚡ Quick Start (se hai fretta)

1. **Deploy Backend**:
   ```bash
   cd backend
   # Carica su un nuovo repo GitHub
   # Deploy su Render.com con OPENAI_API_KEY
   ```

2. **Aggiorna Frontend**:
   ```javascript
   // In src/App.jsx, cambia:
   fetch('https://IL-TUO-BACKEND.onrender.com/api/chat', ...)
   ```

3. **Push e Done!**

---

Fammi sapere quando hai fatto il deploy su Render e ti aiuto a collegare tutto! 🚀

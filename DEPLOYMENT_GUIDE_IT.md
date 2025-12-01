# Guida al Deployment - Tetra Pak ESG Assistant

## 📋 Cosa ti serve

1. Un account GitHub (gratuito)
2. Un account Vercel (gratuito)
3. La tua chiave API di OpenAI
4. Questi file del progetto

## 🚀 Passo 1: Caricare il codice su GitHub

### 1.1 Crea un account GitHub
- Vai su https://github.com
- Clicca "Sign up" e completa la registrazione

### 1.2 Crea un nuovo repository
1. Una volta loggato, clicca il pulsante "+" in alto a destra
2. Seleziona "New repository"
3. Nome del repository: `tetra-pak-esg-assistant` (o come preferisci)
4. Seleziona "Public" (così i professori possono vedere il codice)
5. Clicca "Create repository"

### 1.3 Carica i file
Hai due opzioni:

**Opzione A - Via Web (più semplice):**
1. Nella pagina del repository, clicca "uploading an existing file"
2. Trascina TUTTI i file e le cartelle del progetto
3. Scrivi un messaggio tipo "Initial commit"
4. Clicca "Commit changes"

**Opzione B - Via Git (se hai familiarità):**
```bash
cd tetra-pak-esg-chat
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TUO-USERNAME/tetra-pak-esg-assistant.git
git push -u origin main
```

## 🌐 Passo 2: Deploy su Vercel

### 2.1 Crea un account Vercel
1. Vai su https://vercel.com
2. Clicca "Sign Up"
3. Scegli "Continue with GitHub"
4. Autorizza Vercel ad accedere al tuo GitHub

### 2.2 Importa il progetto
1. Nella dashboard di Vercel, clicca "Add New..."
2. Seleziona "Project"
3. Trova il repository `tetra-pak-esg-assistant`
4. Clicca "Import"

### 2.3 Configura il progetto
Vercel rileverà automaticamente che è un progetto Vite. NON cliccare ancora "Deploy"!

### 2.4 Aggiungi la variabile d'ambiente (IMPORTANTE!)
1. Scorri verso il basso fino a "Environment Variables"
2. Clicca per espandere la sezione
3. Aggiungi la variabile:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Incolla qui la tua chiave API di OpenAI (inizia con `sk-...`)
   - Seleziona "Production", "Preview", e "Development"
4. Clicca "Add"

### 2.5 Deploy!
1. Clicca il pulsante "Deploy"
2. Aspetta 2-3 minuti mentre Vercel costruisce il sito
3. 🎉 Quando vedi i coriandoli, è fatto!

### 2.6 Ottieni il link
1. Vercel ti mostrerà un link tipo `https://tetra-pak-esg-assistant.vercel.app`
2. Clicca sul link per vedere il sito live
3. Copia questo URL per condividerlo

## ✅ Verifica che funzioni

1. Apri il link del sito
2. Prova a scrivere una domanda tipo: "What are Tetra Pak's carbon reduction targets?"
3. Dovresti ricevere una risposta dall'AI

Se non funziona, vedi la sezione "Problemi comuni" sotto.

## 🔄 Aggiornare il sito

Ogni volta che modifichi il codice e lo carichi su GitHub:
1. Vercel rileverà automaticamente le modifiche
2. Ricostruirà il sito
3. Aggiornerà il link (stesso URL, nuova versione)

## 🎯 Cosa consegnare ai professori

1. **Link al sito live**: `https://tuo-progetto.vercel.app`
2. **Link al codice GitHub**: `https://github.com/tuo-username/tetra-pak-esg-assistant`
3. **Screenshot** del sito funzionante con alcune domande e risposte

## ❗ Problemi comuni

### "API key not valid"
- Verifica che la chiave API sia corretta in Vercel
- Vai su Settings → Environment Variables → Modifica la variabile
- Dopo aver modificato, clicca "Redeploy" nella tab Deployments

### "Internal Server Error"
- Controlla i log in Vercel: vai su Deployments → click sul deployment → Functions
- Verifica che la chiave API abbia crediti disponibili su OpenAI

### Il sito non si carica
- Aspetta qualche minuto dopo il deploy
- Svuota la cache del browser (Ctrl+F5 o Cmd+Shift+R)
- Verifica su https://vercel.com che il deploy sia completato con successo

### Le modifiche non si vedono
- Controlla che le modifiche siano su GitHub
- Vai su Vercel → Deployments e verifica che un nuovo deploy sia partito
- Aspetta che il deploy sia completato (status: Ready)

## 📱 Test su mobile

Il sito è responsive! Prova ad aprirlo su:
- Computer (Chrome, Firefox, Safari)
- Tablet
- Smartphone

## 💡 Suggerimenti per la presentazione

1. **Prepara domande di esempio** che funzionano bene:
   - "What are Tetra Pak's main environmental initiatives?"
   - "How does Tetra Pak ensure worker safety?"
   - "What is Tetra Pak's governance structure for sustainability?"

2. **Mostra i documenti fonte** cliccando sul link nella sidebar

3. **Spiega il workflow**:
   - L'AI classifica se la domanda è ESG-related
   - Poi la indirizza all'agente appropriato (E, S, o G)
   - Risponde usando i report ufficiali

4. **Evidenzia il design sostenibile**:
   - Colori verdi richiamano la sostenibilità
   - Layout pulito e moderno
   - Responsive su tutti i dispositivi

## 🆘 Bisogno di aiuto?

Se hai problemi:
1. Controlla questa guida per la soluzione
2. Guarda i log in Vercel (molto utili!)
3. Verifica su OpenAI che la chiave API sia valida
4. Chiedi a ChatGPT o Claude descrivendo l'errore che vedi

## ✨ Extra: Personalizzazioni facili

### Cambiare i colori
Modifica `src/App.css` - cerca i colori tipo `#2e7d32` e sostituiscili

### Aggiungere il secondo PDF
Quando trovi il link al LCA Meta Study, modifica in `src/App.jsx`:
```javascript
{
  name: 'LCA Meta Study',
  url: 'https://link-al-pdf.com/file.pdf'  // Aggiungi qui il link
}
```

### Modificare il messaggio di benvenuto
In `src/App.jsx`, cerca:
```javascript
const [messages, setMessages] = useState([
  {
    role: 'assistant',
    content: 'Qui metti il tuo messaggio personalizzato...'
  }
]);
```

Buona fortuna con il progetto! 🍀

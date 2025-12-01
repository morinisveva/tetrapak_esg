# API Versions Comparison

## Overview

Il progetto include due versioni dell'API backend. Entrambe funzionano, ma hanno approcci diversi.

## Version 1: api/chat.js (Simple Version) ✅ CONSIGLIATA PER IL PROGETTO

### Vantaggi
- ✅ **Più semplice** da capire e debuggare
- ✅ **Più economica** (meno chiamate API = meno costi)
- ✅ **Più veloce** (una sola chiamata a OpenAI)
- ✅ **Già configurata** e pronta all'uso

### Come funziona
1. Riceve la domanda dell'utente
2. Invia tutto in una singola chiamata a GPT-4
3. GPT-4 ha le istruzioni per classificare e rispondere
4. Ritorna la risposta

### Quando usarla
- Per il progetto universitario (è già quella attiva!)
- Quando vuoi un sistema funzionante rapidamente
- Quando il budget OpenAI è limitato

### File coinvolti
- `api/chat.js` (già configurato in vercel.json)

---

## Version 2: api/chat-advanced.js (Multi-Agent System)

### Vantaggi
- ✅ **Più fedele** al workflow originale di OpenAI Playground
- ✅ **Più precisa** nella classificazione
- ✅ **Simula il sistema multi-agente** (ESG_related → Hyde → E,S,G → specialist)

### Come funziona
1. **Step 1**: Classifica se la domanda è ESG-related (0 o 1)
2. **Step 2**: Se sì, migliora la query con HyDE
3. **Step 3**: Classifica in Environmental (1), Social (2), o Governance (3)
4. **Step 4**: Usa le istruzioni dello specialista appropriato
5. **Step 5**: Genera la risposta finale

### Svantaggi
- ❌ **Più costosa** (4-5 chiamate API per domanda invece di 1)
- ❌ **Più lenta** (ogni step richiede tempo)
- ❌ **Più complessa** da debuggare

### Quando usarla
- Se vuoi dimostrare il workflow esatto di OpenAI Playground
- Se hai budget OpenAI sufficiente
- Se la precisione massima è più importante della velocità

### Come attivarla
Se vuoi usare questa versione invece di quella semplice:

1. Rinomina `api/chat.js` in `api/chat-simple.js`
2. Rinomina `api/chat-advanced.js` in `api/chat.js`
3. Fai il commit e push su GitHub
4. Vercel farà automaticamente il redeploy

---

## Differenze tecniche

| Aspetto | Simple | Advanced |
|---------|--------|----------|
| **Chiamate API per domanda** | 1 | 4-5 |
| **Costo medio per domanda** | ~$0.02 | ~$0.08-0.10 |
| **Tempo di risposta** | 2-5 sec | 8-15 sec |
| **Fedeltà al workflow** | Media | Alta |
| **Facilità di debug** | Alta | Media |
| **Qualità risposte** | Molto buona | Eccellente |

---

## Cosa manca rispetto al workflow originale?

Il tuo workflow originale usa queste funzionalità avanzate che richiederebbero l'SDK `@openai/agents`:

1. **File Search con Vector Store**: Il tuo `vs_691f2b9a56948191a950830483fe9d90`
2. **Guardrails**: Moderation, Jailbreak detection, PII filtering
3. **Reasoning effort levels**: low/medium/high
4. **Agent tracing**: Per debugging avanzato

### Perché non sono implementate?

- `@openai/agents` è una libreria che funziona con Node.js backend
- Vercel Serverless Functions hanno limitazioni
- Per un progetto universitario, la versione semplificata è più che sufficiente

### Vorresti implementarle?

Se il progetto lo richiede, possiamo:

**Opzione A**: Usare il Vector Store API per il file search reale
- Più complesso ma più fedele
- Richiede più codice e configurazione

**Opzione B**: Pre-caricare i PDF e usare embeddings
- Sistema alternativo che simula il file search
- Più indipendente dalla struttura OpenAI

**Opzione C**: Restare con la versione attuale
- ✅ Già funzionante e professionale
- ✅ Perfettamente adeguata per un progetto universitario
- ✅ Dimostra comprensione di AI, React, e deployment

---

## Raccomandazione

**Per il vostro progetto universitario: USATE LA VERSIONE SEMPLICE (chat.js)**

Motivi:
1. È già configurata e funziona
2. Risponde accuratamente alle domande ESG
3. Costa molto meno (importante se state condividendo l'API key)
4. È più veloce per l'utente
5. È più facile da spiegare ai professori

La versione advanced è disponibile se volete sperimentare, ma non è necessaria per ottenere un ottimo voto!

---

## Come testare entrambe localmente

Se volete provare entrambe:

```bash
# Test versione simple
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are Tetra Pak carbon reduction targets?"}'

# Test versione advanced (dopo aver rinominato il file)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are Tetra Pak carbon reduction targets?"}'
```

Confrontate tempo di risposta e qualità!

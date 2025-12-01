# 🎨 Anteprima Visiva del Sito

## Layout Generale

```
┌─────────────────────────────────────────────────────────────────┐
│  🍃 Tetra Pak ESG Assistant      Team: Anna • Sveva • Natalia  │
│                                  • Nami • Virginia • Amalia     │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                   │
│   SIDEBAR    │              CHAT AREA                           │
│              │                                                   │
│ 📄 Sources   │  ┌──────────────────────────────────────────┐   │
│              │  │ 🤖 Welcome to the Tetra Pak ESG         │   │
│ • Report FY24│  │    Assistant. Ask me anything...         │   │
│   (clickable)│  └──────────────────────────────────────────┘   │
│              │                                                   │
│ • LCA Study  │  ┌──────────────────────────────────────────┐   │
│   (text only)│  │ 👤 What are Tetra Pak's carbon          │   │
│              │  │    reduction targets?                     │   │
│              │  └──────────────────────────────────────────┘   │
│              │                                                   │
│ ℹ️ Info      │  ┌──────────────────────────────────────────┐   │
│ This AI uses │  │ 🤖 Tetra Pak has set ambitious targets...│   │
│ official     │  │    -54% emissions vs 2019, 94% renewable │   │
│ reports...   │  │    electricity...                         │   │
│              │  └──────────────────────────────────────────┘   │
│              │                                                   │
│              │  ┌────────────────────────────────────┬──────┐   │
│              │  │ Ask about Tetra Pak's ESG...      │ [→] │   │
│              │  └────────────────────────────────────┴──────┘   │
└──────────────┴──────────────────────────────────────────────────┘
```

## Palette Colori 🎨

### Primary Colors
- **Verde Principale**: #2e7d32 (Sustainable Green)
- **Verde Secondario**: #388e3c (Forest Green)
- **Verde Chiaro**: #66bb6a (Fresh Green)

### Neutral Colors
- **Background**: #f5f7f5 (Off-white with green tint)
- **Card Background**: #ffffff (Pure white)
- **Border**: #e8f5e9 (Very light green)

### Accent Colors
- **Hover**: #81c784 (Light green for hover states)
- **Text Primary**: #1b5e20 (Dark green)
- **Text Secondary**: #558b2f (Medium green)

### Gradients
- **Header**: Linear gradient from #2e7d32 to #388e3c
- **Button**: Linear gradient from #2e7d32 to #43a047
- **Background**: Subtle gradient from #e8f5e9 to #f1f8f4

## Componenti Dettagliati

### 1. Header (Top Bar)
```
┌─────────────────────────────────────────────────────────────┐
│ 🍃 Tetra Pak ESG Assistant                                  │
│                                                              │
│ Team Members: Anna Pirrelli 3266584 • Sveva Morini 3242739 │
│ • Natalia Yasmine Atabaki 3389334 • Nami Macelloni 3252291 │
│ • Virginia Valenti 3247223 • Amalia Fernandez 3386094      │
└─────────────────────────────────────────────────────────────┘
```
- **Sfondo**: Verde gradiente (#2e7d32 → #388e3c)
- **Testo**: Bianco
- **Altezza**: 80-100px
- **Logo**: Icona foglia (🍃) 32x32px
- **Font**: Inter Bold per il titolo, Regular per i nomi

---

### 2. Sidebar (320px width)
```
┌────────────────────┐
│ 📄 Source Documents│
├────────────────────┤
│                    │
│ ┌────────────────┐ │
│ │ 📄 Tetra Pak  │ │
│ │ Sustainability │ │
│ │ Report FY24   │ │
│ │ [clickable]    │ │
│ └────────────────┘ │
│                    │
│ ┌────────────────┐ │
│ │ 📄 LCA Meta   │ │
│ │ Study         │ │
│ │ [not linked]  │ │
│ └────────────────┘ │
│                    │
├────────────────────┤
│ ℹ️ This assistant  │
│ uses AI to answer │
│ questions...      │
└────────────────────┘
```
- **Sfondo**: Bianco
- **Bordi**: Grigio chiaro (#e0e0e0)
- **Cards**: Sfondo #f8fdf9, bordo #c8e6c9
- **Hover**: Trasla leggermente a destra con ombra
- **Footer**: Sfondo #f8fdf9

---

### 3. Chat Messages

**Assistant Message (Left-aligned)**
```
┌────────────────────────────────────────────┐
│ Tetra Pak has achieved 94% renewable      │
│ electricity in operations and reduced     │
│ emissions by 54% compared to 2019...      │
└────────────────────────────────────────────┘
```
- **Sfondo**: #f1f8f4 (verde chiarissimo)
- **Bordo**: #e8f5e9
- **Testo**: #1b5e20 (verde scuro)
- **Padding**: 1rem 1.25rem
- **Border-radius**: 12px (con 4px bottom-left)
- **Max-width**: 70% dello schermo

**User Message (Right-aligned)**
```
                ┌────────────────────────────┐
                │ What are Tetra Pak's      │
                │ carbon reduction targets? │
                └────────────────────────────┘
```
- **Sfondo**: Gradiente verde (#2e7d32 → #43a047)
- **Testo**: Bianco
- **Padding**: 1rem 1.25rem
- **Border-radius**: 12px (con 4px bottom-right)
- **Max-width**: 70% dello schermo

---

### 4. Input Area (Bottom)
```
┌────────────────────────────────────────────────┬────┐
│ Ask about Tetra Pak's ESG practices...        │ [→]│
└────────────────────────────────────────────────┴────┘
```
- **Sfondo**: Gradiente bianco → #f8fdf9
- **Input field**:
  - Bordo: #c8e6c9 (2px)
  - Focus: #66bb6a con ombra
  - Border-radius: 24px (fully rounded)
  - Padding: 0.875rem 1.25rem
- **Send button**:
  - Circolare (border-radius: 50%)
  - Sfondo: Gradiente verde
  - Icona: Aeroplano (→)
  - Hover: Scale 1.05 con ombra

---

### 5. Loading Animation
```
●  ●  ●  (animazione bounce)
```
- **Colore**: #66bb6a
- **Dimensione**: 8px per pallino
- **Animazione**: Bounce infinite
- **Timing**: Sfalsato per effetto onda

---

## Responsive Breakpoints

### Desktop (>1024px)
```
┌──────────┬────────────────────────────────┐
│ Sidebar  │      Chat Area (wide)         │
│ (320px)  │                                │
└──────────┴────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────┬──────────────────────────────┐
│ Sidebar │    Chat Area (medium)       │
│ (280px) │                              │
└─────────┴──────────────────────────────┘
```

### Mobile (<768px)
```
┌────────────────────────────┐
│      Sidebar               │
│      (collapsed, 200px)    │
├────────────────────────────┤
│      Chat Area             │
│      (full width)          │
│                            │
│                            │
└────────────────────────────┘
```

---

## Animazioni e Transizioni

### 1. Message Fade In
```
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
Duration: 0.3s
```

### 2. Button Hover
```
Scale: 1.05
Box-shadow: 0 4px 12px rgba(46, 125, 50, 0.4)
Duration: 0.2s
```

### 3. Source Card Hover
```
Transform: translateX(4px)
Box-shadow: 0 2px 8px rgba(46, 125, 50, 0.1)
Duration: 0.2s
```

### 4. Loading Dots
```
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40%           { transform: scale(1); opacity: 1; }
}
Duration: 1.4s infinite
```

---

## Typography

### Fonts
- **Primary**: Inter (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

### Font Sizes
- **H1 (Logo)**: 1.5rem (24px)
- **H2 (Sidebar Title)**: 1.125rem (18px)
- **Body Text**: 0.95rem (15.2px)
- **Small Text**: 0.875rem (14px)
- **Tiny Text**: 0.8rem (12.8px)

### Line Heights
- **Headers**: 1.2
- **Body**: 1.6
- **Compact**: 1.4

---

## Iconografia

Tutte le icone da **Lucide React**:
- 🍃 **Leaf**: Logo (32px)
- 📄 **FileText**: Documenti (20px, 16px)
- ✉️ **Send**: Pulsante invio (20px)

---

## Stati Interattivi

### Hover States
- **Links**: Colore più chiaro + traslazione
- **Buttons**: Scale + ombra
- **Cards**: Ombra sottile

### Focus States
- **Input**: Bordo evidenziato + ombra
- **Buttons**: Outline accessibility

### Disabled States
- **Opacity**: 0.5
- **Cursor**: not-allowed
- **Background**: Grigio

### Active States
- **Buttons**: Scale 0.95 (pressed effect)

---

## Accessibilità ♿

- ✅ Contrasto colori WCAG AA compliant
- ✅ Focus visible su tutti gli elementi interattivi
- ✅ Semantic HTML (header, main, aside, form)
- ✅ Alt text su icone decorative
- ✅ Aria-labels dove necessario
- ✅ Keyboard navigation supportata

---

## Performance

### Ottimizzazioni
- ✅ CSS Lazy loading
- ✅ Font preconnect a Google Fonts
- ✅ Immagini ottimizzate (SVG per icone)
- ✅ Code splitting (React)
- ✅ Lazy loading components

### Lighthouse Score Target
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

---

## Design Philosophy

### Principles
1. **Sustainability First**: Colori verdi, naturali, organici
2. **Clean & Modern**: Spazi bianchi generosi, layout ordinato
3. **User-Friendly**: Interfaccia intuitiva, zero learning curve
4. **Professional**: Adatto a presentazione universitaria
5. **Responsive**: Perfetto su ogni dispositivo

### Inspiration
- Material Design (Google)
- ESG Reports UI patterns
- Modern SaaS applications
- Sustainability-focused brands

---

Questo design è stato creato per essere:
- ✅ **Visivamente attraente** per impressionare i professori
- ✅ **Funzionalmente efficace** per l'uso reale
- ✅ **Tecnicamente solido** per dimostrare competenze
- ✅ **Tematicamente appropriato** per un progetto ESG

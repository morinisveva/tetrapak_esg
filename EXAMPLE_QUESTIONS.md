# Example Questions to Test

## 🌍 Environmental Questions (Will route to Environmental Agent)

### Climate & Emissions
- "What are Tetra Pak's carbon reduction targets?"
- "How much renewable electricity does Tetra Pak use?"
- "What is Tetra Pak's scope 1, 2, and 3 emissions strategy?"
- "How has Tetra Pak reduced its greenhouse gas emissions?"

### Circularity & Recycling
- "What is Tetra Pak's global recycling rate?"
- "How much does Tetra Pak invest in collection and recycling?"
- "What materials are Tetra Pak cartons made from?"
- "How does Tetra Pak support circular economy?"
- "What are Tetra Pak's packaging innovation initiatives?"

### Nature & Biodiversity
- "What is Tetra Pak doing for biodiversity?"
- "How does Tetra Pak manage water resources?"
- "What are Tetra Pak's nature-based solutions?"

### LCA & Comparisons
- "How do Tetra Pak cartons compare to plastic bottles environmentally?"
- "What is the carbon footprint of Tetra Pak packaging?"
- "How does Tetra Pak perform life cycle assessments?"

---

## 👥 Social Questions (Will route to Social Agent)

### Employees
- "What is Tetra Pak's employee engagement rate?"
- "How does Tetra Pak ensure workplace safety?"
- "What is TRAR and how has it improved?"
- "What diversity and inclusion initiatives does Tetra Pak have?"

### Community & Food Access
- "How many children benefit from Tetra Pak's school feeding programs?"
- "What does Tetra Pak do for food security?"
- "How does Tetra Pak support local communities?"

### Supply Chain
- "How does Tetra Pak address human rights in its supply chain?"
- "What is Tetra Pak doing for smallholder farmers?"
- "How many farmers does Tetra Pak support through Dairy Hubs?"

### Workers
- "What does Tetra Pak do for informal waste collection workers?"
- "How does Tetra Pak ensure fair working conditions?"

---

## 🏛️ Governance Questions (Will route to Governance Agent)

### Strategy & Structure
- "What is Tetra Pak's sustainability governance structure?"
- "How is sustainability integrated into Tetra Pak's business strategy?"
- "What is Strategy 2030?"
- "Who is responsible for sustainability at Tetra Pak?"

### Materiality & Reporting
- "What is double materiality and how does Tetra Pak apply it?"
- "What are Tetra Pak's material ESG topics?"
- "How does Tetra Pak report on sustainability?"
- "Is Tetra Pak aligned with ESRS standards?"

### Ethics & Compliance
- "What is Tetra Pak's approach to business conduct?"
- "How does Tetra Pak prevent corruption?"
- "What ethics policies does Tetra Pak have?"

### Stakeholder Engagement
- "How does Tetra Pak engage with stakeholders on ESG?"
- "What is the Sustainability Advisory Panel?"
- "How are ESG metrics tied to executive compensation?"

---

## ❌ Non-ESG Questions (Should be rejected)

These questions should get a polite rejection saying they're not ESG-related:

- "What is Tetra Pak's stock price?"
- "How much revenue did Tetra Pak make last quarter?"
- "What is the recipe for a good smoothie?"
- "Who is the CEO of Tetra Pak?" (unless framing it as governance)
- "What color are Tetra Pak cartons?" (unless framing as packaging/materials)
- "How do I apply for a job at Tetra Pak?"

---

## 💡 Complex Questions (Good for demonstrating capabilities)

- "How does Tetra Pak balance environmental performance with social responsibility?"
- "What is the relationship between Tetra Pak's circular economy strategy and its carbon reduction targets?"
- "How does Tetra Pak's governance structure support its environmental and social goals?"
- "Compare Tetra Pak's approach to the three pillars of ESG"

---

## 🎯 Questions for Live Demo / Presentation

### Quick & Impressive
1. "What percentage of renewable electricity does Tetra Pak use?" 
   → Should get: 94%

2. "How many children benefit from school feeding programs?"
   → Should get: 66 million

3. "What is Tetra Pak's employee engagement rate?"
   → Should get: 87%

### Show the Routing System
1. Ask an Environmental question → Watch it classify and respond
2. Ask a Social question → Show it routes differently
3. Ask a Governance question → Demonstrate the third category
4. Ask a non-ESG question → Show it politely rejects

### Show Source Integration
- Ask: "Where can I find more details about Tetra Pak's climate strategy?"
- The assistant should reference the FY24 report
- You can then click the sidebar link to show the actual PDF

---

## 📊 Questions by Difficulty

### Easy (Direct Facts)
- "What is Tetra Pak's recycling rate?"
- "How much renewable electricity does Tetra Pak use?"
- "What is TRAR?"

### Medium (Requires Context)
- "How does Tetra Pak support circular economy?"
- "What is Tetra Pak's approach to biodiversity?"
- "How does Tetra Pak engage stakeholders?"

### Hard (Multi-faceted)
- "Explain Tetra Pak's value chain approach to sustainability"
- "How does Tetra Pak's governance enable its environmental goals?"
- "What is the relationship between Tetra Pak's material topics and its strategy?"

---

## ⚠️ Edge Cases to Test

### Ambiguous Questions
- "Tell me about Tetra Pak's targets" → Should ask which type (climate, recycling, etc.)
- "What about emissions?" → Should provide comprehensive emissions info

### Mixed Categories
- "How does Tetra Pak's governance address climate change?" → Governance + Environment
- "What worker protections exist in Tetra Pak's supply chain?" → Social + Governance

### Out of Scope
- Questions about competitors
- Questions about specific products not mentioned in reports
- Questions about future plans beyond stated targets

---

## 📝 Tips for Testing

1. **Start with simple questions** to verify basic functionality
2. **Test each category** (E, S, G) to show routing works
3. **Ask follow-up questions** to test conversation continuity
4. **Try non-ESG questions** to show the filter works
5. **Test on mobile** to show responsive design

## 🎬 Suggested Demo Flow

1. **Introduction** (30 seconds)
   - Show the homepage
   - Explain the source documents in sidebar
   - Point out team members in header

2. **Environmental Demo** (1 minute)
   - "What are Tetra Pak's carbon reduction targets?"
   - "How does this compare to industry standards?" (follow-up)
   - Click on FY24 report link to show source

3. **Social Demo** (1 minute)
   - "How does Tetra Pak support employee wellbeing?"
   - "What about community impact?"

4. **Governance Demo** (30 seconds)
   - "How is sustainability governed at Tetra Pak?"

5. **Show Intelligence** (30 seconds)
   - Ask a non-ESG question
   - Show it politely rejects

6. **Conclusion** (30 seconds)
   - Highlight responsive design on mobile
   - Mention the tech stack (React, OpenAI, Vercel)
   - Show GitHub repo with code

Total: ~4 minutes

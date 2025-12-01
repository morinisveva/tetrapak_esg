// Test script to check if gpt-5-nano is available with your API key

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testGPT5Nano() {
  console.log('🔍 Testing GPT-5 Nano availability...\n');
  
  try {
    console.log('Attempting to use gpt-5-nano...');
    const response = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      messages: [
        { role: 'user', content: 'Test message' }
      ],
      max_tokens: 10
    });
    
    console.log('✅ SUCCESS! GPT-5 Nano is available!');
    console.log('Response:', response.choices[0].message.content);
    console.log('\nYou can use gpt-5-nano in your agents! 🎉');
    
  } catch (error) {
    console.log('❌ GPT-5 Nano is NOT available');
    console.log('Error:', error.message);
    
    if (error.message.includes('does not exist')) {
      console.log('\n📝 Available alternatives:');
      console.log('  - gpt-4o-mini (most economical, recommended)');
      console.log('  - gpt-4o');
      console.log('  - gpt-4-turbo');
      console.log('  - gpt-4');
      console.log('  - gpt-3.5-turbo');
    }
  }
  
  // Also test gpt-4o-mini for comparison
  console.log('\n---\n');
  console.log('🔍 Testing gpt-4o-mini (recommended alternative)...\n');
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: 'Test message' }
      ],
      max_tokens: 10
    });
    
    console.log('✅ gpt-4o-mini is available and working!');
    console.log('Response:', response.choices[0].message.content);
    
  } catch (error) {
    console.log('❌ Error with gpt-4o-mini:', error.message);
  }
}

testGPT5Nano();

const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: 'sk-LIs2MGKmDuGZhcfHbvLs1EiWHPwm2ELf3E8JkJXlFXgFLPBM',
  baseURL: 'https://once.novai.su/v1',
});

async function test() {
  try {
    console.log('Testing Nova AI API with new endpoint...');
    console.log('Base URL: https://once.novai.su/v1');
    console.log('Model: [逆次]o4-mini');
    
    const completion = await client.chat.completions.create({
      model: '[逆次]o4-mini',
      messages: [
        { role: 'user', content: '你好，请回复"测试成功"' }
      ],
      max_tokens: 50,
    });
    
    console.log('\n✅ Success!');
    console.log('Response:', completion.choices[0].message.content);
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('Message:', error.message);
    console.error('Type:', error.constructor.name);
    if (error.status) console.error('Status:', error.status);
  }
}

test();

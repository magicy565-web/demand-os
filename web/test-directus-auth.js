const fetch = require('node-fetch');

async function testDirectusAuth() {
  try {
    // Step 1: Login to get a fresh token
    console.log('🔐 Logging in to Directus...');
    const loginResponse = await fetch('https://admin.cnsubscribe.xyz/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'magic@gmail.com',
        password: 'wysk1214'
      })
    });

    const loginData = await loginResponse.json();
    
    if (loginData.errors) {
      console.error('❌ Login failed:', loginData.errors);
      return;
    }

    console.log('✅ Login successful!');
    const token = loginData.data.access_token;
    console.log('🔑 Token:', token.substring(0, 20) + '...');

    // Step 2: Test fetching factories
    console.log('\n📦 Fetching factories...');
    const factoriesResponse = await fetch('https://admin.cnsubscribe.xyz/items/factories?limit=3', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const factoriesData = await factoriesResponse.json();
    
    if (factoriesData.errors) {
      console.error('❌ Fetch failed:', factoriesData.errors);
      return;
    }

    console.log('✅ Factories fetched successfully!');
    console.log('📊 Total factories:', factoriesData.data.length);
    console.log('\n🏭 Sample factories:');
    factoriesData.data.forEach((factory, index) => {
      console.log(`  ${index + 1}. ${factory.name || factory.factory_name || 'Unknown'}`);
    });

  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

testDirectusAuth();

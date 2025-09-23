const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

console.log('🔍 Environment Check');
console.log('===================');
console.log('Current working directory:', process.cwd());
console.log('Script directory:', __dirname);
console.log('.env path:', path.join(__dirname, '../.env'));
console.log('MONGODB_URL exists:', !!process.env.MONGODB_URL);
console.log('MONGODB_URL value:', process.env.MONGODB_URL ? 'Set (hidden for security)' : 'Not set');

if (!process.env.MONGODB_URL) {
  console.log('\n❌ MONGODB_URL is not set!');
  console.log('Please make sure you have a .env file in your project root with:');
  console.log('MONGODB_URL=your_mongodb_connection_string');
} else {
  console.log('\n✅ MONGODB_URL is properly configured');
}

// Check if .env file exists
const fs = require('fs');
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
} else {
  console.log('❌ .env file not found at:', envPath);
}

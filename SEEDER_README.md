# Database Seeder Documentation

This project includes a comprehensive database seeding system to populate your MongoDB database with sample data for development and testing purposes.

## 📁 File Structure

```
├── scripts/
│   ├── seed.js              # Simple JavaScript seeder
│   ├── seed.ts              # TypeScript seeder
│   └── advanced-seed.ts     # Advanced TypeScript seeder with options
├── seeds/
│   ├── users.json          # Sample user data
│   └── prompts.json        # Sample prompt data
```

## 🚀 Quick Start

### Prerequisites

1. Make sure your `.env` file contains a valid `MONGODB_URL`
2. Install dependencies: `npm install`

### Basic Usage

```bash
# Run the simple seeder (recommended for most cases)
npm run seed

# Run TypeScript version
npm run seed:ts

# Run advanced seeder with all options
npm run seed:advanced
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run seed` | Simple JavaScript seeder - clears DB and seeds all data |
| `npm run seed:ts` | TypeScript version of basic seeder |
| `npm run seed:advanced` | Advanced seeder with full options |
| `npm run seed:users` | Seed only users |
| `npm run seed:prompts` | Seed only prompts (requires existing users) |
| `npm run seed:clear` | Seed without clearing existing data |

## 📊 Sample Data

### Users (5 sample users)
- **john.doe@example.com** - johndoe123
- **jane.smith@example.com** - janesmith456
- **alex.johnson@example.com** - alexjohnson
- **sarah.wilson@example.com** - sarahwilson
- **mike.brown@example.com** - mikebrown789

### Prompts (15 sample prompts)
Diverse prompts covering various categories:
- Productivity & Business
- Marketing & Social Media
- Leadership & Management
- Technology & Development
- Education & Learning
- And more...

## 🔧 Advanced Options

The advanced seeder (`scripts/advanced-seed.ts`) supports command-line arguments:

```bash
# Seed specific number of users and prompts
npx tsx scripts/advanced-seed.ts --users=3 --prompts=10

# Seed without clearing existing data
npx tsx scripts/advanced-seed.ts --no-clear

# Run quietly (minimal output)
npx tsx scripts/advanced-seed.ts --quiet

# Seed only users
npx tsx scripts/advanced-seed.ts users

# Seed only prompts
npx tsx scripts/advanced-seed.ts prompts
```

## 📝 Customizing Seed Data

### Adding More Users

Edit `seeds/users.json`:

```json
{
  "email": "newuser@example.com",
  "username": "newusername",
  "image": "https://example.com/avatar.jpg"
}
```

**Note**: Usernames must be 8-20 characters, alphanumeric with dots/underscores allowed.

### Adding More Prompts

Edit `seeds/prompts.json`:

```json
{
  "prompt": "Your prompt text here...",
  "tag": "#yourtag"
}
```

## 🔍 Programmatic Usage

You can also use the seeders programmatically in your code:

```typescript
import DatabaseSeeder from './scripts/seed';
import AdvancedSeeder from './scripts/advanced-seed';

// Basic seeder
const seeder = new DatabaseSeeder();
await seeder.run();

// Advanced seeder with options
const advancedSeeder = new AdvancedSeeder({
  clearDatabase: false,
  userCount: 3,
  promptCount: 10,
  verbose: true
});

await advancedSeeder.run();
// Or seed specific collections
await advancedSeeder.seedUsersOnly();
await advancedSeeder.seedPromptsOnly();
```

## 🚨 Important Notes

1. **Data Loss Warning**: The default behavior clears all existing users and prompts. Use `--no-clear` flag to preserve existing data.

2. **Environment Variables**: Ensure your `.env` file has the correct `MONGODB_URL`.

3. **User Dependencies**: Prompts require users to exist (for the creator field). If seeding prompts only, make sure users exist first.

4. **Database Connection**: The seeder will automatically connect to your MongoDB database using the same connection logic as your Next.js app.

## 🐛 Troubleshooting

### Common Issues

**"MONGODB_URL not found"**
- Check your `.env` file contains `MONGODB_URL=your_connection_string`

**"No users found" when seeding prompts**
- Run `npm run seed:users` first, then `npm run seed:prompts`

**TypeScript execution errors**
- Install tsx: `npm install --save-dev tsx`
- Or use the JavaScript version: `npm run seed`

**Connection timeout**
- Check your MongoDB connection string
- Ensure your database is accessible
- Verify network connectivity

### Getting Help

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your database connection
3. Ensure all dependencies are installed
4. Try the simple JavaScript seeder first: `npm run seed`

## 🎯 Best Practices

1. **Development**: Use `npm run seed` for quick setup
2. **Testing**: Use advanced options to create specific test scenarios
3. **Production**: Never run seeders in production environments
4. **Backup**: Always backup production data before running any database operations

## 📈 Extending the Seeder

To add new data types or modify seeding behavior:

1. Create new JSON files in the `seeds/` directory
2. Import them in your seeder scripts
3. Add new seeding methods to the seeder classes
4. Update the npm scripts in `package.json`

Example for adding categories:

```typescript
// In advanced-seed.ts
private async seedCategories(): Promise<void> {
  const categoriesData = require('../seeds/categories.json');
  await Category.insertMany(categoriesData);
}
```

Happy seeding! 🌱

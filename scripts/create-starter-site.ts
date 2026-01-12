#!/usr/bin/env node

/**
 * CLI Scaffolding Script
 * 
 * Usage: npx create-starter-site
 * 
 * This script helps users quickly set up a new site by:
 * 1. Asking basic questions (site name, template type)
 * 2. Copying starter config
 * 3. Generating pages
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Simple CLI interface using readline
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

interface Answers {
  siteName: string
  email: string
  template: 'one-page' | 'multi-page' | 'portfolio'
}

async function main() {
  console.log('\n🍞 Welcome to Sourdough Starter!\n')
  console.log('This script will help you set up your site configuration.\n')

  try {
    const answers: Answers = {
      siteName: '',
      email: '',
      template: 'one-page',
    }

    // Get site name
    answers.siteName = await question('What is your site/company name? ')
    if (!answers.siteName.trim()) {
      console.log('❌ Site name is required. Exiting.')
      process.exit(1)
    }

    // Get email
    answers.email = await question('What is your contact email? ')
    if (!answers.email.trim()) {
      console.log('⚠️  No email provided. You can add it later in site.config.ts')
    }

    // Get template choice
    console.log('\nChoose a template:')
    console.log('1. One-page (all content on single page)')
    console.log('2. Multi-page (Home, About, Services, Contact)')
    console.log('3. Portfolio (showcase work/projects)')
    const templateChoice = await question('\nEnter choice (1-3) [1]: ')

    switch (templateChoice.trim() || '1') {
      case '2':
        answers.template = 'multi-page'
        break
      case '3':
        answers.template = 'portfolio'
        break
      default:
        answers.template = 'one-page'
    }

    // Update site.config.ts
    const configPath = join(__dirname, '..', 'src', 'config', 'site.config.ts')
    if (existsSync(configPath)) {
      let configContent = readFileSync(configPath, 'utf-8')
      
      // Update company name
      configContent = configContent.replace(
        /name: 'Your Company Name'/,
        `name: '${answers.siteName}'`
      )
      
      // Update email
      if (answers.email) {
        configContent = configContent.replace(
          /email: 'hello@example.com'/,
          `email: '${answers.email}'`
        )
      }

      writeFileSync(configPath, configContent, 'utf-8')
      console.log('\n✅ Updated src/config/site.config.ts')
    }

    // Create a setup guide
    const guidePath = join(__dirname, '..', 'SETUP.md')
    const guideContent = `# Setup Guide

## Your Site Configuration

- **Site Name**: ${answers.siteName}
- **Email**: ${answers.email || 'Not set - add in site.config.ts'}
- **Template**: ${answers.template}

## Next Steps

1. **Edit Content**: Open \`src/config/site.config.ts\` and customize:
   - Company information
   - Services
   - Testimonials
   - Navigation
   - Social links

2. **Customize Theme**: Edit \`src/config/theme.config.ts\` to change:
   - Colors
   - Fonts
   - Spacing

3. **Configure Contact Form**: 
   - Edit \`src/pages/Contact.tsx\` to set up your form provider
   - Options: api, formspree, netlify, emailjs, resend

4. **Add Your Content**:
   - Replace placeholder text in site.config.ts
   - Add images to \`public/\` folder
   - Update SEO metadata in each page

5. **Run Development Server**:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

6. **Build for Production**:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## Template: ${answers.template}

${answers.template === 'one-page' 
  ? 'All sections are on a single scrollable page. Perfect for simple business sites.'
  : answers.template === 'multi-page'
  ? 'Content is split across multiple pages: Home, About, Services, Contact.'
  : 'Designed to showcase your portfolio/work with a project grid.'}

## Need Help?

- Check \`README.md\` for full documentation
- All components are in \`src/components/sections/\`
- Layout primitives in \`src/components/layout/\`

Happy building! 🍞
`

    writeFileSync(guidePath, guideContent, 'utf-8')
    console.log('✅ Created SETUP.md with your configuration')

    console.log('\n🎉 Setup complete!')
    console.log('\nNext steps:')
    console.log('1. Edit src/config/site.config.ts to customize your content')
    console.log('2. Run: npm install && npm run dev')
    console.log('3. Check SETUP.md for detailed instructions\n')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()

// scripts/verifyNotion.ts
import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function verifyNotion() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const databaseId = process.env.NOTION_DATABASE_ID
  
  console.log('Database ID:', databaseId)
  
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    })
    
    console.log('Successfully connected to database:', response.properties.Title)
  } catch (error) {
    console.error('Error:', error)
  }
}

verifyNotion()
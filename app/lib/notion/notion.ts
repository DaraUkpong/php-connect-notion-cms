// app/lib/notion/notion.ts
import { NotionBlock, NotionPost, PostResponse } from '@/app/types/notion'
import { Client } from '@notionhq/client'
import { DatabaseObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not defined')
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID is not defined')
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const DATABASE_ID = process.env.NOTION_DATABASE_ID




export async function getDatabaseItems() {
  try {
    const response= await notion.databases.query({
      database_id: DATABASE_ID,
    })
    return response.results 
  } catch (error) {
    console.error('Error fetching database items:', error)
    throw error
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    })

    const post = response.results[0] 

    if (!post) {
      throw new Error(`No post found for slug: ${slug}`)
    }

    const blocks = await notion.blocks.children.list({
      block_id: post.id ,
    })

    return {
      post, 
      blocks,
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    throw error
  }
}
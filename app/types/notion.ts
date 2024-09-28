// app/types/notion.ts

// Base types for common properties
type NotionText = {
    type: 'text'
    text: {
      content: string
      link: null | {
        url: string
      }
    }
    annotations: {
      bold: boolean
      italic: boolean
      strikethrough: boolean
      underline: boolean
      code: boolean
      color: string
    }
    plain_text: string
    href: string | null
  }
  
  type NotionRichText = {
    rich_text: NotionText[]
  }
  
  type NotionTitle = {
    title: NotionText[]
  }
  
  type NotionDate = {
    date: {
      start: string
      end: string | null
    }
  }
  
  type NotionFile = {
    file: {
      url: string
      expiry_time: string
    }
    name: string
    type: 'file'
  }
  
  type NotionExternalFile = {
    file: {
      url: string
    }
    name: string
    type: 'external'
  }
  
  export type NotionTag = {
    id: string
    name: string
    color: string
  }
  
  // Post types
  export interface NotionPost {
    id: string
    created_time: string
    last_edited_time: string
    properties: {
      Title: NotionTitle
      Slug: NotionRichText
      Author: NotionRichText
      PublishedDate: NotionDate
      Description?: NotionRichText
      FeaturedImage: {
        type: 'files'
        files: (NotionFile | NotionExternalFile)[]
      }
      Tags?: {
        type: 'multi_select'
        multi_select: NotionTag[]
      }
    }
    url: string
  }
  
  // Block types
  interface BaseBlock {
    object: 'block'
    id: string
    parent: {
      type: 'page_id' | 'database_id'
      page_id?: string
      database_id?: string
    }
    created_time: string
    last_edited_time: string
    has_children: boolean
    archived: boolean
    type: string
  }
  
  interface TextBlock extends BaseBlock {
    type: 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3'
    [key: string]: any
    paragraph?: NotionRichText
    heading_1?: NotionRichText
    heading_2?: NotionRichText
    heading_3?: NotionRichText
  }
  
  interface ListBlock extends BaseBlock {
    type: 'bulleted_list_item' | 'numbered_list_item'
    [key: string]: any
    bulleted_list_item?: NotionRichText
    numbered_list_item?: NotionRichText
  }
  
  interface ImageBlock extends BaseBlock {
    type: 'image'
    image: NotionFile | NotionExternalFile
  }
  
  interface CodeBlock extends BaseBlock {
    type: 'code'
    code: NotionRichText & {
      language: string
    }
  }
  
  export type NotionBlock = TextBlock | ListBlock | ImageBlock | CodeBlock
  
  // Response types
  export interface PostResponse {
    post: NotionPost
    blocks: NotionBlock[]
  }
// app/components/NotionBlockRenderer.tsx

import { NotionBlock } from "../types/notion"


interface NotionBlockRendererProps {
  block: NotionBlock
}

export default function NotionBlockRenderer({ block }: NotionBlockRendererProps) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="mb-4">
          {block.paragraph?.rich_text.map((text, index) => (
            <span
              key={index}
              className={`
                ${text.annotations.bold ? 'font-bold' : ''}
                ${text.annotations.italic ? 'italic' : ''}
                ${text.annotations.strikethrough ? 'line-through' : ''}
                ${text.annotations.underline ? 'underline' : ''}
                ${text.annotations.code ? 'font-mono bg-gray-100 rounded px-1' : ''}
              `}
            >
              {text.text.link ? (
                <a
                  href={text.text.link.url}
                  className="text-blue-600 hover:underline"
                >
                  {text.text.content}
                </a>
              ) : (
                text.text.content
              )}
            </span>
          ))}
        </p>
      )

    case 'heading_1':
      return (
        <h1 className="text-3xl font-bold mb-4">
          {block.heading_1?.rich_text[0].text.content}
        </h1>
      )

    case 'heading_2':
      return (
        <h2 className="text-2xl font-bold mb-4">
          {block.heading_2?.rich_text[0].text.content}
        </h2>
      )

    case 'heading_3':
      return (
        <h3 className="text-xl font-bold mb-4">
          {block.heading_3?.rich_text[0].text.content}
        </h3>
      )

    case 'bulleted_list_item':
      return (
        <li className="mb-2">
          {block.bulleted_list_item?.rich_text[0].text.content}
        </li>
      )

    case 'numbered_list_item':
      return (
        <li className="mb-2">
          {block.numbered_list_item?.rich_text[0].text.content}
        </li>
      )

    case 'image':
      const imageData = block.image
      const imageUrl = imageData.type === 'external' 
        ? imageData.file.url 
        : imageData.file.url
      
      return (
        <div className="my-4">
          <img src={imageUrl} alt={imageData.name || 'Notion image'} className="rounded-lg" />
        </div>
      )

    case 'code':
      return (
        <pre className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
          <code>{block.code.rich_text[0].text.content}</code>
        </pre>
      )

    default:
      return null
  }
}
// app/blog/[slug]/page.tsx
import NotionBlockRenderer from '@/app/components/NotionBlockRenderer'
import { getPostBySlug } from '@/app/lib/notion/notion'
import type { PostResponse } from '@/app/types/notion'
import { formatDate } from '@/app/utils/formatDate'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { post, blocks } = await getPostBySlug(params.slug) as PostResponse

    return (
      <article className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="relative h-64 md:h-96 mb-8">
          <Image
            src={post.properties.FeaturedImage.files[0].file.url}
            alt={post.properties.Title.title[0].plain_text}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          {post.properties.Title.title[0].plain_text}
        </h1>
        <div className="flex items-center text-white mb-8">
          <span className="mr-4">
            By {post.properties.Author.rich_text[0].plain_text}
          </span>
          <span>
            {formatDate(post.properties.PublishedDate.date.start)}
          </span>
        </div>
        {post.properties.Tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.properties.Tags.multi_select.map((tag) => (
              <span
                key={tag.id}
                className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <div className="prose max-w-none">
          {/* {blocks.map((block) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))} */}
           {post.properties.Description && (
                <p className="text-white mb-4 line-clamp-3">
                  {post.properties.Description.rich_text[0].plain_text}
                </p>
              )}
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
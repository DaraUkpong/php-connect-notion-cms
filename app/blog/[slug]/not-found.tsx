// app/blog/[slug]/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-4xl font-bold mb-4">Blog Post Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, the blog post you&apos;re looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="text-purple-600 hover:text-purple-800 underline"
      >
        Go back to homepage
      </Link>
    </div>
  )
}
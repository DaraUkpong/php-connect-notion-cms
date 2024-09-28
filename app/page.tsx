import Image from "next/image";
import { getDatabaseItems } from "./lib/notion/notion";
import { formatDate } from "./utils/formatDate";
import Link from "next/link";
import { NotionPost, NotionTag } from "./types/notion";

export const revalidate = 3600; // Revalidate every hour

async function HomePage() {


  const posts = (await getDatabaseItems()) as unknown as NotionPost[];

  // console.log("posts", posts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {posts && posts.length > 0 ? (
          posts.map((post) => {


            console.log("post", post.properties.postStatus.select.name);
            const isInactive = post.properties.postStatus.select.name === "Inactive";


            return (
              <Link
                href={`/blog/${post.properties.Slug.rich_text[0].plain_text}`}
                key={post.id}
              >
                <article
                  key={post.id}
                  className={`flex flex-col bg-white rounded-lg shadow-lg overflow-hidden ${
                    isInactive ? "opacity-50 grayscale" : ""
                  }`}
                >
                  <div className="relative h-48 sm:h-64">
                    <Image
                      src={post.properties.FeaturedImage.files[0].file.url}
                      alt={post.properties.Title.title[0].plain_text}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-black text-xl font-semibold mb-2 line-clamp-2">
                      {post.properties.Title.title[0].plain_text}
                    </h2>
                    <div className="mb-4 text-sm text-gray-600">
                      <p className="mb-1">
                        <span className="font-medium">By:</span>{" "}
                        {post.properties.Author.rich_text[0].plain_text}
                      </p>
                      <p>
                        <span className="font-medium">Published:</span>{" "}
                        {formatDate(post.properties.PublishedDate.date.start)}
                      </p>
                    </div>
                    {post.properties.Description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.properties.Description.rich_text[0].plain_text}
                      </p>
                    )}
                    <div className="mt-auto">
                      {post.properties.Tags && (
                        <div className="flex flex-wrap gap-2">
                          {post.properties.Tags.multi_select.map(
                            (tag: NotionTag) => (
                              <span
                                key={tag.id}
                                className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                              >
                                {tag.name}
                              </span>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })
        ) : (
          <p>No posts found</p>
        )}

      </div>
    </div>
  );
}

export default HomePage;

// src/app/posts/[id]/page.tsx
//
// Server Component: does server-side access checks before rendering.
// For conditional UI, passes the result to client components.

import { checkAccess } from 'access-engine/server/next'
import { notFound, redirect } from 'next/navigation'
import { PostActions } from '@/components/post-actions'
import { engine } from '@/lib/access'
import { getCurrentUserId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  const { id } = await params
  const userId = await getCurrentUserId()
  if (!userId) redirect('/login')

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  })
  if (!post) notFound()

  // ── Server-side access check with resource attributes ──
  // This catches cases the client-side map can't (resource-specific checks)
  const canEdit = await engine.can(userId, 'update', {
    type: 'post',
    id: post.id,
    attributes: { ownerId: post.authorId, published: post.published },
  })

  const canDelete = await engine.can(userId, 'delete', {
    type: 'post',
    id: post.id,
    attributes: { ownerId: post.authorId },
  })

  const canPublish = await checkAccess(engine, userId, 'publish', 'post', post.id)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name}</p>
      {!post.published && <span className="badge">Draft</span>}
      <div>{post.body}</div>

      {/* Pass server-computed permissions to client component */}
      <PostActions
        postId={post.id}
        canEdit={canEdit}
        canDelete={canDelete}
        canPublish={canPublish && !post.published}
      />
    </article>
  )
}

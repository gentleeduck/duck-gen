// src/components/post-actions.tsx
'use client'

interface PostActionsProps {
  postId: string
  canEdit: boolean
  canDelete: boolean
  canPublish: boolean
}

export function PostActions({ postId, canEdit, canDelete, canPublish }: PostActionsProps) {
  return (
    <div className="mt-4 flex gap-2">
      {canEdit && (
        <button
          onClick={() => (window.location.href = `/posts/${postId}/edit`)}
          className="rounded bg-blue-600 px-4 py-2 text-white">
          Edit
        </button>
      )}

      {canPublish && (
        <button
          onClick={async () => {
            await fetch(`/api/posts/${postId}/publish`, { method: 'POST' })
            window.location.reload()
          }}
          className="rounded bg-green-600 px-4 py-2 text-white">
          Publish
        </button>
      )}

      {canDelete && (
        <button
          onClick={async () => {
            if (!confirm('Delete this post?')) return
            await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
            window.location.href = '/posts'
          }}
          className="rounded bg-red-600 px-4 py-2 text-white">
          Delete
        </button>
      )}
    </div>
  )
}

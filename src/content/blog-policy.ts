type EditorialPost = {
  id: string;
  data: { status: string; pinned: boolean; pinOrder: number; publishedAt: string };
};

/** A single publication policy for listing, homepage and generated routes. */
export function publishedPosts<T extends EditorialPost>(posts: T[], now = new Date()): T[] {
  const today = now.toISOString().slice(0, 10);
  return posts.filter(post => post.data.status === 'published' && post.data.publishedAt <= today)
    .sort((a, b) => Number(b.data.pinned) - Number(a.data.pinned)
      || (a.data.pinned && b.data.pinned ? a.data.pinOrder - b.data.pinOrder : 0)
      || b.data.publishedAt.localeCompare(a.data.publishedAt)
      || a.id.localeCompare(b.id));
}

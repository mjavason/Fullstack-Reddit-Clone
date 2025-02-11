import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import Link from 'next/link';
import paths from '@/paths';
import PostShow from '@/components/posts/post-show';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PostShowLoading from '@/components/posts/post-show-loading';

interface ShowPostPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function ShowPostPage({ params }: ShowPostPageProps) {
  const { slug, postId } = await params;

  const post = await db.post.findFirst({
    where: { id: postId },
  });
  if (!post) return notFound();

  return (
    <div className='space-y-3'>
      <Link className='underline decoration-solid' href={paths.topic(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading></PostShowLoading>}>
        <PostShow postId={post.id} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}

import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import Link from 'next/link';
import paths from '@/paths';
import PostShow from '@/components/posts/post-show';
import { db } from '@/db';
import { notFound } from 'next/navigation';

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

  // return (
  //   <div className='grid grid-cols-4 gap-4 p-4'>
  //     <div className='col-span-3'>
  //       <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
  //     </div>
  //   </div>
  // );

  return (
    <div className='space-y-3'>
      <Link className='underline decoration-solid' href={paths.topic(slug)}>
        {'< '}Back to {slug}
      </Link>
      {/* <PostShow /> */}
      {/* <CommentCreateForm postId={postId} startOpen /> */}
      {/* <CommentList comments={comments} /> */}
    </div>
  );
}

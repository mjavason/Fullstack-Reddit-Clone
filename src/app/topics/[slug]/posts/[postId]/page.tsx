import { db } from '@/db';
import { notFound } from 'next/navigation';

interface ShowPostPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: ShowPostPageProps) {
  const { postId } = await params;
  
  const post = await db.post.findFirst({
    where: { id: postId },
  });
  if (!post) return notFound();

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
      </div>
    </div>
  );
}

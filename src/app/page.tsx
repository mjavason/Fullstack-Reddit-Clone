import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { Divider } from '@heroui/react';
import { fetchTopPosts } from '@/db/queries/posts';
import PostList from '@/components/posts/post-list';

export default async function Home() {
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-xl m-2'>Top Posts</h1>
        <PostList fetchData={fetchTopPosts}></PostList>
      </div>
      <div className='border shadow py-3 px-2'>
        <TopicCreateForm></TopicCreateForm>
        <Divider className='my-2'></Divider>
        <h3 className='text-lg'>Topics</h3>
        <TopicList></TopicList>
      </div>
    </div>
  );
}

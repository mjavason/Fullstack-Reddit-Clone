import { Skeleton } from '@heroui/react';

export default function PostShowLoading() {
  return (
    <div className='m-4'>
      <div className='ny-2'>
        <Skeleton className='h-8 w-48'></Skeleton>
      </div>

      <div className='p-4 border rounded space-y-2'>
        <Skeleton className='h-6 w-32'></Skeleton>
        <Skeleton className='h-6 w-32'></Skeleton>
        <Skeleton className='h-6 w-32'></Skeleton>
      </div>
    </div>
  );
}

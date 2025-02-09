import { Button } from '@heroui/react';
import * as actions from '@/actions';
import { auth } from '@/auth';
import Profile from '@/components/profile';

export default async function Home() {
  const session = await auth();

  return (
    <div className='grid gap-3 justify-center items-center my-3'>
      <form action={actions.signIn}>
        <Button className=' bg-blue-400' type='submit'>
          Sign In
        </Button>
      </form>

      <form action={actions.signOut}>
        <Button className=' bg-red-400' type='submit'>
          Sign Out
        </Button>
      </form>

      {session?.user ? (
        <div>{JSON.stringify(session?.user)}</div>
      ) : (
        <div>Signed Out</div>
      )}

      <Profile></Profile>
    </div>
  );
}

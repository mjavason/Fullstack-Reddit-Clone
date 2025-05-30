'use client';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return <div>From client: {JSON.stringify(session?.data?.user)}</div>;
  } else {
    return <div>From client: user in NOT signed in</div>;
  }
}

import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
} from '@heroui/react';
import { auth } from '@/auth';

export default async function HeaderNav() {
  const session = await auth();
  let authContent: React.ReactNode;
  
  if (session?.user) {
    authContent = <Avatar src={session.user.image || ''} />;
  } else {
    authContent = <div>Sign in/Sign out</div>;
  }

  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Input></Input>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>{authContent}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

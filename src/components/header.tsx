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

  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>Discuss</Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Input></Input>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          {session?.user ? <div>Signed In</div> : <div>Signed out</div>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );

  return <div>HeaderNav</div>;
}

'use client';

import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import { startTransition, useActionState } from 'react';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
} from '@heroui/react';

export default function PostCreateForm(props: { slug: string }) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, props.slug),
    {
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input
              name='title'
              label='Title'
              labelPlacement='outside'
              placeholder='Title'
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              name='content'
              label='Content'
              labelPlacement='outside'
              placeholder='Fill your post content'
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />

            {formState.errors._form ? (
              <div className='rounded p-2 bg-red-200 border border-red-400'>
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton isLoading={isPending}>Save</FormButton>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

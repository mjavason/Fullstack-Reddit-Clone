'use client';

import * as actions from '@/actions';
import { useActionState, startTransition } from 'react';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
} from '@heroui/react';

export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  //   return <div>TopicCreateForm</div>;
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a topic</h3>
            <Input
              name='name'
              label='Name'
              labelPlacement='outside'
              placeholder='Name'
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            ></Input>
            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Description'
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            ></Textarea>

            {formState.errors._form ? (
                <div className="rounded p-2 bg-red-200 border border-red-400">
                    {formState.errors._form?.join(', ')}
                </div>
            ) : null}

            <Button type='submit'>Submit</Button>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

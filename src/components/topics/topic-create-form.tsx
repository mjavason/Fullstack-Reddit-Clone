import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react';

export default function TopicCreateForm() {
  //   return <div>TopicCreateForm</div>;
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action=''>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a topic</h3>
            <Input
              label='Name'
              labelPlacement='outside'
              placeholder='Name'
            ></Input>
            <Textarea
              label='Name'
              labelPlacement='outside'
              placeholder='Name'
            ></Textarea>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

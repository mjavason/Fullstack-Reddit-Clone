'use server';

import * as actions from '@/actions';
import { z } from 'zod';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z]/, {
      message: 'Must be lowercase letters or dashes without',
    }),
  description: z.string().min(10),
});

export async function createTopic(formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');

  console.log(name, description);
}

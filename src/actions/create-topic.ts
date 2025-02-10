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

interface CreateTopicActionState {
  errors: {
    name?: string[];
    description?: string[];
  };
}

export async function createTopic(
  actionState: CreateTopicActionState,
  formData: FormData
): Promise<CreateTopicActionState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!result.success)
    return {
      errors: result.error?.flatten().fieldErrors,
    };

  return {
    errors: {},
  };
}

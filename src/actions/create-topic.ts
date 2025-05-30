'use server';
import paths from '@/paths';
import { auth } from '@/auth';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Topic } from '@prisma/client';

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
    _form?: string[];
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

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  revalidatePath(paths.home);
  redirect(paths.topic(topic.slug));
}

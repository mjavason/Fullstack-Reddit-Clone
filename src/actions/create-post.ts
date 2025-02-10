'use server';
import paths from '@/paths';
import { auth } from '@/auth';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Post } from '@prisma/client';

const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-z]/, {
      message: 'Must be lowercase letters or dashes without',
    }),
  content: z.string().min(10),
});

interface CreatePostActionState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  actionState: CreatePostActionState,
  formData: FormData
): Promise<CreatePostActionState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!result.success)
    return {
      errors: result.error?.flatten().fieldErrors,
    };

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    };
  }

  let post: Post;
  try {
    const topic = await db.topic.findFirst({
      where: { slug },
    });
    if (!topic)
      return {
        errors: {
          _form: ['Topic not found'],
        },
      };

    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
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

  revalidatePath(paths.topic(slug));
  redirect(paths.showPost(slug, post.id));
}

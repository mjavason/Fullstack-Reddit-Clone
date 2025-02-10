export const pages = {
  home: '/',
  topic: (topicSlug: string) => `/topics/${topicSlug}`,
  createPost: (topicSlug: string) => `/topics/${topicSlug}/posts/new`,
  showPost: (topicSlug: string, postId: string) =>
    `/topics/${topicSlug}/posts/${postId}`,
};

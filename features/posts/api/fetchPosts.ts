export const fetchPosts = async (data: string[], activePage = 1): Promise<any> => {
  const size = 20;
  const total = data.length;
  const ids = data.slice(
    activePage - 1,
    activePage - 1 + size > total ? -1 : activePage - 1 + size
  );
  const response = Promise.all(
    ids.map(async (id) => {
      const post = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      return post.json();
    })
  );
  return response;
};

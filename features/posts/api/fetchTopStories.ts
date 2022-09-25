export const fetchTopStories = async (): Promise<string[]> => {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  return response.json();
};

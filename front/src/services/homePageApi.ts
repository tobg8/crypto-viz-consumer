export const getHomePageArticles = async () => {
  return new EventSource('http://localhost:3001/articles');
};

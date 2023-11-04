import { useEffect } from 'react';
import { usetrendingPostsStore } from './cryptoTrendingPosts.store';

const CryptoTrendingPosts = () => {
  const { getTrendingPosts, isLoading } =
    usetrendingPostsStore()

  useEffect(() => {
    getTrendingPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      CryptoTrendingPosts
      {/* {trendingPostsItems.map((post, index) => (
        <div key={index}>{post.sourceDisplayName}</div>
      ))} */}
    </div>
  );
};

export default CryptoTrendingPosts;

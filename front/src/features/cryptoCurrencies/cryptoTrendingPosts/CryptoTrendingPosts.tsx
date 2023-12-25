import React, { useEffect } from 'react';
import { usetrendingPostsStore } from './cryptoTrendingPosts.store';

const CryptoTrendingPosts = () => {
  const { trendingPostsItems, getTrendingPosts, isLoading } =
    usetrendingPostsStore()

  useEffect(() => {
    getTrendingPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* {trendingPostsItems.map((post, index) => (
        <div key={index}>{post.sourceDisplayName}</div>
      ))} */}
    </div>
  );
};

export default CryptoTrendingPosts;

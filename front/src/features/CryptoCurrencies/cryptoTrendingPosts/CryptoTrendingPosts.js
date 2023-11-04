import React, { useEffect } from 'react';
import { trendingPostsStore } from './cryptoTrendingPosts.store';

const CryptoTrendingPosts = () => {
  const { trendingPostsItems, getTrendingPosts, isLoading } =
    trendingPostsStore((state) => state);

  console.log('trendingPostsItems', trendingPostsItems);

  useEffect(() => {
    getTrendingPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {trendingPostsItems.map((post) => (
        <div key={post.id}>{post.sourceDisplayName}</div>
      ))}
    </div>
  );
};

export default CryptoTrendingPosts;

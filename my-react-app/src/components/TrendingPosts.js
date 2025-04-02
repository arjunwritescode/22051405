import React from 'react';

function TrendingPosts({ posts, comments }) {
  // Count comments per post
  const commentCountMap = {};
  comments.forEach((comment) => {
    if (!commentCountMap[comment.postId]) {
      commentCountMap[comment.postId] = 0;
    }
    commentCountMap[comment.postId]++;
  });

  // Find the highest number of comments
  let maxComments = 0;
  for (let postId in commentCountMap) {
    if (commentCountMap[postId] > maxComments) {
      maxComments = commentCountMap[postId];
    }
  }

  // Filter posts that match the max comment count
  const trending = posts.filter((post) => {
    return commentCountMap[post.id] === maxComments && maxComments > 0;
  });

  return (
    <div>
      <h2>Trending Post(s) - Most Comments</h2>
      {trending.length === 0 && <p>No trending posts found (no comments yet).</p>}
      <div className="row">
        {trending.map((post) => {
          const count = commentCountMap[post.id] || 0;
          const postImg = `https://picsum.photos/seed/post${post.id}/300/200`;
          return (
            <div className="col-12 col-md-6 mb-3" key={post.id}>
              <div className="card">
                <img src={postImg} className="card-img-top" alt="Post" />
                <div className="card-body">
                  <h5 className="card-title">Post #{post.id}</h5>
                  <p className="card-text">{post.content}</p>
                  <p className="text-muted">Comments: {count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingPosts;

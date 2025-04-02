import React from 'react';

function Feed({ users, posts }) {
  // Sort posts by newest first (assuming each post has a 'timestamp')
  const sortedPosts = [...posts].sort((a, b) => {
    // If timestamp is a string, convert to Date. Otherwise compare numerically.
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  // Helper to get user info by ID
  const getUserById = (id) => users.find((u) => u.id === id);

  return (
    <div>
      <h2>Live Feed</h2>
      {sortedPosts.length === 0 && <p>No posts available yet.</p>}
      <div className="row">
        {sortedPosts.map((post) => {
          const user = getUserById(post.userId) || {};
          const userImg = `https://picsum.photos/seed/${user.id || 'unknown'}/40/40`;
          const postImg = `https://picsum.photos/seed/post${post.id}/300/200`;
          return (
            <div className="col-12 mb-3" key={post.id}>
              <div className="card">
                <div className="card-header d-flex align-items-center">
                  <img
                    src={userImg}
                    alt="User"
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    className="me-2"
                  />
                  <strong>{user.name || 'Unknown User'}</strong>
                </div>
                <img src={postImg} className="card-img-top" alt="Post" />
                <div className="card-body">
                  <p className="card-text">{post.content}</p>
                  <p className="text-muted mb-0">
                    Posted on: {new Date(post.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feed;

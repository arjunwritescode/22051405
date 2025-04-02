import React from 'react';

function TopUsers({ users, posts }) {
  // Count how many posts each user has
  const postCountMap = {};
  posts.forEach((post) => {
    if (!postCountMap[post.userId]) {
      postCountMap[post.userId] = 0;
    }
    postCountMap[post.userId]++;
  });

  // Sort users by their post count in descending order
  const sortedUsers = [...users].sort((a, b) => {
    const countA = postCountMap[a.id] || 0;
    const countB = postCountMap[b.id] || 0;
    return countB - countA;
  });

  // Take top 5
  const topFive = sortedUsers.slice(0, 5);

  return (
    <div>
      <h2>Top 5 Users by Post Count</h2>
      {topFive.length === 0 && <p>No users found.</p>}
      <div className="row">
        {topFive.map((user) => {
          const userPostCount = postCountMap[user.id] || 0;
          // Random image from picsum
          const userImg = `https://picsum.photos/seed/${user.id}/50/50`;

          return (
            <div className="col-12 col-md-6 mb-3" key={user.id}>
              <div className="d-flex align-items-center border p-2 rounded">
                <img
                  src={userImg}
                  alt="User Avatar"
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  className="me-3"
                />
                <div>
                  <h5 className="mb-0">{user.name}</h5>
                  <small>Posts: {userPostCount}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopUsers;

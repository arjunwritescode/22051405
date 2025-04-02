import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // If you want to import Bootstrap locally
import TopUsers from './components/TopUsers.js';
import TrendingPosts from './components/TrendingPosts.js';
import Feed from './components/Feed.js';

const USERS_API = 'http://20.244.56.144/evaluation-service/users';
const POSTS_API = 'http://20.244.56.144/evaluation-service/posts';
const COMMENTS_API = 'http://20.244.56.144/evaluation-service/comments';



function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  // Fetch all data from the server
  const fetchData = async () => {
    try {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch(USERS_API),
        fetch(POSTS_API),
        fetch(COMMENTS_API)
      ]);

      const [usersData, postsData, commentsData] = await Promise.all([
        usersRes.json(),
        postsRes.json(),
        commentsRes.json()
      ]);

      setUsers(usersData);
      setPosts(postsData);
      setComments(commentsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // Initial data load + poll every 10 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Social Media Analytics</h1>

      {/* Navigation Buttons (simple approach) */}
      <ul className="nav nav-tabs mb-3" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#feed" role="tab">
            Feed
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#topUsers" role="tab">
            Top Users
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#trendingPosts" role="tab">
            Trending Posts
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="feed" role="tabpanel">
          <Feed users={users} posts={posts} />
        </div>
        <div className="tab-pane fade" id="topUsers" role="tabpanel">
          <TopUsers users={users} posts={posts} />
        </div>
        <div className="tab-pane fade" id="trendingPosts" role="tabpanel">
          <TrendingPosts posts={posts} comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default App;

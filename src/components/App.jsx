import React from 'react';

/*Defining the App functional component */
const App = () => {
  // initializing the state 'posts' as an empty array to hold the data
  const [posts, setPosts] = React.useState([]);

  /*useEffect hook is used here to fetch the data from the '/api/posts' */
  React.useEffect(() => {
    // fetching the posts data api
    fetch('/api/posts')
      .then((response) => response.json()) // converting the response to JSON format
      .then((data) => {setPosts(data.posts);}) // // Update the 'posts' state with the fetched data
  }, []); // Empty dependency array to ensure the effect runs only once after the initial render

  // Rendering the list of posts
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          // Display each posts's title, content and categories as a list item, using their ID as a unique key
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>Category: {post.category}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

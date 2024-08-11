import React from 'react';

/* Task 3: Defining the CategoryFilter functional component 

component assigned to 3 variables:
1. categories: array of categories
2. selectedCategory: selected category at that point (indicating the selected value in the dropdown)
3. onCategoryChange: a callback function that will be called when user selects a different category from the dropdown
*/

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    // creating dropdown menu with current selected category reflected 
    // onChange is used here as an event handler for when a user selects a different category
    <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

/* Task 1: Defining the App functional component */
const App = () => {
  // initializing the state 'posts' as an empty array to hold the data
  const [posts, setPosts] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');

  /*useEffect hook is used here to fetch the data from the '/api/posts' */
  React.useEffect(() => {
    // fetching the posts data api
    fetch('/api/posts')
      .then((response) => response.json()) // converting the response to JSON format
      .then((data) => {setPosts(data.posts);}) // // Update the 'posts' state with the fetched data
  }, []); // Empty dependency array to ensure the effect runs only once after the initial render

  // Extracting unique categories from posts
  const categories = [...new Set(posts.map((post) => post.category))];

  // Rendering the list of posts
  return (
    <div>
      <h1>Posts</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      /> 
      <ul>
        {posts.map((post) => (
          // Task 2 : Display each posts's title, content and categories as a list item, using their ID as a unique key
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

import React from 'react';

/* This is the CSS-in-JS is used instead of the plain CSS as part of the extra requirement*/

/* Global styles for the body and code elements */
const globalStyles = {
  body: {
    margin: 0,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    backgroundColor: '#ADD8E6',
    lineHeight: 1.6,
    color: '#333',
  },
  code: {
    fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
};

// Styling objects
const styles = {
  
  /* Main container to center the contents */
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },

  /* Styling header */
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
  },

  /* Section for category filter dropdown */
  categorySection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },

  /* Section for posts listing */
  postList: {
    listStyleType: 'none',
    padding: 0,
  },

  /* Style each post article */
  article: {
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  /* Styling title within the article */
  articleHeader: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },

  /* Styling footer details in each article */
  footerSmall: {
    color: '#888',
  },

  /* Styling the Load More button */
  loadMoreButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  loadMoreButtonHover: {
    backgroundColor: '#0056b3',
  },
  
  /* Styling the Category Dropdown */
  categoryDropdown: {
    padding: '10px 20px', 
    fontSize: '1rem',
    fontFamily: 'inherit',
    border: '1px solid #ccc', 
    borderRadius: '8px', 
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)', 
    cursor: 'pointer',
    appearance: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    outline: 'none', 
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%277%27 viewBox=%270 0 12 7%27%3E%3Cpath fill=%27%23000%27 d=%27M6 7L0 1l1-1 5 5 5-5 1 1z%27/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '12px 7px',
    textAlign: 'left',  // Aligns text to the left
    paddingRight: '30px', 
  },

  categoryDropdownHover: {
    borderColor: '#007bff', 
  },

  categoryDropdownFocus: {
    borderColor: '#007bff', 
    boxShadow: '0 0 0 3px rgba(38, 143, 255, 0.3)', 
  },
};

/* Task 1: Defining the App functional component */
const App = () => {
  // initializing the state 'posts' as an empty array to hold the data
  const [posts, setPosts] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [visiblePosts, setVisiblePosts] = React.useState(5); // number of posts initially displayed

  /*useEffect hook is used here to fetch the data from the '/api/posts' */
  React.useEffect(() => {
    // fetching the posts data api
    fetch('/api/posts')
      .then((response) => response.json()) // converting the response to JSON format
      .then((data) => {setPosts(data.posts);}) // // Update the 'posts' state with the fetched data
  }, []); // Empty dependency array to ensure the effect runs only once after the initial render

  // Extracting unique categories from posts
  const categories = [...new Set(posts.map((post) => post.category))];

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
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}
      style={styles.categoryDropdown}
      onFocus={(e) => e.currentTarget.style.borderColor = '#007bff'}
      onBlur={(e) => e.currentTarget.style.borderColor = '#ccc'}
      aria-label="Select category"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    );
  };

  /* Task 4: Implementing load more pagination */
  // Handler to load more posts
  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5); // Loading 5 more posts everytime we click
  };

  // function to filter posts based on the selected category
  const getFilteredPosts = () => {
    if (selectedCategory) {
      return posts.filter((post) => post.category === selectedCategory);
    } else {
      return posts;
    }
  };

  const filteredPosts = getFilteredPosts();

  // Slicing the posts based on visible posts count
  const currentPosts = filteredPosts.slice(0, visiblePosts);


  /* Rendering the list of posts 
  <main> : used to wrap the primary (main focus) content like the posts
  <header> : making the title of the page more visible and larger in size of font
  <section> : grouping content like category filter and list of posts have their own group
  <article> : making an element independent where if it's taken out of context it will makes sense on its own
  <footer> : displaying additional details about the posts like the category it belongs to
  <ul> and <li> : used togther to create a list of items

  In this case, the CSS-in-JS is used instead of the plain CSS as part of the extra requirement
  */
  return (
    <div style={globalStyles.body}>
      <main style={styles.main}> 
        <header style={styles.header}>
            <h1>Posts</h1>
          </header>
          <section style={styles.categorySection}>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
          />
        </section>
        <section>
          <ul style={styles.postList}>
            {currentPosts.map((post) => (
              // Task 2 : Display each posts's title, content and categories as a list item, using their ID as a unique key
              <li key={post.id}>
                <article>
                  <header>
                    <h2>{post.title}</h2>
                  </header>
                  <p>{post.content}</p>
                  <footer>
                  <small style={styles.footerSmall}> Category: {post.category}</small>
                  </footer>
                </article>
              </li>
            ))}
          </ul>
          {/* creating a load more button */}
          {visiblePosts < filteredPosts.length && (
            <button
            style={styles.loadMoreButton}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#0056b3')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#007bff')
            }
            onClick={handleLoadMore}
          >
            Load More
          </button>
          )}
        </section>
      </main>
    </div>
  );
};



export default App;

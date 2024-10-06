import axios from 'axios';

const InsertBookmark = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")); // Get the token from localStorage

  try {
    // Send the POST request to insert a bookmark with the token in the headers
    const response = await axios.post(
      `http://localhost:3000/tolet/InsertBookmark`,
      { tid: id }, // Pass the tolet ID (tid) in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    alert("Bookmark added successfully!");

    // Redirect to the ToLet page after successful insertion
    window.location.href = "http://localhost:5173/tolet"; 
  } catch (error) {
    console.error("Error adding bookmark:", error);
    alert("Failed to add the bookmark. Please try again.");
  }
};

export default InsertBookmark;

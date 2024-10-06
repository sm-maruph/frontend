import axios from "axios";


const DeleteTolet = async (id, close) => {
  const token = JSON.parse(localStorage.getItem("token")); // Get the token from localStorage
  
  try {
    // Send the delete request with the token in the headers
    const response = await axios.delete(`http://localhost:3000/tolet/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    alert("ToLet entry deleted successfully!");

    close(); // Close the modal or dialog
    window.location.href = "http://localhost:5173/tolet"; 
  } catch (error) {
    console.error("Error deleting ToLet entry:", error);
    alert("Failed to delete the ToLet entry. Please try again.");
  }
};

export default DeleteTolet;

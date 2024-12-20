// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBny7Z4mgTL6YKFCqGJP7p2XcVjAghSXZk",
  authDomain: "crud-op-1296c.firebaseapp.com",
  projectId: "crud-op-1296c",
  storageBucket: "crud-op-1296c.firebasestorage.app",
  messagingSenderId: "57563317412",
  appId: "1:57563317412:web:8316b7a9f796b233365231"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const db = getFirestore(app); // Initialize Firestore

// Reference to the 'items' collection in Firestore
const itemsCollection = collection(db, "items");

console.log(app, db, itemsCollection);
// Function to add an item to Firestore
const addItem = async (item) => {
  try {
    await addDoc(itemsCollection, {
      name: item,
      createdAt: new Date()
    });
    console.log("Item added to Firestore:", item);
    fetchItems(); // Reload items after adding
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

// Function to get all items from Firestore and display them
const fetchItems = async () => {
  try {
    const querySnapshot = await getDocs(itemsCollection);
    const items = querySnapshot.docs.map(doc => doc.data().name);
    renderItems(items);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

// Function to render items in the DOM
const renderItems = (items) => {
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = ""; // Clear current list
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    itemList.appendChild(li);
  });
};

// Form submission event listener
const itemForm = document.getElementById('itemForm');
itemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemInput = document.getElementById('itemInput');
  const item = itemInput.value.trim();
  if (item) {
    addItem(item); // Add item to Firestore
    itemInput.value = ''; // Clear input field
  }
});

// Fetch and display items when the page loads
fetchItems();

use('DesiCoder');

// Insert a few documents into the projects collection.
db.getCollection('projects').deleteMany([
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "year": 1925
  },
  {
    "title": "Inception",
    "director": "Christopher Nolan",
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "year": 2010
  },
  {
    "name": "John Doe",
    "age": 30,
    "gender": "Male",
    "city": "New York",
    "country": "USA"
  },
  {
    "name": "iPhone 13",
    "brand": "Apple",
    "category": "Smartphone",
    "price": 999
  },
  {
    "name": "Spaghetti Bolognese",
    "ingredients": ["Spaghetti", "Ground beef", "Tomato sauce", "Onion", "Garlic", "Olive oil"],
    "instructions": "Cook spaghetti according to package directions. Meanwhile, in a large skillet, cook beef over medium heat until no longer pink; drain. Stir in tomato sauce, onion, garlic, and olive oil. Simmer, uncovered, for 15 minutes, stirring occasionally. Serve over spaghetti."
  }
]);

 
console.log("done inserting data");

 // src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.details}>
        <h3 style={styles.productName}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>Price: ₹{product.price}</p>
        <p style={styles.rating}>Rating: {renderStars(product.rating)}</p>
        {/* View Details Button */}
        <Link to={`/product/${product._id}`} style={styles.detailsButton}>View Details</Link>
      </div>
    </div>
  );
};

// Function to generate star rating
const renderStars = (rating) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < rating ? '⭐' : '☆'); // Filled or empty stars
  }
  return stars.join(' ');
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '15px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  details: {
    padding: '10px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    height: '50px', // Ensure the name does not overflow
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  description: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '10px',
    height: '60px', // Prevent description overflow
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: '10px',
  },
  rating: {
    fontSize: '14px',
    marginBottom: '15px',
  },
  detailsButton: {
    display: 'inline-block',
    padding: '8px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  detailsButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default ProductCard;

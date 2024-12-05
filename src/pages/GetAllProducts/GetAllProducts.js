 // src/pages/GetAllProducts/GetAllProducts.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/api'; // Import fetchProducts API
import ProductCard from '../../components/ProductCard';

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>All Products</h1>
      <div style={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
};

export default GetAllProducts;

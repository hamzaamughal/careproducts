import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-2 rounded product-item">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="product-image" />
      </Link>

      <Card.Body className="p-2">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="rating-text">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3" className="price-text">
          RS - {product.price}
        </Card.Text>
      </Card.Body>

      {/* CSS to handle small screen layouts */}
      <style jsx>{`
        @media screen and (max-width: 430px) {
          .product-item {
            font-size: 11px; /* Reduce the font size for small screens */
            display: block;
            padding: 10px; /* Reduce padding */
          }

          .product-image {
            max-width: 80px; /* Smaller image size */
            height: auto;
            margin: 0 auto; /* Center the image */
          }

          .product-title {
            font-size: 12px; /* Smaller font size for product name */
            margin-bottom: 5px; /* Reduce space between elements */
          }

          .rating-text {
            font-size: 10px; /* Smaller font size for rating */
            margin-bottom: 5px; /* Reduce space below rating */
          }

          .price-text {
            font-size: 14px; /* Reduce font size of the price */
            white-space: nowrap; /* Prevent line breaking */
            overflow: hidden; /* Hide overflow if the text is too long */
            text-overflow: ellipsis; /* Add ellipsis if overflow */
          }

          .product-item img {
            max-width: 100px; /* Smaller image size */
          }
        }

        /* General styling for larger screens */
        .product-item {
          padding: 12px;
        }

        .rating-text,
        .price-text {
          white-space: nowrap; /* Ensure single-line display */
          overflow: hidden;
        }
      `}</style>
    </Card>
  );
};

export default Product;

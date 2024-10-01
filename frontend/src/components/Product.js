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
        /* General styling for larger screens */
        .product-item {
          padding: 12px;
        }

        .product-image {
          width: 100%; /* Ensure the image takes full width of the card */
          height: auto; /* Keep the aspect ratio */
          display: block;
          object-fit: cover; /* Ensure the image covers the full space */
        }

        .rating-text,
        .price-text {
          white-space: nowrap; /* Ensure single-line display */
          overflow: hidden;
        }

        /* Styles for smaller resolutions like below 500px */
        @media screen and (max-width: 500px) {
          .product-item {
            font-size: 11px; /* Reduce the font size for small screens */
            padding: 10px; /* Reduce padding */
            width: 100%; /* Ensure the card takes full width */
          }

          .product-image {
            max-width: 100%; /* Ensure the image still takes the full width */
            height: auto; /* Keep aspect ratio */
            object-fit: cover; /* Ensure no space around the image */
            margin: 0; /* Remove any margin */
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
        }
      `}</style>
    </Card>
  );
};

export default Product;

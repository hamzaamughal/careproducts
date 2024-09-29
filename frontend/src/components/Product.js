import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded product-item'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div' className='rating-text'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3' className='price-text'>
          RS - {product.price}
        </Card.Text>
      </Card.Body>

      {/* CSS to handle small screen layouts */}
      <style jsx>{`
        @media screen and (max-width: 390px) {
          .product-item {
            font-size: 12px; /* Reducing font size for small screens */
            display: block;
          }

          .rating-text {
            font-size: 12px; /* Smaller font size for rating */
            margin-bottom: 5px; /* Adjust spacing */
          }

          .price-text {
            font-size: 12px; /* Smaller font size for price */
            white-space: nowrap; /* Prevent line breaking */
            overflow: hidden; /* Hide overflow if too long */
            text-overflow: ellipsis; /* Add ellipsis if overflow */
          }

          .product-item img {
            max-width: 100px; /* Smaller image for mobile resolution */
          }
        }

        /* General styling for larger screens */
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

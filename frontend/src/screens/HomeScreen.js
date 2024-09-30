import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Carousel } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import ReactPlayer from 'react-player';
import { FaWhatsapp } from 'react-icons/fa';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const [playingIndex, setPlayingIndex] = useState(null); // To manage which video is playing

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // Handle play event to stop carousel when video is playing
  const handleVideoPlay = (index) => {
    setPlayingIndex(index);
  };

  // Handle pause/ended event to resume carousel sliding
  const handleVideoPause = () => {
    setPlayingIndex(null);
  };

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      {/* Text before the "Latest Products" */}
      <div className="company-intro mt-4">
        <p>
          <strong>Dewderm skincare international</strong> is a Pakistani skincare manufacturer founded in 2024 and known to lead the charge in revolutionizing the skincare industry. We discover the beauty of natural skincare with Dewderm skincare! Let us be your guide to achieving radiant, healthy skin with our premium products.
        </p>
      </div>

      <h4 className="mt-4">Latest Products</h4>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}

      {/* Text after the "Latest Products" */}
      <div className="best-items mt-4">
        <h4>Best Items</h4>
        <p>
          Discover our best-selling products! Tried and tested by countless skincare enthusiasts, these best-sellers promise radiant, healthy-looking skin with every use.
        </p>
      </div>

      {/* Section to add demo videos in a carousel */}
      <h4 className="mt-4 mb-4">Product Demo Videos</h4>
      <Carousel
        controls={playingIndex === null} // Disable carousel controls when a video is playing
        interval={playingIndex === null ? 3000 : null} // Disable auto-slide when a video is playing
      >
        <Carousel.Item>
          <ReactPlayer
            url="/videos/videoone.mp4"
            controls
            width="100%"
            onPlay={() => handleVideoPlay(0)}
            onPause={handleVideoPause}
            onEnded={handleVideoPause}
          />
        </Carousel.Item>
        <Carousel.Item>
          <ReactPlayer
            url="/videos/videotwo.mp4"
            controls
            width="100%"
            onPlay={() => handleVideoPlay(1)}
            onPause={handleVideoPause}
            onEnded={handleVideoPause}
          />
        </Carousel.Item>
        <Carousel.Item>
          <ReactPlayer
            url="/videos/videothree.mp4"
            controls
            width="100%"
            onPlay={() => handleVideoPlay(2)}
            onPause={handleVideoPause}
            onEnded={handleVideoPause}
          />
        </Carousel.Item>
      </Carousel>

      {/* Custom WhatsApp Button */}
      <a
        href="https://wa.me/923326323778"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={40} color="" />
        <span className="whatsapp_text">Need Help? Chat with us.</span>
      </a>

      {/* Custom WhatsApp button styling */}
      <style jsx>{`
        .whatsapp_float {
          position: fixed;
          width: auto;
          height: 60px;
          bottom: 40px;
          right: 40px;
          background-color: #25d366;
          color: #fff;
          border-radius: 30px;
          text-align: center;
          font-size: 30px;
          box-shadow: 2px 2px 3px #999;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
        }

        .whatsapp_text {
          font-size: 16px;
          margin-left: 10px;
        }

        /* Hide the text on 390x844 resolution */
        @media (max-width: 590px) and (max-height: 844px) {
          .whatsapp_text {
            display: none;
          }
        }

        /* Default styling for large screens */
        .company-intro,
        .best-items {
          padding: 20px 0;
          text-align: center;
          font-size: 16px;
          line-height: 1.5;
        }

        .best-items h4 {
          margin-bottom: 10px;
        }

        /* Left-align text for small screens */
        @media (max-width: 767px) {
          .company-intro,
          .best-items {
            text-align: left;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default HomeScreen;

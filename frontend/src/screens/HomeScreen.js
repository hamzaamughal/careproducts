import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import ReactPlayer from 'react-player' // Import for video player
import { FaWhatsapp } from 'react-icons/fa' // Import WhatsApp icon

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
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

      {/* Section to add demo videos */}
      <h2>Product Demo Videos</h2>
      <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <ReactPlayer url='/videos/videoone.mp4' controls width='100%' />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <ReactPlayer url='/videos/videotwo.mp4' controls width='100%' />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <ReactPlayer url='/videos/videothree.mp4' controls width='100%' />
        </Col>
      </Row>

      {/* Custom WhatsApp Button */}
      <a
        href='https://wa.me/923326323778' // Replace with your WhatsApp number
        className='whatsapp_float'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FaWhatsapp size={40} color='' />
        <span className='whatsapp_text'>Need Help? Chat with us.</span>
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
      `}</style>
    </>
  )
}

export default HomeScreen

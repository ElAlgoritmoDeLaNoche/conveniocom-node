import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)

  const categories = [
    '-',
    'Accesorios',
    'Equipo de cómputo',
    'Extensores de red',
    'Escolares',
    'Telefonía',
    'Hogar',
    'Hecho en México'
  ]

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

  const keyword = match.params.keyword

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));


  }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Home'} />

          <div id="carouselExampleInterval" className="carousel slide mt-5" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-interval="10000">
                <img src="https://res.cloudinary.com/de1z2wmiz/image/upload/v1630510692/slider/image2_zpf8ex.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item" data-interval="2000">
                <img src="https://res.cloudinary.com/de1z2wmiz/image/upload/v1630510692/slider/image1_rfk9qh.jpg" className="d-block w-100" alt="..." />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>

          <h1 id="products_heading">Últimos Productos</h1>

          <section id="products" className="container mt-5">
            <div className="row">

              {/* {keyword ? ( */}
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          10000: `$10000`
                        }}
                        min={1}
                        max={10000}
                        defaultValue={[1, 10000]}
                        tipFormatter={value => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                      />

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">
                          Categorías
                        </h4>

                        <ul className="pl-0">
                          {categories.map(category => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">
                          Ratings
                        </h4>

                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map(star => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`
                                  }}
                                >
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map(product => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              {/* ) : ( */}
                {/* products.map(product => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )} */}

            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={'Sig'}
                prevPageText={'Ant'}
                firstPageText={'Prim'}
                lastPageText={'Últ'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}

          <div className="mt-5">
            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0">
                    <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <p style={{ color: "#333" }}>¿Quienes somos?</p>
                    </button>
                  </h2>
                </div>

                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                    <div className="ml-3">Somos una empresa 100% mexica que forma parte del grupo ANAUATLALLI “tierra mexicana”, dedicada a la comercialización de bienes y servicios nacionales y extranjeros. Con el principal objetivo de impulsar el desarrollo de México y sus productores.</div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <p style={{ color: "#333" }}>Principio de Mexicanidad.</p>
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                    <div className="ml-3">Principio de Mexicanidad. Conveniocom está orgullosa de ser una empresa mexicana, de promover e impulsar a los productores nacionales; así como divulgar la cultura mexicana, sus productos y servicios; engrandeciendo la experiencia al integrar productos extranjeros, para de esta manera aumentar la diversidad nacional.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Fragment>
      )}

    </Fragment>
  )
}

export default Home

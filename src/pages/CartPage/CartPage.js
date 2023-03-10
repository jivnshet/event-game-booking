import React, { useEffect, useState } from 'react';
import "./CartPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { removeFromCart, toggleCartQty, getCartTotal, clearCart } from '../../store/cartSlice';
import { formatPrice } from "../../utils/helpers";
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { LocationData } from '../../data/LocationData';

const CartPage = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalItems, totalAmount, deliveryCharge } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSelector(state => state.cart)]);

  const emptyCartMsg = <h4 className='text-red fw-6'>No items found!</h4>;
  const [errorMessage, setErrorMessage] = useState('');

  const [startInput, setStartInput] = useState(new Date());
  const [endInput, setEndInput] = useState(new Date());
  const [setupinput, setSetupInput] = useState(new Date());
  const [days, setDays] = useState(0);


  // useEffect(() => {
  //   let startNow = new Date(startInput)
  //   let startdate = startNow.toLocaleDateString();
  //   let starttime = startNow.toLocaleTimeString();

  //   let endNow = new Date(endInput)
  //   let enddate = endNow.toLocaleDateString();
  //   let endtime = endNow.toLocaleTimeString();

  //   let setupNow = new Date(setupinput)
  //   let setupdate = setupNow.toLocaleDateString();
  //   let setuptime = setupNow.toLocaleTimeString();
  //   let diffDays = parseInt((enddate - startdate) / (1000 * 60 * 60 * 24), 10);
  //   console.log(diffDays)
  //   setDays(diffDays)

  //   if (enddate < setupdate || startdate > setupdate) {
  //     setErrorMessage('Please enter a valid date.');
  //   }
  // }, [startInput, endInput, setupinput])

  const handleStart = (event) => {
    setStartInput(event.target.value);
  };

  const handleEnd = (event) => {
    setEndInput(event.target.value);
  };

  const handleSetup = (event) => {
    setSetupInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function colorChange() {
    var count = 1;
    var property = document.getElementById("proceed-btn");
    if (count === 0) {
      property.style.backgroundColor = "#FFFFFF"
      count = 1;
    }
    else {
      property.style.backgroundColor = "#198754"
      count = 0;
    }
  }

  const [selectedClient, setSelectedClient] = useState(""); //default value

  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
  }
  return (
    <div className="cart-page">
      <Navbar />
      <div className="container">
        <div className="breadcrumb">
          <ul className="breadcrumb-items flex">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home"></i>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </Link>
            </li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
      <div className='bg-ghost-white pb-10'>
        <div className='container'>
          <div className='section-title bg-ghost-white'>
            <h3 className="text-uppercase fw-7 text-regal-blue ls-1">My Cart</h3>
          </div>
          {
            cartProducts.length === 0 ? emptyCartMsg : (
              <div className="cart-content grid">
                <div className='cart-left'>
                  <div className="cart-items grid">
                    {
                      cartProducts.map(cartProduct => (
                        <div className='cart-item grid' key={cartProduct.id}>
                          <div className='cart-item-img flex flex-column bg-white'>
                            <img src={cartProduct.images[0]} alt={cartProduct.title} />
                            <button type="button" className='btn-square rmv-from-cart-btn' onClick={() => dispatch(removeFromCart(cartProduct.id))}>
                              <span className='btn-square-icon'><i className='fas fa-trash'></i></span>
                            </button>
                          </div>

                          <div className='cart-item-info'>
                            <h6 className='fs-16 fw-5 text-light-blue'>{cartProduct.title}</h6>
                            <div className="flex flex-between">
                              <div className='text-pine-green fw-4 fs-15 price'>Price : {formatPrice(cartProduct.price)}</div>
                              <div className='sub-total fw-6 fs-18 text-regal-blue'>
                                <span>Sub Total: </span>
                                <span className=''>{formatPrice(cartProduct.totalPrice)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <button type="button" className='btn-danger' onClick={() => dispatch(clearCart())}>
                    <span className="fs-16">Clear Cart</span>
                  </button>
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-uppercase fw-7 text-regal-blue ls-1 detail-head">Travel/Event Details</h3>
                    <div>
                      <label htmlFor="starttime">Start (date and time):</label>
                      <input className='input-border' type="datetime-local" id="starttime" name="starttime" value={startInput} onChange={handleStart} />
                    </div>
                    <div>
                      <label htmlFor="endtime">End (date and time):</label>
                      <input className='input-border' type="datetime-local" id="endtime" name="endtime" value={endInput} onChange={handleEnd} />
                    </div>
                    <div>
                      <label htmlFor="setuptime">Setup (date and time):</label>
                      <input className='input-border' type="datetime-local" id="setuptime" name="setuptime" value={setupinput} onChange={handleSetup} />
                    </div>
                    <div className='location'>
                      <label htmlFor="location">Choose a Location:</label>
                      <select className='input-border' name="location" id="location" value={selectedClient} onChange={handleSelectChange}>
                        {LocationData.map((option) => (
                          <option key={option.id} value={option.distance}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
                <div className='cart-right bg-white'>
                  <div className='cart-summary text-light-blue'>
                    <div className='cart-summary-title'>
                      <h6 className='fs-20 fw-5'>Order Summary</h6>
                    </div>
                    <ul className='cart-summary-info'>
                      <li className="flex flex-between">
                        <span className='fw-4'>Selected {totalItems} items(s) Price</span>
                        <span className='fw-7'>{formatPrice(totalAmount)}</span>
                      </li>
                      <li className='flex flex-between'>
                        <span className='fw-4'>Discount</span>
                        <span className='fw-7'>
                          <span className='fw-5 text-red'>-&nbsp;</span>
                          {formatPrice(0)}
                        </span>
                      </li>
                      <li className='flex flex-between'>
                        <span className='fw-4'>Travel Charges for {Number(selectedClient)}kms</span>
                        <span className='fw-7'>
                          <span className='fw-5 text-gold'>+&nbsp;</span>{Number(selectedClient) * 2 * 50}
                        </span>
                      </li>
                      <li className='flex flex-between'>
                        <span className='fw-4'>Day(s) {Number(days)}</span>
                        <span className='fw-7'>
                          {/* <span className='fw-5 text-gold'>+&nbsp;</span>{Number(selectedClient) * 2 * 50} */}
                        </span>
                      </li>
                    </ul>
                    <div className='cart-summary-total flex flex-between fs-18'>
                      <span className='fw-6'>Grand Total: </span>
                      {/* <span className='fw-6'>{formatPrice(totalAmount + deliveryCharge)}</span> */}
                      <span className='fw-6'>{formatPrice(totalAmount + (Number(selectedClient) * 2 * 50))}</span>
                    </div>
                    <div className='cart-payment-method'>
                      <label htmlFor="payment">Choose a payment method:</label>
                      <select className='select-border' name="payment" id="payment">
                        <option value="select">Select</option>
                        <option value="upi">UPI</option>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="cheque">Cheque</option>
                      </select>
                    </div>
                    <div className='cart-summary-btn'>
                      <button type="button"
                        id="proceed-btn"
                        onClick={() => colorChange()}
                        className='btn-secondary'>Proceed to Enquire</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartPage
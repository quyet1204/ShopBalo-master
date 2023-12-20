import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckReview, setIsDetailHistory } from '../../../../redux/reducer/history/history.reducer';
import {
  checkReviewSelector,
  orderDetailByIdHistorySelector,
} from '../../../../redux/selectors/history/history.selector';
import { formatter } from '../../../../utils/formatCurrency';
import ImageCustom from '../../../commons/Layouts/Image';
import ReviewProductItem from './ReviewProduct';
import './style.css';
import { FaStepBackward } from 'react-icons/fa';

const OrderHistoryDetail = (props) => {
  // const [review, setShowReview] = useState(false);
  const review =useSelector(checkReviewSelector);
  const dispatch = useDispatch();
  const dataDetailOrderById = useSelector(orderDetailByIdHistorySelector);
  console.log(dataDetailOrderById);
  console.log(props.infoCustomer);
  const backToOrder = () => {
    dispatch(setIsDetailHistory(false));
  };
const checkReviewC=()=>{
  dispatch(setCheckReview(!review));
}
console.log("rjh",review);
  return (
    <>
      <div className="row mb-3">
        <div className=" d-flex justify-content-end">
          <Button id="product-save-cancel" onClick={backToOrder} variant="outline-secondary" className="font-weight-bold d-flex align-items-center">
            <FaStepBackward />
            Back
          </Button>
        </div>
      </div>
      <div className="row order_detail_info_order">
        <h1 className="mt-2 mb-4 font-30px fw-bold text-center ">INVOICE</h1>
        <hr className="border border-1 opacity-50"></hr>
        <div className="col-12 col-md-12 col-sm-12">
          <div className="mt-1 p-3  container w-100">
            <div>
              <div className="d-flex flex-column">
                <div className=" row">
                  <div className="col-4 ml-3">
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Order ID :
                      <span>  #{dataDetailOrderById.dataOrder && dataDetailOrderById.dataOrder.id} </span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Customer Name :
                      <span> {props.infoCustomer.first_name + ' ' + props.infoCustomer.last_name} </span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Customer Phone : <span>0{props.infoCustomer.phone}</span>
                    </h4>


                  </div>
                  <div className="col-4 total_order_detail">

                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Discount : <span> {dataDetailOrderById.dataOrder && dataDetailOrderById.dataOrder.discount_value}%</span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Total : <span> {dataDetailOrderById.dataOrder && formatter.format(dataDetailOrderById.dataOrder.total_price)}</span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Ship to : <span>{dataDetailOrderById.dataOrder && dataDetailOrderById.dataOrder.address_delivery}</span>
                    </h4>
                  </div>
                  <div className="col-3 total_order_detail">
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Order Date : {dataDetailOrderById.dataOrder && dataDetailOrderById.dataOrder.created_order_date}
                    </h4>

                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Payment : <span> COD</span>
                    </h4>
                    <h4 className="fs-6   mt-4 mb-1 font-weight-bold ">
                      Status:
                      <span>
                        {(() => {
                          if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 1
                          ) {
                            return <span className="text-warning">Wait for confirmation...</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 2
                          ) {
                            return <span className="text-success"> Confirm !</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 3
                          ) {
                            return <span className="text-info"> Delivery</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 4
                          ) {
                            return <span className="text-success"> Successfully delivery</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 5
                          ) {
                            return <span className="text-danger"> Delivery failed</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 6
                          ) {
                            return <span className="text-success"> Successfully</span>;
                          } else {
                            return <span className="text-danger"> Failed</span>;
                          }
                        })()}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <hr className="border border-1 opacity-50"></hr>
      <h1 className="mt-2 font-20px fw-bold text-center ">Purchase Order Details</h1>
      <Table striped bordered hover className='mb-5'>
        <thead>
        <tr>
          <th>Serial</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Sum</th>
        </tr>
        </thead>
        <tbody>
        {dataDetailOrderById.dataDetail !== undefined &&
          dataDetailOrderById.dataDetail.map((item, index) =>
            (
              <tr>
                <td>{index+1}</td>
                <td>
                  <a href={`/product/${item.products.id}`} className="header-cart-item-name m-b-8 hov-cl1 trans-04">{item.products.name}</a>
                  <div className=" col-3 image_detail_order">
                    <ImageCustom
                      src={item.products.image}
                      alt="image_detail_order"
                    />
                  </div>
                  {dataDetailOrderById.dataOrder !== undefined && dataDetailOrderById.dataOrder.status === 6 && (
                    <div className="">

                       <p onClick={checkReviewC} className="text-center btn btn-outline-primary cursor-pointer ">
                          Review
                        </p>


                      {review ? (
                        <ReviewProductItem
                          dataDetailRV={item.products.id}
                          dataCustomer={dataDetailOrderById.dataOrder.customer_id}
                          // checkReview={checkReview}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  )}
                </td>
                <td>{item.amount}</td>
                <td>{formatter.format(item.price)}</td>
                <td>{formatter.format(item.price * item.amount)}</td>
              </tr>
            )
          )
        }
        <tr>
          <td colSpan={3}></td>
          <td><b>Tax</b></td>
          <td>$0</td>
        </tr>
        <tr>
          <td colSpan={3}></td>
          <td><b>Total</b></td>
          <td>   {dataDetailOrderById.dataOrder !== undefined &&
              formatter.format(dataDetailOrderById.dataOrder.total_price)}</td>
        </tr>
        </tbody>
      </Table>

        </>

  );
};

export default OrderHistoryDetail;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderByCustomer } from '../../../api/Client/Order';
import { order_table_header_client } from '../../../asset/data/order_table_header_client';
import OrderHistoryDetail from '../../../components/client/History/DetailOrder';
import { OrderTableClient } from '../../../components/client/History/ListOrder';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { isHistoryDetailSelector } from '../../../redux/selectors/history/history.selector';
import { profileSelector } from '../../../redux/selectors/profile/profile.selector';
import { FaAngleRight } from 'react-icons/fa';
import "./style.css"

export function HistoryOrderPage() {
  const data_order_table_header = [...order_table_header_client];
  const [activeHeader, setActiveHeader] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataListWait, setdataListWait] = useState([]);
  const [dataListToShip, setdataListToShip] = useState([]);
  const [dataListToReceive, setdataListToReceive] = useState([]);
  const [dataListCompleted, setdataListCompleted] = useState([]);
  const [dataListCancelled, setdataListCannelled] = useState([]);
  const [dataListOrder, setdataListOrder] = useState([]);
  const idCustomer = useSelector(profileSelector);
  const detailHistory = useSelector(isHistoryDetailSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetAllOrder(1);
    handleGetAllOrder(2);
    handleGetAllOrder(3);
    handleGetAllOrder(6);
    handleGetAllOrder(7);
  }, [dispatch, idCustomer]);

  const handleGetAllOrder = async (status = 1) => {
    if (status === 1) {
      const result = await getAllOrderByCustomer({
        filterStatus: status,
      });

      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListOrder(result);
        setdataListWait(result);
      }
    }
    if (status === 2) {
      const result = await getAllOrderByCustomer({
        filterStatus: status,
      });

      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListToShip(result);
      }
    }
    if (status === 3) {
      const result = await getAllOrderByCustomer({
        filterStatus: '3,4,5',
      });

      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListToReceive(result);
      }
    }
    if (status === 6) {
      const result = await getAllOrderByCustomer({
        filterStatus: status,
      });

      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListCompleted(result);
      }
    }
    if (status === 7) {
      const result = await getAllOrderByCustomer({
        filterStatus: status,
      });
      setLoading(false);
      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListCannelled(result);
      }
    }
  };
  const handleToWait = () => {
    setActiveHeader(1);
    setdataListOrder(dataListWait);
  };
  const handleToShip = () => {
    setActiveHeader(2);
    setdataListOrder(dataListToShip);
  };
  const handleReceive = () => {
    setActiveHeader(3);
    setdataListOrder(dataListToReceive);
  };
  const handleComplete = () => {
    setActiveHeader(4);
    setdataListOrder(dataListCompleted);
  };
  const handleCancelled = () => {
    setActiveHeader(5);
    setdataListOrder(dataListCancelled);
  };
  return (
    <>
      <section>
        <div className="container mt-5 mb-5">
          <div className="row"></div>
          {detailHistory ? (
            <div className="bread-crumb flex-w  p-t-30 p-lr-0-lg mb-5">
              <a href="./my-account" className="stext-110 cl8 hov-cl1 trans-04">
                Profile
                <FaAngleRight/>
              </a>

              <a href="./history" className="stext-110 cl8 hov-cl1 trans-04">
                My Purchase
                <FaAngleRight/>
              </a>
              <a href="./history" className="stext-110 cl8 hov-cl1 trans-04">
                Detail Invoice
                <FaAngleRight/>
              </a>

            </div>
          ) : (
            <>
              <div className="bread-crumb flex-w  p-t-30 p-lr-0-lg mb-5">
                <a href="./my-account" className="stext-110 cl8 hov-cl1 trans-04">
                  Profile
                  <FaAngleRight/>
                </a>

                <a href="./history" className="stext-110 cl8 hov-cl1 trans-04">
                  My Purchase
                  <FaAngleRight/>
                </a>

              </div>
              <div className="row">
                <div className="container d-flex justify-content-around nav-history">
                  <h5
                    className={`mb-5 fw-bold cursor-pointer margin-0px  ${activeHeader === 1 ? 'active' : ''} `}
                    onClick={handleToWait}
                  >
                    Waitting ({dataListWait.length})
                  </h5>
                  <h5
                    className={`mb-5 fw-bold cursor-pointer margin-0px  ${activeHeader === 2 ? 'active' : ''} `}
                    onClick={handleToShip}
                  >
                    To Ship ({dataListToShip.length})
                  </h5>
                  <h5
                    className={`mb-5 fw-bold cursor-pointer margin-0px  ${activeHeader === 3 ? 'active' : ''} `}
                    onClick={handleReceive}
                  >
                    To Receive ({dataListToReceive.length})
                  </h5>
                  <h5
                    className={`mb-5 fw-bold cursor-pointer margin-0px  ${activeHeader === 4 ? 'active' : ''} `}
                    onClick={handleComplete}
                  >
                    Completed ({dataListCompleted.length})
                  </h5>
                  <h5
                    className={`mb-5 fw-bold cursor-pointer margin-   ${activeHeader === 5 ? 'active' : ''} `}
                    onClick={handleCancelled}
                  >
                    Cancelled ({dataListCancelled.length})
                  </h5>
                </div>
              </div>
            </>
          )}

          <div className="row justify-content-center">
            <>
              {detailHistory ? (
                <OrderHistoryDetail infoCustomer={idCustomer} />
              ) : loading === false && idCustomer !== undefined ? (
                dataListOrder.length > 0 ? (
                  <OrderTableClient tableHeader={data_order_table_header} tableBody={dataListOrder} />
                ) : (
                  <NotFoundData btnLink="Purchase" />
                )
              ) : (
                <Skeleton column={6} />
              )}

              {/* {totalRecord > 10 && (
                    <PaginationUI
                      handlePageChange={handlePageChange}
                      perPage={perPage}
                      totalRecord={totalRecord}
                      currentPage={page}
                    />
                  )} */}
            </>
          </div>
        </div>
      </section>
    </>
  );
}

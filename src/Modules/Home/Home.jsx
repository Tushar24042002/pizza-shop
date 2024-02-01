import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../../Component/Header/Header";
import Classes from "./Home.module.css";
import { updateStage, deleteOrder } from "../Form/FormSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(
    useSelector((state) => state?.rootReducer?.order?.orders) || []
  );
  const [timers, setTimers] = useState({});
  const [orderStages, setOrderStages] = useState([
    {
      id: 1,
      name: "Order Placed",
    },
    {
      id: 2,
      name: "Order in Making",
    },
    {
      id: 3,
      name: "Order Ready",
    },
    {
      id: 4,
      name: "Order Picked",
    },
  ]);

  useEffect(() => {
    const intervalIds = orders.map((order) => {
      const creationTime = new Date(order.creationTime);
      const fixedTime = new Date(order.fixedTime);
      const updateTimer = () => {
        const currentTime = new Date();
        const timeDifference = Math.abs(currentTime - creationTime);
        const minutesDifference = String(Math.floor(timeDifference / (1000 * 60))).padStart(2, '0');
        const secondsDifference = String(Math.floor((timeDifference / 1000) % 60)).padStart(2, '0');
        const secondsCount = Math.floor(timeDifference / 1000);


       
        const fixedTimeDifference = Math.abs(currentTime - fixedTime);
        const fixedMinutesDifference = String(Math.floor(fixedTimeDifference / (1000 * 60))).padStart(2, '0');
        const fixedSecondsDifference = String(Math.floor((fixedTimeDifference / 1000) % 60)).padStart(2, '0');



        setTimers((prevTimers) => ({
          ...prevTimers,
          [order.id]: {
            minutes: minutesDifference,
            seconds: secondsDifference,
            secondsCount: secondsCount,
            fixedMinutesDifference : fixedMinutesDifference,
            fixedSecondsDifference : fixedSecondsDifference
          },
        }));
      };

      updateTimer();
      return setInterval(updateTimer, 1000);
    });

    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [orders]);

  const handleUpdateStage = (orderId) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              stage: order.stage + 1,
              creationTime: new Date().toISOString(),
            }
          : order
      );
    });
    dispatch(updateStage(orderId));
  };


  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
    setOrders((prevOrders) => prevOrders.filter(order => order.id !== id));
    alert(`Order ${id} Deleted Successfully`);
  };

  return (
    <section>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-lg-12">
            <h2>Pizza Stage Section</h2>
          </div>
          {orderStages?.map((data, dataIndex) => {
            return (
              <div className="col-lg-3" key={dataIndex}>
                <div className={Classes.cardtitle}>
                  <h4>{data?.name}</h4>
                </div>
                {orders
                  ?.filter((e) => e?.stage === data?.id)
                  .map((order, index) => (
                    <div className={`${Classes.cardBox} `} key={index}>
                      <div
                        className={`card ${
                         order?.stage != 4 && timers[order.id]?.secondsCount > 180
                            ? Classes.delayCardbox
                            : ""
                        }`}
                      >
                        <div className="card-body text-center">
                          <p>Order {order.id}</p>
                          <p>{`${timers[order.id]?.minutes} min  ${
                            timers[order.id]?.seconds
                          } sec`}</p>
                          {order?.stage < 4 && (
                            <div
                              className="btn btn-light px-4 border border-1"
                              onClick={() => handleUpdateStage(order?.id)}
                            >
                              Next
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {orders
                  ?.filter((e) => e?.stage === data?.id).length === 0 && <div className={Classes.emptyStages}> Empty Stage</div>}
              </div>
            );
          })}
        </div>

        <div className="row mt-5">
        <div className="col-lg-12">
            <h2>Main Section</h2>
          </div>
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-striped table-bordered border-danger">
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Stage</th>
                    <th>Total time spent (time from order placed)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders?.map((data, index)=>{
                      return(
                        <tr>
                          <td>{data?.id}</td>
                          <td>{data.stage}</td>
                          <td>{`${timers[data.id]?.fixedMinutesDifference} min  ${
                            timers[data.id]?.fixedSecondsDifference
                          } sec`}</td>
                          <td>{data?.stage < 3 &&<div className="btn btn-sm btn-primary mx-auto" onClick={()=>handleDeleteOrder(data?.id)}>Cancel</div>}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
                <tfoot className="table-light">
                  <tr className="border-danger">
                    <th>Total Order Delivered</th>
                    <th colSpan={"2"}>{orders?.filter((e)=>e?.stage === 4)?.length}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

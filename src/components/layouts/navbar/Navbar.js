import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  GetNotifications,
  updateNotifications,
} from "../../../store/HomeSlice";
import Pusher from "pusher-js";
import { IoNotificationsOutline } from "react-icons/io5";

import logo from "../../../images/logo.jpg";
import "moment/locale/ar";
import moment from "moment";
const Navbar = ({ name }) => {
  const dispatch = useDispatch();

  // function requestNotificationPermission(data) {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       const options = {
  //         body: data,
  //         icon: logo,
  //         onClick: () => {
  //           console.log("click me");
  //           window.open(`${process.env.REACT_APP_URL}/orders`, "_blank");
  //         },
  //       };
  //       new Notification("رباط الخيل 🦄", options).onclick = (event) => {
  //         event.preventDefault();
  //         window.open(`${process.env.REACT_APP_URL}/orders`, "_blank");
  //       };
  //       // You can now send notifications to the user.
  //     } else {
  //       console.log("Notification permission denied.");
  //     }
  //   });
  // }

  // useEffect(() => {
  //   const pusher = new Pusher("d26693aa1bce991c24a3", {
  //     appId: process.env.REACT_APP_app_id,
  //     secret: process.env.REACT_APP_secret,
  //     cluster: process.env.REACT_APP_cluster,
  //     useTLS: true,
  //   });
  //   // Notification.apply()

  //   var channel = pusher.subscribe("my-channel");
  //   channel.bind("my-event", function (data) {
  //     if (data) {
  //       requestNotificationPermission(data.message);
  //       dispatch(GetNotifications());
  //     }
  //   });
  //   return () => {
  //     pusher.disconnect();
  //   };
  // }, [dispatch]);

  const [show, setShow] = useState(false);
  // const { notificationArr } = useSelector((state) => state.HomeSlice);
  // useEffect(() => {
  //   if (!notificationArr) {
  //     dispatch(GetNotifications());
  //   }
  // }, [notificationArr, dispatch]);

  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };

  // const NotRead = notificationArr?.filter((ele) => !ele.read_at)?.length;
  return (
    <div className="navbar flex align-items-center  justify-content-end ">
      <div className="notification">
        <div className="notification-icon" onClick={() => setShow(!show)}>
          <IoNotificationsOutline />
          <span>0</span>
          {/* {NotRead ? (
            <span>{NotRead > 9 ? "9+" : NotRead}</span>
          ) : (
            <span>0</span>
          )} */}
        </div>
        {/* {show && notificationArr?.length > 0 && (
          <ul className="notification-body">
            {notificationArr.map((ele) => {
              return (
                <li
                  key={ele.id}
                  onClick={() =>
                    dispatch(updateNotifications(ele.id))
                      .unwrap()
                      .then((res) => {
                        if (res.success) {
                          setShow(!show);
                          dispatch(GetNotifications());
                        }
                      })
                  }
                >
                  <Link to={ele.url === "/orders" ? `/orders` : "/products"}>
                    <h3>{ele.title}</h3>
                    <h4>{ele.body}</h4>
                    <p>
                      {moment(ele.created_at).fromNow()} -{" "}
                      {new Date(ele.created_at).toLocaleDateString(
                        "ar-EG",
                        options
                      )}
                    </p>
                  </Link>
                  {!ele.read_at && <span></span>}
                </li>
              );
            })}
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;

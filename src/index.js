// import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App v3";
// import StarRating from "./StarRatingV1";

// import StarRating from "./StarRating";
// function Test() {
//   const [movieRating, setMovieRate] = useState(0)

//   return (
//     <div>
//       <StarRating maxRating={10} color={"blue"} size={24} className={""} onSetRating={setMovieRate} />
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   )
// }

// function Tests() {
//   const [movieRate, setMovieRate] = useState(0);
//   return (
//     <>
//       <StarRating
//         maxRating={10}
//         color={"blue"}
//         size={34}
//         className={""}
//         onSetRating={setMovieRate}
//       ></StarRating>
//       <p>This movie was rated {movieRate} stars</p>
//     </>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  //  </React.StrictMode>
);

// immediately after the app

// {/* <StarRating maxRating={5} />
// <StarRating
//   size={24}
//   color="red"
//   className="test"
//   messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
//   defualtRating={3}
// />
// <Tests /> */}
// {/* <StarRating maxRating={10} /> */}
// {/* <StarRating />1 */}
// {/* <StarRating maxRating={3} color={"orange"} size={24} className={""} />
// <StarRating maxRating={5} color={"red"} rateMessage={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={3} />
// <Test></Test> */}

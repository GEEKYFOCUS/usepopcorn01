import { useState } from "react"
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
// import StarRating from './StarRating';
// function Test() {
//   const [movieRating, setMovieRate] = useState(0)

//   return (
//     <div>
//       <StarRating maxRating={10} color={"blue"} size={24} className={""} onSetRating={setMovieRate} />
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={3} color={"orange"} size={24} className={""} />
    <StarRating maxRating={5} color={"red"} rateMessage={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={3} />
    <Test></Test> */}
  </React.StrictMode>
);



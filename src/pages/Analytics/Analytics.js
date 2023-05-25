import React, { useState, useEffect } from "react";
import "./Analytics.css";
import { reviews } from "./reviews";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(reviews);
  }, []);

  const getAverageRating = () => {
    const totalRatings = data.reduce((acc, curr) => {
      const ratingsSum = curr.reviews.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      return acc + ratingsSum;
    }, 0);
    return (totalRatings / data.length).toFixed(2);
  };

  const getTotalAvailableSizes = () => {
    return data.reduce((acc, curr) => acc + curr.sizes.available, 0);
  };

  const getTotalRevenue = () => {
    return data.reduce(
      (acc, curr) => acc + curr.price * curr.sizes.available,
      0
    );
  };

  return (
    <div>
      <h1>Analytics</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Available Sizes</th>
            <th>Average Rating</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                {item.sizes.available} / {item.sizes.total}
              </td>
              <td>
                {(
                  item.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                  item.reviews.length
                ).toFixed(2)}
              </td>
              <td>
                {item.reviews.map((review) => (
                  <div key={review.comment}>
                    <p>Rating: {review.rating}</p>
                    <p>Comment: {review.comment}</p>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>${getTotalRevenue()}</td>
            <td>{getTotalAvailableSizes()} / {data.reduce((acc, curr) => acc + curr.sizes.total, 0)}</td>
            <td>{getAverageRating()}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

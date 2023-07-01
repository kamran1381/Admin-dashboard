import { useState } from "react";
import "./WidgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"WidgetLgButton " + type}>{type}</button>;
  };

  const [transactions, setTransactions] = useState(() => {
    const statusOptions = ["Approved", "Pending", "Declined"];
    const customerNames = ["John Doe", "Jane Smith", "Alex Johnson", "Max Brown", "Emily Davis"];

    const newTransactions = Array.from({ length: 5 }, (_, index) => {
      const randStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      const randCustomer = customerNames[Math.floor(Math.random() * customerNames.length)];
      const randAmount = (Math.random() * 100).toFixed(2);

      const randDate = new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US");

      return {
        id: index + 1,
        customer: randCustomer,
        date: randDate,
        amount: randAmount,
        status: randStatus,
        img: `https://randomuser.me/api/portraits/thumb/lego/${index + 1}.jpg`,
      };
    });

    return newTransactions;
  });

  return (
    <div className="WidgetLg">
      <h3 className="WidgetLgTitle">Latest Transactions</h3>
      <table className="WidgetLgTable">
        <thead>
          <tr className="WidgetLgTr">
            <th className="WidgetLgTh">Customer</th>
            <th className="WidgetLgTh">Date</th>
            <th className="WidgetLgTh">Amount</th>
            <th className="WidgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="WidgetLgTr">
              <td className="WidgetLgUser">
                <img src={transaction.img} alt="User" className="WidgetLgImg" />
                <span className="WidgetLgName">{transaction.customer}</span>
              </td>
              <td className="WidgetLgDate">{transaction.date}</td>
              <td className="WidgetLgAmount">${transaction.amount}</td>
              <td className="WidgetLgStatus">
                <Button type={transaction.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

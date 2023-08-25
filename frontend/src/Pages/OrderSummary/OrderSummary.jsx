import { useNavigate } from "react-router-dom";
import "./OrderSummary.css";
export const OrderSummary = () => {
    const navigate = useNavigate()
    const handleContinueBooking =()=>{
        navigate("/")
    }

  return (
    <main className="order-summary-main">
      <h1>Order placed Successfully</h1>
      <button className="button btn-primary" onClick={handleContinueBooking}> continue Booking</button>
    </main>
  );
};
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// This function loads the Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function PaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const processPayment = async () => {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Could not load payment gateway. Please try again.");
        return;
      }

      try {
        // Step 1: Initiate payment and get Razorpay order details from your backend
        const response = await axios.post(
          "http://127.0.0.1:8000/api/payments/initiate",
          { order_id: orderId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { razorpay_order_id, amount, currency, key_id, user } =
          response.data.data;

        // Step 2: Open Razorpay Checkout modal
        const options = {
          key: key_id,
          amount: amount,
          currency: currency,
          name: "Carwash Service",
          description: `Payment for Order #${orderId}`,
          order_id: razorpay_order_id,
          handler: async function (response) {
            // Step 3: Verify the payment on your backend
            try {
              await axios.post(
                "http://127.0.0.1:8000/api/payments/verify",
                {
                  ...response,
                  order_id: orderId, // Send your app's order ID
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              toast.success("Payment successful!");
              navigate("/orders"); // Redirect to orders page
            } catch (verifyError) {
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (initError) {
        toast.error("Failed to initiate payment.");
        navigate("/orders");
      }
    };

    processPayment();
  }, [orderId, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Processing Payment...</h1>
        <p>Please do not close this window.</p>
      </div>
    </div>
  );
}

export default PaymentPage;

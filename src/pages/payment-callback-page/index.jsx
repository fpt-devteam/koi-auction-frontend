import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import './index.css';
const orderExample = {
    orderId: "1234567890",
    userName: "John Doe",
    timestamp: "2024-01-01 12:00:00",
    amount: 199.99
};
const statusExample = 'success';

const PaymentCallBackPage = () => {
    const [paymentStatus, setPaymentStatus] = useState(statusExample);
    const [orderDetails, setOrderDetails] = useState(orderExample);
    const location = useLocation();

    // useEffect(() => {
    //     // Extract payment status and order details from URL parameters
    //     const params = new URLSearchParams(location.search);
    //     const status = params.get('status');
    //     const orderId = params.get('orderId');

    //     setPaymentStatus(status);

    //     // Fetch order details (mock API call)
    //     fetchOrderDetails(orderId);
    // }, [location]);

    // const fetchOrderDetails = async (orderId) => {
    //     // TODO: Replace with actual API call
    //     const mockOrderDetails = {
    //         orderId: orderId,
    //         userName: 'John Doe',
    //         timestamp: new Date().toISOString(),
    //     };
    //     setOrderDetails(mockOrderDetails);
    // };

    if (!paymentStatus || !orderDetails) {
        return <div>Loading...</div>;
    }

    return (

        <div className="payment-result-container">
            <h1 className='payment-result-title'>Payment {paymentStatus === 'success' ? 'Successful' : 'Failed'}</h1>
            <div className="order-details">
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>User:</strong> {orderDetails.userName}</p>
                <p><strong>Time:</strong> {moment(orderDetails.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p><strong>Amount:</strong> ${orderDetails.amount.toFixed(2)}</p>
            </div>
            {paymentStatus === 'success' ? (
                <p className="success-message">Thank you for your purchase!</p>
            ) : (
                <p className="error-message">There was an error processing your payment. Please try again.</p>
            )}
        </div>
    );
};

export default PaymentCallBackPage;

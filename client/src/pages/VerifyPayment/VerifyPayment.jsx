import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';

const VerifyPaymentPage = () => {
    const { clearCart } = useCart();
    const { search } = useLocation();
    const navigate = useNavigate();
    const [statusMsg, setStatusMsg] = useState('Verifying payment…');

   
    const token = localStorage.getItem('authToken');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    useEffect(() => {
        const params = new URLSearchParams(search);
        const success = params.get('success');
        const session_id = params.get('session_id');

       
        if (success !== 'true' || !session_id) {
            if (success === 'false') {
               
                navigate('/checkout', { replace: true });
                return;
            }
            setStatusMsg('Payment was not completed.');
            return;
        }

        
        axios.get('https://bitebuzz-backend-9ex9.onrender.com/api/orders/confirm', {
            params: { session_id },
            headers: authHeaders
        })
            .then(() => {
                
                clearCart();
                navigate('/myorder', { replace: true });
            })
            .catch(err => {
                console.error('Confirmation error:', err);
                setStatusMsg('There was an error confirming your payment.');
                clearCart(false);
            });
    }, [search, clearCart, navigate, authHeaders]);

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <p>{statusMsg}</p>
        </div>
    );
};

export default VerifyPaymentPage;
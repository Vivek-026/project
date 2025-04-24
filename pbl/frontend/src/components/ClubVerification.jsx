import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';

function ClubVerification() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyClub = async () => {
            try {
                console.log('Verifying token:', token);
                const response = await fetch(`http://localhost:5000/api/clubs/verify/${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                console.log('Verification response:', data);
                
                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message || 'Club verified successfully');
                    // After 3 seconds, redirect to clubs page
                    setTimeout(() => {
                        navigate('/clubs');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
                setMessage('Failed to connect to server');
            }
        };

        if (token) {
            verifyClub();
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {status === 'verifying' && (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Verifying Club</h2>
                        <p className="mt-2 text-gray-600">Please wait while we verify the club...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Club Verified!</h2>
                        <p className="mt-2 text-gray-600">{message}</p>
                        <p className="mt-2 text-sm text-gray-500">Redirecting to clubs page...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Verification Failed</h2>
                        <p className="mt-2 text-gray-600">{message}</p>
                        <button
                            onClick={() => navigate('/clubs')}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                        >
                            Go to Clubs
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ClubVerification;

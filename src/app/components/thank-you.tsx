// app/thank-you/page.tsx
'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ThankYou() {
    // Clear localStorage on successful submission
    useEffect(() => {
        localStorage.removeItem('paymentScreenshot');
        localStorage.removeItem('gymnastics-registration-store');
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
                {/* Checkmark Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-50 rounded-full">
                        <svg
                            className="w-16 h-16 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Registration Successful!
                </h1>

                {/* Message */}
                <p className="text-lg text-gray-600 mb-8">
                    Thank you for registering with The Gymnastics Academy. Your submission has been received and
                    is being processed. You will receive a confirmation email shortly.
                </p>

                {/* Contact Information */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Need Assistance?
                    </h2>
                    <p className="text-gray-600 mb-2">
                        For any queries, please contact us at:
                    </p>
                    <a
                        href="mailto:thegymnasticsacademy21@gmail.com"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        thegymnasticsacademy21@gmail.com
                    </a>
                </div>

                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-8 py-3 transition-colors duration-200"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
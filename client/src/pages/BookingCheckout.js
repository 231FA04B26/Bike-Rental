import React from 'react';
import { useParams } from 'react-router-dom';

export default function BookingCheckout() {
  const { bikeId } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Booking Checkout</h1>
      <p className="mt-2 text-gray-600">Checkout for bike: {bikeId}</p>
    </div>
  );
}

import React from 'react';
import { useParams } from 'react-router-dom';

export default function BikeDetail() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Bike Detail</h1>
      <p className="mt-2 text-gray-600">Details for bike ID: {id}</p>
    </div>
  );
}

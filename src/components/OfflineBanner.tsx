import React from 'react';

export const OfflineBanner: React.FC = () => {
  return (
    <div className="bg-red-500 text-white p-2 text-center">
      You are currently offline. Check your connection.
    </div>
  );
};

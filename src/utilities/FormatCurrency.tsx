import React from 'react';

interface PriceModelProps {
  value: number; // Assuming price is a number, adjust the type accordingly
  }

const FormatCurrency: React.FC<PriceModelProps> = ({ value }) => {
    // Format the price in VND
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  
    return (
      <>
        {formattedPrice}
        </>
    );
  };

export default FormatCurrency;
import React from 'react';


const FormatCurrency: React.FC<number> = (value) => {
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
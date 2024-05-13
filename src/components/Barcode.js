import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ barcode }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, barcode, {
        format: 'CODE128',
      });
    }
  }, [barcode]);

  return <svg ref={barcodeRef} />;
};

export default Barcode;

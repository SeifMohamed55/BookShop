import React from "react";

const Footer = (): React.ReactNode => {
  return (
    <div className="py-4 px-3 border-top mt-5 d-flex justify-content-between align-items-center">
      <div className="d-flex gap-2">
        <p className="playfair fw-bold">MyBookShelf</p>
        <span className="fw-semibold inter">© 2025</span>
      </div>
    </div>
  );
};

export default Footer;

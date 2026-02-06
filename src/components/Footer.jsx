import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal text-neutral-content fixed bottom-0 footer-center bg-base-300  p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;

import React from "react";
import Link from "next/link";

const Whatsapp = () => {
  return (
    <div className="whatsapp">
      <Link href="https://api.whatsapp.com/send?phone=2349030009108&text=Hello%20Shuttlelane">
        <a target="_blank">
          <img
            src="https://seeklogo.com/images/W/whatsapp-icon-logo-BDC0A8063B-seeklogo.com.png"
            alt=""
          />
        </a>
      </Link>
    </div>
  );
};

export default Whatsapp;

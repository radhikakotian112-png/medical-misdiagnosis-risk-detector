import {
  FaHospital,
  FaUserMd,
  FaHeartbeat,
  FaBrain,
  FaShieldAlt,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar({ t }) {
  return (
    <header className="navbar">

      {/* ================= LEFT SIDE ================= */}

      <div className="navbar-brand">

        {/* Animated Medical Logo */}
        <div className="medical-logo">

          {/* Rotating rings */}
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          {/* Floating particles */}
          <span className="particle particle-one"></span>
          <span className="particle particle-two"></span>
          <span className="particle particle-three"></span>

          {/* Main icon */}
          <div className="main-medical-icon">
            <FaHospital />
          </div>

          {/* Heartbeat */}
          <div className="floating-heart">
            <FaHeartbeat />
          </div>

        </div>


        {/* Title */}
        <div className="brand-text">

          <h2>
            {t.productTitle}
          </h2>

          <p>
            <span className="live-dot"></span>
            {t.clinicalSupport}
          </p>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="doctor-profile">

        {/* Doctor animated icon */}

        <div className="doctor-animation">

          <div className="doctor-ring"></div>

          <div className="doctor-icon">
            <FaUserMd />
          </div>

          <div className="doctor-shield">
            <FaShieldAlt />
          </div>

        </div>


        {/* Doctor details */}

        <div className="doctor-details">

          <h4>
            Dr. Admin
          </h4>

          <span>
            <FaBrain />
            {t.doctorRole}
          </span>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
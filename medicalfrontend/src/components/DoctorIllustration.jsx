export default function DoctorIllustration() {
  return (
    <svg viewBox="0 0 260 340" xmlns="http://www.w3.org/2000/svg" className="doctor-svg">
      <defs>
        <radialGradient id="skinGradient" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#e8c4a0" stopOpacity="1" />
          <stop offset="100%" stopColor="#d9b896" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="coatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f9fafb" stopOpacity="1" />
          <stop offset="100%" stopColor="#f3f4f6" stopOpacity="1" />
        </linearGradient>
      </defs>
      
      {/* Head */}
      <circle cx="130" cy="65" r="28" fill="url(#skinGradient)" className="doctor-head"/>
      
      {/* Hair */}
      <path d="M 105 50 Q 130 28 155 50 Q 160 65 130 70 Q 100 65 105 50" fill="#3d2410" className="doctor-hair"/>
      
      {/* Neck */}
      <rect x="120" y="88" width="20" height="15" fill="#d9b896" className="doctor-neck"/>
      
      {/* Stethoscope */}
      <path d="M 112 95 Q 105 110 115 125" stroke="#0a9370" strokeWidth="3.5" fill="none" strokeLinecap="round" className="stethoscope-left"/>
      <path d="M 148 95 Q 155 110 145 125" stroke="#0a9370" strokeWidth="3.5" fill="none" strokeLinecap="round" className="stethoscope-right"/>
      <circle cx="115" cy="125" r="3.5" fill="#0a9370" className="stethoscope-diaphragm-left"/>
      <circle cx="145" cy="125" r="3.5" fill="#0a9370" className="stethoscope-diaphragm-right"/>
      
      {/* Doctor Coat */}
      <path d="M 100 103 L 95 180 Q 95 195 105 205 L 105 290 L 110 290 L 110 205 L 130 205 L 150 205 L 150 290 L 155 290 L 155 205 Q 165 195 165 180 L 160 103 Z" fill="url(#coatGradient)" stroke="#e5e7eb" strokeWidth="1.5" className="doctor-coat"/>
      
      {/* Coat lapels */}
      <path d="M 115 110 L 120 180" stroke="#dadee4" strokeWidth="1"/>
      <path d="M 145 110 L 140 180" stroke="#d1d5db" strokeWidth="1"/>
      
      {/* Coat buttons */}
      <circle cx="130" cy="125" r="2.5" fill="#706dc6" className="coat-button coat-button-1"/>
      <circle cx="130" cy="150" r="2.5" fill="#150a93" className="coat-button coat-button-2"/>
      <circle cx="130" cy="175" r="2.5" fill="#280a93" className="coat-button coat-button-3"/>
      
      {/* Left Arm */}
      <path d="M 100 115 Q 65 135 55 165" stroke="#d9b896" strokeWidth="9" fill="none" strokeLinecap="round" className="doctor-arm-left"/>
      
      {/* Left Hand */}
      <circle cx="52" cy="168" r="6" fill="#d9b896" className="doctor-hand-left"/>
      
      {/* Clipboard */}
      <rect x="32" y="150" width="28" height="40" rx="3" fill="#fafafa" stroke="#0a9370" strokeWidth="2" className="clipboard-board"/>
      <rect x="40" y="148" width="12" height="8" fill="#0a9370" rx="1" className="clipboard-clip"/>
      <line x1="38" y1="160" x2="56" y2="160" stroke="#930a48" strokeWidth="1.2" opacity="0.6"/>
      <line x1="38" y1="170" x2="56" y2="170" stroke="#210a93" strokeWidth="1.2" opacity="0.6"/>
      <line x1="38" y1="180" x2="56" y2="180" stroke="#7c930a" strokeWidth="1.2" opacity="0.6"/>
      
      {/* Right Arm */}
      <path d="M 160 115 Q 195 125 210 155" stroke="#d9b896" strokeWidth="9" fill="none" strokeLinecap="round" className="doctor-arm-right"/>
      
      {/* Right Hand */}
      <circle cx="212" cy="158" r="6" fill="#d9b896" className="doctor-hand-right"/>
      
      {/* Pants */}
      <path d="M 110 205 L 105 280 L 120 280 L 125 205" fill="#2c3e50" stroke="#1a252f" strokeWidth="0.8" className="pants-left"/>
      <path d="M 140 205 L 135 280 L 150 280 L 155 205" fill="#2c3e50" stroke="#1a252f" strokeWidth="0.8" className="pants-right"/>
      
      {/* Shoes */}
      <ellipse cx="115" cy="283" rx="6" ry="3" fill="#0f1419" className="shoe-left"/>
      <ellipse cx="147" cy="283" rx="6" ry="3" fill="#0f1419" className="shoe-right"/>
      
      {/* Eyes */}
      <circle cx="120" cy="60" r="2" fill="#110f0f" className="eye-left"/>
      <circle cx="140" cy="60" r="2" fill="#1a1a1a" className="eye-right"/>
      
      {/* Smile */}
      <path d="M 120 70 Q 130 76 140 70" stroke="#2d2d2d" strokeWidth="1.5" fill="none" strokeLinecap="round" className="smile"/>
    </svg>
  );
}

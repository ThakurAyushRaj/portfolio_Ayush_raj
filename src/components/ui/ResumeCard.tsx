import React from 'react';

interface ResumeCardProps {
  nameMonogram?: string;
  role?: string;
  className?: string;
  resumeUrl?: string;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  nameMonogram = 'AR',
  role = 'Full Stack Developer & SDE',
  className = '',
  resumeUrl = 'https://github.com/ThakurAyushRaj'
}) => {
  return (
    <div className={`resume-3d-wrapper inline-block ${className}`}>
      {/* From Uiverse.io by Javierrocadev */}
      <div className="resume-3d-card group">
        {/* Monogram & Title */}
        <div className="text-gray-50 relative z-20">
          <span className="font-display font-extrabold text-5xl tracking-tight leading-none text-white block">
            {nameMonogram}
          </span>
          <p className="text-xs font-mono font-medium text-sky-200 mt-1 tracking-wide">
            {role}
          </p>
        </div>

        {/* Download Action Button */}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          download="Ayush_Raj_Resume.pdf"
          className="resume-3d-btn"
          title="Download Ayush Raj's Resume / CV"
        >
          <span>Download CV</span>
          <svg
            y="0"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            width="100"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            height="100"
            className="w-5 h-5 fill-current"
          >
            <path
              fillRule="evenodd"
              d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z"
            />
          </svg>
        </a>

        {/* Decorative Vector Avatar Silhouette 1 */}
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className="resume-avatar-svg fill-gray-50 stroke-sky-950"
        >
          <path
            strokeWidth="5"
            strokeMiterlimit="10"
            d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z"
            data-name="layer1"
          />
        </svg>

        {/* Decorative Vector Avatar Silhouette 2 */}
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className="resume-avatar-svg fill-gray-50 stroke-sky-700"
        >
          <path
            strokeWidth="2"
            strokeMiterlimit="10"
            d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z"
            data-name="layer1"
          />
        </svg>
      </div>
    </div>
  );
};

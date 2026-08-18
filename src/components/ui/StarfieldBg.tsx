import React from 'react';

export const StarfieldBg: React.FC = () => {
  return (
    <div className="starfield-bg" aria-hidden="true">
      {/* Deep Space Parallax Stars */}
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />

      {/* Ethereal Atmospheric Nebula Glows */}
      <div className="cyber-nebula-cyan" />
      <div className="cyber-nebula-purple" />
      <div className="cyber-nebula-blue" />

      {/* Occasional Cyber Shooting Stars */}
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div className="shooting-star shooting-star-3" />
      <div className="shooting-star shooting-star-4" />
    </div>
  );
};

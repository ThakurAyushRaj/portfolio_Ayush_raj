import React from 'react';

interface DayNightSwitchProps {
  isDark: boolean;
  onToggle: (isDark: boolean) => void;
  scale?: number;
  className?: string;
}

export const DayNightSwitch: React.FC<DayNightSwitchProps> = ({
  isDark,
  onToggle,
  scale = 0.44,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: `${90 * scale}px`,
        height: `${90 * scale}px`,
      }}
    >
      <label
        className="theme-switch"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          margin: 0,
        }}
        title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
        aria-label="Toggle day and night theme"
      >
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <div className="switch-bg">
          {/* Rotating Sun / Moon Orbital Sky */}
          <div className="sky-vault">
            <div className="sun" />
            <div className="moon">
              <div className="craters">
                <div className="crater crater-1" />
                <div className="crater crater-2" />
                <div className="crater crater-3" />
              </div>
            </div>
          </div>

          {/* Daytime Clouds */}
          <div className="sky-clouds">
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
          </div>

          {/* Nighttime Stars */}
          <div className="sky-stars">
            <div className="star star-1" />
            <div className="star star-2" />
            <div className="star star-3" />
            <div className="star star-4" />
          </div>

          {/* Foreground Mountains, Terrain & Pine Trees */}
          <div className="landscape">
            <div className="mountain mountain-1" />
            <div className="mountain mountain-2" />
            <div className="terrain" />
            <div className="tree tree-1" />
            <div className="tree tree-2" />
            <div className="tree tree-3" />
          </div>
        </div>
      </label>
    </div>
  );
};

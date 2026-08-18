import React from 'react';

interface BB8ToggleProps {
  isDark?: boolean;
  onToggle?: (isDark: boolean) => void;
  className?: string;
  size?: string;
}

export const BB8Toggle: React.FC<BB8ToggleProps> = ({
  isDark = true,
  onToggle,
  className = '',
  size = '8px',
}) => {
  return (
    <label
      className={`bb8-toggle ${className}`}
      style={{ '--toggle-size': size } as React.CSSProperties}
      title={isDark ? 'Switch to Light Mode (Desert Day)' : 'Switch to Dark Mode (Starry Space)'}
      aria-label="Toggle Star Wars BB-8 appearance theme"
    >
      <input
        className="bb8-toggle__checkbox"
        type="checkbox"
        checked={isDark}
        onChange={(e) => onToggle && onToggle(e.target.checked)}
      />
      <div className="bb8-toggle__container">
        <div className="bb8-toggle__scenery">
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="tatto-1" />
          <div className="tatto-2" />
          <div className="gomrassen" />
          <div className="hermes" />
          <div className="chenini" />
          <div className="bb8-toggle__cloud" />
          <div className="bb8-toggle__cloud" />
          <div className="bb8-toggle__cloud" />
        </div>
        <div className="bb8">
          <div className="bb8__head-container">
            <div className="bb8__antenna" />
            <div className="bb8__antenna" />
            <div className="bb8__head" />
          </div>
          <div className="bb8__body" />
        </div>
        <div className="artificial__hidden">
          <div className="bb8__shadow" />
        </div>
      </div>
    </label>
  );
};

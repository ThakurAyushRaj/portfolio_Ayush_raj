import React from 'react';

interface FuturisticInputProps {
  id?: string;
  name?: string;
  type?: string;
  label: string; // e.g. 'NAME', 'EMAIL', 'SUBJECT', 'MESSAGE'
  topText?: string; // e.g. 'ENTER'
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
  rows?: number;
  error?: string;
  required?: boolean;
  className?: string;
}

export const FuturisticInput: React.FC<FuturisticInputProps> = ({
  id,
  name,
  type = 'text',
  label,
  topText = 'ENTER',
  value,
  onChange,
  isTextarea = false,
  rows = 3,
  error,
  required = true,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      <div className={`futuristic-input ${isTextarea ? 'futuristic-input-textarea' : ''} ${error ? 'futuristic-input-error' : ''}`}>
        {/* Top Decorative Geometric Header */}
        <div className="futuristic-input-space">
          <div className="triangle-input-left" />
          <div className="triangle-input-bar" />
          <div className="triangle-input-right" />
        </div>

        <p className="futuristic-input-enter">{topText}</p>

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            required={required}
            className="futuristic-inner-input resize-none"
            placeholder=""
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="futuristic-inner-input"
            placeholder=""
          />
        )}

        <p className="futuristic-input-name">{label}</p>

        {/* Bottom Decorative Geometric Footer */}
        <div className="futuristic-input-space2">
          <div className="triangle-input-left2" />
          <div className="triangle-input-bar3" />
          <div className="triangle-input-right2" />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-400 font-mono pl-1 pt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};

import React from 'react';

interface FluidComplementBgProps {
  isDark?: boolean;
}

export const FluidComplementBg: React.FC<FluidComplementBgProps> = ({ isDark = true }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Pitch Black Canvas Background */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-[#000000]'
            : 'bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]'
        }`}
      />

      {/* 2. Micro-Dot Matrix Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.20]"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`
            : `radial-gradient(rgba(15, 23, 42, 0.12) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* 3. Architectural Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.12] dark:opacity-[0.05]"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(15,23,42,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.1) 1px, transparent 1px)`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* 4. Deep Pitch Black Vignette */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark
            ? 'bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.95)_100%)]'
            : 'bg-[radial-gradient(circle_at_center,transparent_50%,rgba(226,232,240,0.6)_100%)]'
        }`}
      />
    </div>
  );
};

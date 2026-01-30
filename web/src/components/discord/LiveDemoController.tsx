"use client";

import { useState } from "react";

export default function LiveDemoController({
  onStart,
  onPause,
  onReset,
  isPlaying,
  currentStep = 0,
  totalSteps = 0
}: any) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        backgroundColor: '#5865F2',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        minWidth: '280px',
      }}
    >
      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>⚡ 实时演示控制台</h3>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0',
          }}
        >
          ✕
        </button>
      </div>

      {totalSteps > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', marginBottom: '4px', color: 'rgba(255, 255, 255, 0.8)' }}>
            进度: {currentStep} / {totalSteps}
          </div>
          <div style={{ height: '6px', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                backgroundColor: '#57F287',
                width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button
          onClick={isPlaying ? onPause : onStart}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
        >
          {isPlaying ? '⏸ 暂停' : '▶ 开始演示'}
        </button>
        <button
          onClick={onReset}
          style={{
            padding: '10px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
        >
          🔄
        </button>
      </div>

      <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
        {isPlaying ? '▼ 演示进行中...' : '● 演示已暂停'}
      </div>
    </div>
  );
}

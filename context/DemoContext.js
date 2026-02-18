import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_TRANSITION } from '@lib/transitions';

const DemoContext = createContext(null);

export function DemoProvider({ children, initialSpeed, initialTransition }) {
  const [speed, setSpeedState] = useState(initialSpeed || 'fast');
  const [transition, setTransitionState] = useState(initialTransition || DEFAULT_TRANSITION);
  const [lcpData, setLcpData] = useState(null);

  // Sync localStorage on mount
  useEffect(() => {
    localStorage.setItem('blur-poc-speed', speed);
    localStorage.setItem('blur-poc-transition', transition);
  }, [speed, transition]);

  const setSpeed = useCallback((value) => {
    setSpeedState(value);
    localStorage.setItem('blur-poc-speed', value);
  }, []);

  const setTransition = useCallback((value) => {
    setTransitionState(value);
    localStorage.setItem('blur-poc-transition', value);
  }, []);

  return (
    <DemoContext.Provider
      value={{
        speed,
        setSpeed,
        transition,
        setTransition,
        lcpData,
        setLcpData,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_TRANSITION } from '@lib/transitions';

const DemoContext = createContext(null);

export function DemoProvider({ children }) {
  const [speed, setSpeedState] = useState('fast');
  const [transition, setTransitionState] = useState(DEFAULT_TRANSITION);
  const [lcpData, setLcpData] = useState(null);

  // Hydrate from URL query params (priority) then localStorage (fallback)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSpeed = params.get('speed');
    const urlTransition = params.get('transition');

    const newSpeed = urlSpeed || localStorage.getItem('blur-poc-speed') || 'fast';
    const newTransition = urlTransition || localStorage.getItem('blur-poc-transition') || DEFAULT_TRANSITION;

    setSpeedState(newSpeed);
    setTransitionState(newTransition);
    localStorage.setItem('blur-poc-speed', newSpeed);
    localStorage.setItem('blur-poc-transition', newTransition);
  }, []);

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

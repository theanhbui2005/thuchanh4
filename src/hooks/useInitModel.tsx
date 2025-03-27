import { useState } from 'react';

export const useInitModel = <T extends Record<string, any>>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const setStateField = <K extends keyof T>(field: K, value: T[K]) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  const updateState = (newState: Partial<T>) => {
    setState((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  return {
    state,
    setState,
    setStateField,
    resetState,
    updateState,
  };
};

import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePreviousLocation() {
  const location = useLocation();
  const prevLocationRef = useRef();

  useEffect(() => {
    prevLocationRef.current = location;
  }, [location]);

  return prevLocationRef.current;
}
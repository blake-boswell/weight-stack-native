import React, { useContext, useEffect } from 'react';
import { PortalContext } from './context/PortalContext';

export interface PortalGateProps {
  to: string;
  id: string;
  children: React.ReactNode;
}

const Portal = ({ to, id, children }: PortalGateProps) => {
  const { updatePortal, removePortal } = useContext(PortalContext);

  useEffect(() => {
    updatePortal(to, id, children);

    return () => {
      removePortal(to, id);
    };
  }, [children]);

  return null;
};

export default Portal;

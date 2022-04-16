import React, { useState } from 'react';
import { PortalType } from '../../types/Portal/PortalTypes';
import { PortalContext } from './context/PortalContext';

interface PortalProviderProps {
  children: JSX.Element;
}

const PortalProvider = ({ children }: PortalProviderProps) => {
  const [hosts, setHosts] = useState<Record<string, PortalType[]> | null>(null);

  const registerHost = (hostName: string) => {
    if (!hosts?.hasOwnProperty(hostName)) {
      setHosts((prevHosts) => ({ ...prevHosts, [hostName]: [] }));
    }
  }

  const unregisterHost = (hostName: string) => {
    if (hosts?.hasOwnProperty(hostName)) {
      setHosts((prevHosts) => {
        if (prevHosts) {
          delete prevHosts[hostName];
        }
        return prevHosts;
      });
    }
  };

  const updatePortal = (hostName: string, key: string, node: React.ReactNode) => {
    // Check if host exists
    if (!hosts?.hasOwnProperty(hostName)) {
      setHosts((prevHosts) => ({ ...prevHosts, [hostName]: [] }));
    }

    // Check if portal key already exists for node update
    const portalIndex = hosts ? hosts[hostName].findIndex((portal) => portal.key === key) : -1;
    if (portalIndex > -1) {
      // Already exists. Update node
      setHosts((prevHosts) => {
        if (prevHosts) {
          // Update portal contents
          prevHosts[hostName][portalIndex].node = node;
        }
        return prevHosts;
      });
    } else {
      // New portal. Add to host
      setHosts((prevHosts) => {
        if (prevHosts) {
          // Add new portal to host
          prevHosts[hostName].push({ key, node });
        }
        return prevHosts;
      });
    }
  }

  const removePortal = (hostName: string, key: string) => {
    // Check if host exists
    if (hosts?.hasOwnProperty(hostName)) {
      const portalIndex = hosts ? hosts[hostName].findIndex((portal) => portal.key === key) : -1;

      if (portalIndex > -1) {
        setHosts((prevHosts) => {
          if (prevHosts) {
            // Remove portal from host
            prevHosts[hostName].splice(portalIndex, 1);
          }

          return prevHosts;
        });
      }
    }
  }

  return (
    <PortalContext.Provider value={{ hosts, registerHost, unregisterHost, updatePortal, removePortal }}>
      {children}
    </PortalContext.Provider>
  );
};

export default PortalProvider;

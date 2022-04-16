import React from 'react';
import { PortalType } from '../../../types/Portal/PortalTypes';

interface PortalContextType {
  hosts: Record<string, PortalType[]> | null;
  registerHost: (hostName: string) => void;
  unregisterHost: (hostName: string) => void;
  updatePortal: (hostName: string, name: string, node: React.ReactNode) => void;
  removePortal: (hostName: string, name: string) => void;
}

export const PortalContext = React.createContext<PortalContextType>({
  hosts: null,
  registerHost: (hostName: string) => {
    return;
  },
  unregisterHost: (hostName: string) => {
    return;
  },
  updatePortal: (hostName: string, key: string, node: React.ReactNode) => {
    return;
  },
  removePortal: (hostName: string, key: string) => {
    return;
  },
});

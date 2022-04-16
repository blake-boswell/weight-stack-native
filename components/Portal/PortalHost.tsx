import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { PortalContext } from './context/PortalContext';

export interface PortalGateProps {
  name: string;
}

const PortalHost = ({ name }: PortalGateProps) => {
  const { hosts, registerHost, unregisterHost } = useContext(PortalContext);

  useEffect(() => {
    registerHost(name);

    return () => {
      unregisterHost(name);
    }
  }, [name]);

  return (
    <View style={{ position: 'relative' }}>
      {hosts?.hasOwnProperty(name) ?
        hosts[name].map((portal) => (
          <View style={{ position: 'relative' }} key={portal.key}>
            {portal.node}
          </View>
        ))
      :
        null
      }
    </View>
  );
}

export default PortalHost;

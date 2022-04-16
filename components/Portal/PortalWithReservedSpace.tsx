import React, { useContext, useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { PortalContext } from './context/PortalContext';
import { PortalGateProps } from './Portal';

const PortalWithReservedSpace = ({ to, id, children }: PortalGateProps) => {
  const { updatePortal, removePortal } = useContext(PortalContext);
  const [originalX, setOriginalX] = useState(0);
  const [originalY, setOriginalY] = useState(0);

  useEffect(() => {
    updatePortal(
      to,
      id,
      <View style={{ position: 'absolute', left: originalX, top: originalY }}>
        {children}
      </View>,
    );

    return () => {
      removePortal(to, id);
    };
  }, [children]);

  const calculatePortalChildPosition = (e: LayoutChangeEvent) => {
    setOriginalX(e.nativeEvent.layout.x);
    setOriginalY(e.nativeEvent.layout.y);
    console.log(e.nativeEvent.layout);
  };

  return (
    <View onLayout={calculatePortalChildPosition} style={{ opacity: 0 }}>
      {children}
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </View>
  );
};

export default PortalWithReservedSpace;

import { View, ViewProps, ViewStyle } from 'react-native';
import { Children } from 'react';

export interface GapProps extends ViewProps {
  children: React.ReactNode;
  size?: number;
  horizontal?: boolean;
  style?: ViewStyle;
  flex?: number;
  divider?: React.ReactNode;
}

export function Gap({
  size = 4,
  horizontal,
  style,
  flex = horizontal ? 1 : undefined,
  divider,
  children,
  ...rest
}: GapProps) {
  const flexDirection = horizontal ? 'row' : 'column';

  const styleKey = horizontal ? 'width' : 'height';

  return (
    <View style={[{ flexDirection }, style]} {...rest}>
      {Children.map(children, (child, index) => {
        return (
          <>
            {index > 0
              ? divider || <View style={{ [styleKey]: size }} />
              : null}
            {child}
          </>
        );
      })}
    </View>
  );
}

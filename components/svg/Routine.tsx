import React, { SVGProps } from 'react';
import Svg, { Line, Path } from 'react-native-svg';

export interface RoutineProps extends SVGProps<SVGElement> {
  size?: number;
}

const Routine = ({ fill = 'none', size = 24, stroke, color }: RoutineProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke || ''}
    color={color}
  >
    <Path
      d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Line x1="9" y1="8.5" x2="17" y2="8.5" stroke="currentColor" />
    <Line x1="9" y1="11.5" x2="17" y2="11.5" stroke="currentColor" />
    <Line x1="9" y1="14.5" x2="17" y2="14.5" stroke="currentColor" />
    <Line x1="9" y1="17.5" x2="17" y2="17.5" stroke="currentColor" />
    <Line x1="6" y1="8.5" x2="8" y2="8.5" stroke="currentColor" />
    <Line x1="6" y1="11.5" x2="8" y2="11.5" stroke="currentColor" />
    <Line x1="6" y1="14.5" x2="8" y2="14.5" stroke="currentColor" />
    <Line x1="6" y1="17.5" x2="8" y2="17.5" stroke="currentColor" />
  </Svg>
);

export default Routine;

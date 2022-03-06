import React, { SVGProps } from 'react';
import Svg, { Line, Path } from 'react-native-svg';

export interface DumbellProps extends SVGProps<SVGElement> {
  size?: number;
}

const Dumbell = ({ fill = 'black', size = 24, stroke }: DumbellProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke || ''}
  >
    <Line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke={stroke ? stroke : fill}
      stroke-width="2"
      stroke-linecap="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.6472 4.48334C18.1941 4.75929 18 5.29793 18 5.82838V9C17.4477 9 17 9.44772 17 10V14C17 14.5523 17.4477 15 18 15V17.1715C18 17.7019 18.2053 18.2254 18.6664 18.4875C19.2933 18.8439 20.2919 19.1629 21.3529 18.5165C21.8059 18.2405 22 17.7019 22 17.1715V5.82838C22 5.29793 21.7946 4.77446 21.3335 4.51233C20.7066 4.15601 19.7081 3.83707 18.6472 4.48334Z"
      fill={fill}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.64716 4.48334C2.19415 4.75929 2 5.29793 2 5.82838V17.1715C2 17.7019 2.20533 18.2254 2.66644 18.4875C3.2933 18.8439 4.2919 19.1629 5.35291 18.5165C5.80588 18.2405 6 17.7019 6 17.1715V15C6.55228 15 7 14.5523 7 14V10C7 9.44772 6.55228 9 6 9V5.82838C6 5.29793 5.79465 4.77446 5.33349 4.51233C4.70664 4.15601 3.7081 3.83707 2.64716 4.48334Z"
      fill={fill}
    />
  </Svg>
);

export default Dumbell;

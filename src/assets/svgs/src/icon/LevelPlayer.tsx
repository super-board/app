import React from "react";

import {Path, Svg} from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

export default function LevelPlayer({width = 10, height = 10, fill = "#6C717F"}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M21.2702 13.5C22.5299 12.0272 23.2309 10.1579 23.2502 8.21997C23.2502 6.03989 22.3842 3.94902 20.8427 2.40747C19.3011 0.865922 17.2104 0 15.0303 0C12.8502 0 10.7593 0.865922 9.21777 2.40747C7.67622 3.94902 6.81021 6.03989 6.81021 8.21997C6.8165 10.1603 7.51911 12.034 8.79022 13.5C6.17994 14.6941 3.96706 16.6119 2.41431 19.0261C0.861555 21.4403 0.0341917 24.2497 0.0302734 27.1201C0.0302734 27.9158 0.346296 28.6786 0.908905 29.2412C1.47151 29.8038 2.23462 30.1201 3.03027 30.1201H27.2103C28.0059 30.1201 28.7689 29.8038 29.3315 29.2412C29.8942 28.6786 30.2103 27.9158 30.2103 27.1201C30.1907 24.2299 29.3365 21.4069 27.7505 18.9906C26.1645 16.5743 23.9142 14.6676 21.2702 13.5Z"
        fill={fill}
      />
    </Svg>
  );
}

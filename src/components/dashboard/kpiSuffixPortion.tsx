import React from 'react';
import { Typography, theme } from 'antd';


interface Props {
  stringValue:string;
  isDown?: boolean;
  downColor?: string;
}

const {Text} = Typography;
const { useToken } = theme;

export const KpiSuffixPortion: React.FC<Props> = ({ stringValue, isDown=false, downColor = '#FC6363' }) => {
    const { token } = useToken();
  return (
    <Text style={{
        fontWeight:'normal',
        fontSize:token.fontSizeSM,
        color: isDown ? downColor : '#48BB78'
    }}
    >{stringValue}%</Text>
  );
};

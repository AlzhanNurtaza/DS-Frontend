import React from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

interface TrendProps {
  isDown?: boolean;
  downColor?: string;
}

export const Trend: React.FC<TrendProps> = ({ isDown=false, downColor = '#FC6363' }) => {
  return (
    <span style={{ color: isDown ? downColor : '#48BB78' }}>
      {isDown ? <CaretDownOutlined /> : <CaretUpOutlined />}
    </span>
  );
};

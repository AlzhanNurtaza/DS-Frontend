import React from 'react';
import { DatePicker } from 'antd';
import dtRu from 'antd/es/date-picker/locale/ru_RU';
import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru'; 

dayjs.extend(quarterOfYear);
dayjs.extend(updateLocale);

type QuarterPickerProps = {
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null, dateString: string) => void;
  locale?:string
};

export const QuarterPicker: React.FC<QuarterPickerProps> = ({ value, onChange, locale }) => {


  const formatQuarter = (date: Dayjs) => {
    if (!date) return '';
    const quarter = date.quarter();
    const year = date.year();
    const word = locale === 'en' ? 'Q' : ' квартал';
    return `${year}-${quarter}${word}`;
  };


  const datePickerLocale: typeof dtRu = {
    ...dtRu,
    lang: {
      ...dtRu.lang,
      quarterFormat:locale=="en"?"Q":"Q-квл"
    },
  };

  // Handle quarter selection
  const handleQuarterChange = (date: Dayjs | null, dateString: string) => {
    if (onChange) {
      onChange(date, dateString);
    }
  };

  return (
    <DatePicker
      picker="quarter"
      locale={datePickerLocale}
      onChange={handleQuarterChange}
      value={value}
      format={formatQuarter}
    />
  );
};


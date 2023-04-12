import React, { useCallback, useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import {
  FORMAT_DATE,
  FORMAT_MONTH,
  FORMAT_QUANTER,
  FORMAT_YEAR,
} from "@utils/constants";

const DatePickerComponent = (props) => {
  const {
    defaultValue,
    format,
    form,
    formKey,
    picker,
    notClear,
    disabledDate,
    inputReadOnly = false,
  } = props;

  const [defaultDate, setDefaultDate] = useState(defaultValue);

  //get default date
  useEffect(() => {
    let convert = "";
    if (defaultValue === null) {
      convert = undefined;
    } else convert = moment(defaultValue).format(format);

    form.setFieldsValue({
      [formKey]: convert,
    });
    setDefaultDate(convert);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, formKey, format]);

  //change date
  const handleChange = useCallback(
    (date, dateString) => {
      let convert = "";
      if (date === null) convert = null;
      else if (picker === "quarter")
        convert = moment(dateString.split("-")[0])
          .quarter(dateString.split("-")[1][1])
          .startOf("quarter");
      else convert = moment(date).format(format);

      form.setFieldsValue({
        [formKey]: convert,
      });
      setDefaultDate(convert);
    },
    [form, formKey, format, picker]
  );

  //type format date
  const renderFormatDate = useCallback(() => {
    switch (picker) {
      case "month":
        return FORMAT_MONTH;
      case "year":
        return FORMAT_YEAR;
      case "quarter":
        return FORMAT_QUANTER;
      default:
        return FORMAT_DATE;
    }
  }, [picker]);

  return (
    <DatePicker
      locale={locale}
      format={renderFormatDate()}
      allowClear={notClear ? false : true}
      defaultValue={defaultDate}
      onChange={handleChange}
      picker={picker}
      value={
        (form &&
          form.getFieldValue(formKey) &&
          moment(form.getFieldValue(formKey))) ||
        null
      }
      disabledDate={disabledDate}
      disabled={inputReadOnly}
    />
  );
};

export default React.memo(DatePickerComponent);

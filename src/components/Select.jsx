import React, { useEffect, useState, useCallback } from 'react';
import { Select } from 'antd';
import { authGetData } from '~/utils/request';
import { removeAccents } from '~/utils/function';
const { Option } = Select;
const Selection = (props) => {
    const {
        // selectiName = "name",
        url,
        placeholder = 'Tất cả',
        form,
        formKey,
        disabled,
        mode,
        setValue,
        handleDeselect,
        notClear,
        defaultValue,
        isCustom,
        valueKey,
        valueName,
    } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(typeof url === 'string' ? [] : url);

    const getData = useCallback(() => {
        authGetData({
            url,
            setLoading,
            onSuccess: (res) => {
                if (res.length > 0) setData(res);
                else setData(res.data);
            },
        });
    }, [url]);

    useEffect(() => {
        if (url && typeof url === 'string') {
            getData();
        }
    }, [getData, url]);
    const handleChange = useCallback(
        (value) => {
            if (form) {
                form.setFieldsValue({
                    [formKey]: value,
                });
            }
            if (setValue) {
                setValue(value);
            }
        },
        [form, formKey, setValue],
    );
    return (
        <Select
            defaultValue={defaultValue}
            maxTagCount={mode === 'multiple' || 'tags' ? 'responsive' : null}
            value={form && form.getFieldValue(formKey)}
            placeholder={placeholder}
            showSearch
            mode={mode}
            allowClear={notClear ? false : true}
            loading={loading}
            onChange={handleChange}
            onDeselect={handleDeselect}
            disabled={disabled}
            style={{ width: '100%' }}
            filterOption={(input, option) => {
                console.log(input);
                if (option && option.children) {
                    console.log('options: ' + option);
                    return (
                        removeAccents(option.children).toLowerCase().indexOf(removeAccents(input).toLowerCase()) >= 0
                    );
                }
            }}
        >
            {data && data.length
                ? data.map((item, idx) => (
                      <Option
                          key={idx}
                          value={
                              item.value
                                  ? item.value.toString().toLowerCase()
                                  : isCustom && valueKey
                                  ? item[valueKey]
                                  : item.value
                          }
                      >
                          {/* {item[selectiName]} */}
                          {isCustom && valueName ? item[valueName] : item.name}
                      </Option>
                  ))
                : undefined}
        </Select>
    );
};

export default Selection;

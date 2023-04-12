import React, { useCallback } from 'react';
import { Form } from 'antd';

import styled from 'styled-components';
export default function FormComponent(props) {
    const { form } = props;
    const handleFieldsChange = useCallback(
        (changedFields) => {
            const fieldName =
                changedFields && changedFields[0] && changedFields[0].name && changedFields[0].name[0]
                    ? changedFields[0].name[0]
                    : null;
            form.setFields([
                {
                    name: fieldName,
                    errors: false,
                },
            ]);
        },
        [form],
    );
    return (
        <FormStyled onFieldsChange={handleFieldsChange} {...props} form={form} autoComplete="off" scrollToFirstError>
            {props.children}
        </FormStyled>
    );
}

const FormStyled = styled(Form)`
    .ant-input::placeholder {
        font-size: 14px;
    }
    .ant-form-item-explain-error {
        padding: 4px 0px;
        font-size: 12px;
    }
`;

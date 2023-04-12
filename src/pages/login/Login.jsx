import { Form, Input, Spin, Button } from 'antd';
import './login.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import allActions from '~/store/actions';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import { postData } from '~/utils/request';
import { STATUSCODE_200 } from '~/utils/constants';

export default function Login() {
    const [loading, setLoading] = useState(false);
    var token = localStorage.getItem('accessToken');
    var dispatch = useDispatch();
    var navigate = useNavigate();

    const [form] = Form.useForm();

    const onFinish = (values) => {
        postData({
            url: `${Endpoint.LOGIN}`,
            method: 'POST',
            payload: {
                ...values,
            },
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === STATUSCODE_200 && res.data) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    console.log(res.data.accessToken);
                    dispatch(allActions.userActions.setUser(res.data));
                    navigate('/');
                } else {
                    getErrorForm(res, form);
                }
            },
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return token != null && token != undefined ? (
        <Navigate to="/" />
    ) : (
        <div className="login-page">
            <Spin spinning={loading}>
                <div className="login-box">
                    <div className="illustration-wrapper">{/* <img src={companyLogo} alt="Login" /> */}</div>
                    <Form
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <p className="form-title" style={{ textAlign: 'center' }}>
                            Đăng nhập
                        </p>
                        <p></p>
                        <Form.Item
                            name="userName"
                            // rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
                        >
                            <Input
                                placeholder="Username"
                                style={{
                                    height: 50,
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            // rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <p></p>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </div>
    );
}

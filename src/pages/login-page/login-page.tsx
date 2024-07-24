import React from 'react';
import type { FormProps } from 'antd';
import { Alert, Button, Form, Input } from 'antd';
import axios from 'axios';
import { useAuth } from '../../context/auth-context';

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { login } = useAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    setError(null);

    axios.post(`${process.env.REACT_APP_API_URL}/auth/local`, {
      identifier: values.username,
      password: values.password,
    }).then(response => {
      login(response.data.jwt);
    }).catch(error => {
      console.error('Login failed', error);
      setError(error.message);
    }).finally(() => {
      setLoading(false);
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="w-full max-w-[600px] border rounded p-6 bg-gray-100">
        <h1 className="mb-6 text-3xl font-bold text-center">Авторизация в SomeDev Taskboard</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            layout="vertical"
            label="Логин или email"
            name="username"
            className="mb-10"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            layout="vertical"
            label="Пароль"
            name="password"
            className="mb-12"
          >
            <Input.Password />
          </Form.Item>

          {!!error && (
            <Alert type="error" message={error} banner className="mb-4" />
          )}


          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {loading ? 'Загрузка...' : 'Войти'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

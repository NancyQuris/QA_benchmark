import React, { Component } from 'react';
import { Form } from 'antd';
import RegisterForm from '../component/RegisterForm';
import '../style/Page.css';

const WrappedRegisterForm = Form.create({ name: 'register' })(RegisterForm);

class RegisterPage extends Component {
  render() {
    return (
      <div className='login-page'>
        <WrappedRegisterForm />
      </div>
    );
  }
}
export default RegisterPage;
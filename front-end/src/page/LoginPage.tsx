import React, { Component } from 'react';
import { Form } from 'antd';
import LoginForm from '../component/LoginForm';
import '../style/Page.css';

const WrappedLoginForm = Form.create({ name: 'log in' })(LoginForm);

class LoginPage extends Component {
  render() {
    return (
      <div>
        <WrappedLoginForm />
      </div>        
    );
  }
}
export default LoginPage;
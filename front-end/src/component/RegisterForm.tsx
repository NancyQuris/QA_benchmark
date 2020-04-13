import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface IProps extends FormComponentProps { 
}

interface IState {
  confirmDirty: boolean;
  return: any;
  visible: boolean;
}

class RegisterForm extends React.Component<IProps, IState> {
  state = {
    confirmDirty: false,
    return: [],
    visible: false
  };

  displayMessage = 'register failed, please try again';

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values:any) => {
      if (!err) {
        console.log('Received values of form: ', values);

        fetch('/api/user/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          })
        }).then(res => {
          if (res.status === 200) {
            this.displayMessage = 'register succeed';
          }
          res.json();
        })
        .then((data) => {this.setState({ return: data })})
        .catch(console.log);
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className='form'>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 70 }} onClick={this.showModal}>
            Register
          </Button>
          <Button type="default" href='/'>
            go back to log in
          </Button>
          <Modal 
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>
             {this.displayMessage}
            </p>
          </Modal>
        </Form.Item>
      </Form>
    );
  }
}

export default RegisterForm;
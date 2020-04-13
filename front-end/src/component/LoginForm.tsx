import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import '../style/Form.css';
import { FormComponentProps } from 'antd/es/form';
import AnnotationPage from '../page/AnnotationPage';

interface IProps extends FormComponentProps { 
}

interface IState {
}

class LoginForm extends React.Component<IProps, IState> {

  state = {
    visible: false,
    success: false,
    userId: 0,
    userEmail: '',
    currrentTaskId: 0,
    question: [],
    answers: []
  };

  handleSubmit = (e: any) => {

    e.preventDefault();
    this.props.form.validateFields((err: any, values:any) => {
      if (!err) {
        //console.log('Received values of form: ', values);

        fetch('/api/user/valid', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          })
        })
        .then(response => {
          return response.json();
        })
        .then( (json) => {
          if (json.ok) {
            this.getData(values.email, json.user_id);
            this.setState({
              success: true,
              userId: json.user_id,
              userEmail: values.email
            });
          } else {
            this.setState({
              visible: true
            });
          }
       })
        .catch(console.log);
      }
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

  getData(email: string, userId: number) {
    fetch('api/qa/next', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': email
      },
      body: JSON.stringify({
        user_id: userId,
      })
    })
    .then(response => {
      return response.json();
    })
    .then( (json) => {
      this.setState({
        currentTaskId: json.current_task_id,
        question: json.question,
        answers: json.answers
      });
    })
    .catch(console.log);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.success) {
      //return (<Redirect to='/annotate' />);
      return (<AnnotationPage 
      userId={this.state.userId}
      userEmail={this.state.userEmail}
      currentTaskId={this.state.currrentTaskId}
      question={this.state.question}
      answers={this.state.answers}
    />);
    } else {
      return (
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={<Icon type="user" />}
                placeholder="email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type='default' href='/register' style={{ marginRight: 130 }}>
              Register
            </Button>
            <Button type="primary" htmlType="submit" className='button' >
              Log in
            </Button>
            <Modal 
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>
               login in failed, please contact the administrator
              </p>
            </Modal>
          </Form.Item>
        </Form>
      );
    }

    
  }
}

export default LoginForm;
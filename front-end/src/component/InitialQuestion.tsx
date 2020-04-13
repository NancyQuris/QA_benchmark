import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface IProps extends FormComponentProps {
  questionId: number;
}

interface IState {

}


class InitialQuestion extends Component<IProps, IState> {

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values:any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={{width: "270px"}}>
        <Form.Item label='initial question'>
        {getFieldDecorator('initial question', {
            rules: [{ required: true, message: 'Please input the initial question!' }],
          })(
            <Input
              type="text"
              placeholder="initial question"
            />,
          )}
        </Form.Item>
        <Form.Item label='right answer'>
          {getFieldDecorator('right answer', {
            rules: [{ required: true, message: 'Please input the right answer!' }],
          })(
            <Input
              type="text"
              placeholder="Right answer"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<IProps>()(InitialQuestion);


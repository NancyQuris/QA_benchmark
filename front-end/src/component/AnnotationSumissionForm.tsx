import React, { Component } from 'react';
import { Form, Button, Row, Col, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import OriginalQuestion from './OriginalQuestion';
import Passage from './Passage';

interface IProps extends FormComponentProps {
  userEmail: string;
  userId: number;
  currentTaskId: number;
  question: any;
  answers: any;
}

interface IState {
}

let id = 0;

class AnnotationSubmissionForm extends Component<IProps, IState> {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values:any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var component = this;
        fetch('/api/qa/save', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': this.props.userEmail
          },
          body: JSON.stringify({
            user_id: this.props.userId,
            current_task_id: this.props.currentTaskId,
            question: this.props.question,
            answers: this.props.answers.concat(values.keys) // to-do: assign IDs 
          })
        })
        .then(response => {
          //console.log(response);
          // JSON.stringify(response.body);
          // console.log(JSON.stringify(response.body));
          return response.json();
          //console.log(JSON.stringify(result));
          
        })
        .then( (json) => {
          component.setState({
             data: json
          })
          console.log('parsed json', json)
       })
        .catch(console.log);   
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <React.Fragment>
        <Form.Item label="follow up question"
          key={k + 'follow up question'}
          style={{ marginLeft: '200px', width: "70%" }}>
          {getFieldDecorator(k + 'follow up question', {
            rules: [{ required: true, message: 'Please input follow up question' }],
          })(
            <Input placeholder="follow up question" />
          )}
        </Form.Item>
        <Form.Item label="answer"
          key={k + 'answer'}
          style={{ marginLeft: '200px', width: "70%" }}>
          {getFieldDecorator(k + 'answer', {
            rules: [{ required: true, message: 'Please input answer' }],
          })(
            <Input placeholder="answer" />
          )}
          <Button
            type="danger"
            onClick={() => this.remove(k)}
          > remove </Button>
        </Form.Item>
        {/* <Form.Item label="follow up question"
          key={k + 'follow up question'}
          style={{ marginLeft: '200px', width: "70%" }}>
          {getFieldDecorator(k + 'follow up question', {
            rules: [{ required: true, message: 'Please input follow up question' }],
          })(
            <Input placeholder="follow up question" />
          )}
        </Form.Item>
        <Form.Item label="answer"
          key={k + 'answer'}
          style={{ marginLeft: '200px', width: "70%" }}>
          {getFieldDecorator(k + 'answer', {
            rules: [{ required: true, message: 'Please input answer' }],
          })(
            <Input placeholder="answer" />
          )}
        </Form.Item>
        <Form.Item label="passage"
          key={k + 'passage'}
          style={{ marginLeft: '200px', width: "70%" }}
        >
          {getFieldDecorator(k + 'passage', {
            rules: [{ required: true, message: 'Please input passage' }],
          })(
            <Input placeholder="passage" />
          )}
        </Form.Item>
        <Form.Item label="wiki url"
          key={k + 'wiki url'}
          style={{ marginLeft: '200px', width: "70%"}}
        >
          {getFieldDecorator(k + 'wiki url', {
            rules: [{ required: true, message: 'Please input wiki url' }],
          })(
            <Input placeholder="wiki url" />
          )}
          <Button
            type="danger"
            onClick={() => this.remove(k)}
          > remove </Button>
        </Form.Item> */}
      </React.Fragment>
    ));

    return(
      <div>
        <Form onSubmit={this.handleSubmit} style={{color: '#336EFF'}}>
          <Row style={{paddingTop: "100px", marginLeft: "200px"}}>
            <Col span={14}>
              <Passage passageContent={this.getPassageContent()}/>
            </Col>
            <Col span={10} style={{width: "270px"}}>
              <Form.Item label='initial question'>
                <span style={{color: '#336EFF'}}>{this.props.question.init_question}</span>
                {/* {getFieldDecorator('initial question', {
                  rules: [{ required: true, message: 'Please input the initial question!' }],
                })(
                  <Input
                    type="text"
                    placeholder={this.getInitialQuestion()}
                  />,
                )} */}
              </Form.Item>
              <Form.Item label='next question'>
                {/* {getFieldDecorator('right answer', {
                  rules: [{ required: true, message: 'Please input the right answer!' }],
                })(
                  <Input
                    type="text"
                    placeholder={"Right answer"}
                  />,
                )} */}
                <span style={{color: '#336EFF'}}>{this.props.question.next_question}</span>
              </Form.Item>
            </Col>
          </Row>
          <OriginalQuestion questions={this.props.answers} />
          {formItems}
          <Form.Item>
            <Button type="dashed" onClick={this.add} style={{ marginLeft: '200px', width: "70%"}}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item style={{ marginLeft: '200px', width: "70%"}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div> 
    );
  }

  getPassageContent() {
    return this.props.question.passage;
  }
}

export default Form.create<IProps>()(AnnotationSubmissionForm);


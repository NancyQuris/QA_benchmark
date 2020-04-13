import React, { Component } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface IProps extends FormComponentProps {
  questions: [];
}

interface IState {
}

const formItemLayout = {
  labelCol: { 
    span: 6
  }
};

class OriginalQuestion extends Component<IProps, IState> {

  render() {
    return (
      <div>
        {this.getFormComponent(this.props.questions)}
      </div>
    );
  }

  getFormComponent(questions: any) {
    let components = new Array();
    var numberOfQuestion = questions.length;
    for (var i = 0; i < numberOfQuestion; i++) {
      var sequence = i + 1;
      components.push(
        <Form {...formItemLayout}>
          <Form.Item label={"next answer " + sequence}>
            <span style={{color: '#336EFF'}}>{questions[i].next_answer}</span>
          </Form.Item>
          <Form.Item label={"final answer " + sequence}>
            <span style={{color: '#336EFF'}}>{questions[i].final_answer}</span>
          </Form.Item>
        </Form>
      );
    }
    return components;
  }


    // return (
    //   <div>
    //     <Form.Item label="follow up question">
    //       <span style={{color: '#336EFF'}}>default follow up question</span>
    //     </Form.Item>
    //     <Form.Item label="answer">
    //       <span style={{color: '#336EFF'}}>default follow up question answer</span>
    //     </Form.Item>
    //     <Form.Item label="passage">
    //       <span style={{color: '#336EFF'}}>default passage</span>
    //     </Form.Item>
    //     <Form.Item label="wiki url">
    //       <span style={{color: '#336EFF'}}>default wiki url</span>
    //     </Form.Item>
    //   </div>
    // );
}

export default Form.create<IProps>()(OriginalQuestion);


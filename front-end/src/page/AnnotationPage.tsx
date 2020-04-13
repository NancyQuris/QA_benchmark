import React, { Component } from 'react';
import { Button, Row, Modal } from 'antd';
import AnnotationSumissionForm from '../component/AnnotationSumissionForm';

interface IProps {
  userId: number;
  userEmail: string;
  currentTaskId: number;
  question: any;
  answers: any;
}

interface IState {
}

class AnnotationPage extends Component<IProps, IState> {
  state = {
    first: true,
    visible: false,
    currentTaskId: this.props.currentTaskId,
    question: this.props.question,
    answers: this.props.answers
  }

  navigateComponent = (
    <Row style={{paddingTop: "20px", marginLeft: "200px"}}>
      <Button type='primary' 
              onClick={() => this.goPre(this.props.userEmail)}>
        Previous
    </Button>
    <Button style ={{marginLeft: "340px"}} 
            onClick={() => this.goNext(this.props.userEmail)}>
      Skip
    </Button>
    <Button type='primary' 
            style ={{marginLeft: "340px"}} 
            onClick={() => this.goNext(this.props.userEmail)}>
      Next
    </Button>
    </Row>
  );

  render() {

    if (this.state.first) {
      return (
        <div>
          <AnnotationSumissionForm
          userEmail={this.props.userEmail}
            userId={this.props.userId}
            currentTaskId={this.props.currentTaskId}
            question={this.props.question}
            answers={this.props.answers}
          />
          {this.navigateComponent}
          <Modal 
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>
               There is no more task for you! Thank you.
              </p>
          </Modal>
      </div>
      );
    } else {
      return (
        <div>
          <AnnotationSumissionForm
          userEmail={this.props.userEmail}
            userId={this.props.userId}
            currentTaskId={this.state.currentTaskId}
            question={this.state.question}
            answers={this.state.answers}
          />
          {this.navigateComponent}
          <Modal 
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>
               There is no more task for you! Thank you.
              </p>
          </Modal>
      </div>
      );
    }
  }

  goPre(email: string) {
    fetch('api/qa/pre', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': email
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        current_task_id: this.state.currentTaskId,
      })
    })
    .then(response => {
      return response.json();
    })
    .then( (json) => {
      if (json.current_task_id === undefined) {
        this.setState({
          visible: true
        });
      } else {
        this.setState({
          first: false,
          currentTaskId: json.current_task_id,
          question: json.question,
          answers: json.answers
  
        });
      }
    })
    .catch((e) => {
      console.log(e);
      this.setState({
        visible: true
      });
    });
  }

  goNext(email: string) {
    fetch('api/qa/next', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': email
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        current_task_id: this.state.currentTaskId,
      })
    })
    .then(response => {
      return response.json();
    })
    .then( (json) => {
      if (json.current_task_id === undefined) {
        this.setState({
          visible: true
        });
      } else {
        this.setState({
          first: false,
          currentTaskId: json.current_task_id,
          question: json.question,
          answers: json.answers
  
        });
      }
    })
    .catch((e) => {
      console.log(e);
      this.setState({
        visible: true
      });
    });

  }

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

 }
export default AnnotationPage;
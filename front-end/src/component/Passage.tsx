import React, { Component } from 'react';

interface IProps {
  passageContent: string;
}

interface IState {

}

class Passage extends Component<IProps, IState> {
  render() {
    return (
      <div style={{padding: '5px', 
                    textAlign: 'justify', 
                    overflow: 'scroll',
                    fontWeight: 'bold',
                    maxHeight: '200px', 
                    width:'550px'}}> 
        {this.props.passageContent}
      </div>
    );
  }
}

export default Passage;

import React from "react";

export default class ModifyTaskForm extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        title: this.props.title,
        content: this.props.content
      };
  
      this.handleTitle = this.handleTitle.bind(this);
      this.handleContent = this.handleContent.bind(this);
      this.save = this.save.bind(this);
    }
  
    handleTitle(e) {
      this.setState({ title: e.target.value })
    }
  
    handleContent(e) {
      this.setState({ content: e.target.value })
    }
  
    save() {
      this.props.update({
        title: this.state.title,
        content: this.state.content
      });
    }
  
    render() {
      return (
        <>
          <textarea onChange={this.handleTitle} className="task-title" value={this.state.title}></textarea>
          <textarea onChange={this.handleContent} className="task-content" value={this.state.content}></textarea>
          <button onClick={this.save}>SAVE</button>
        </>
      );
    }
  }
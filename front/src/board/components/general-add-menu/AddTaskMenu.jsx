import React from "react";

export default class AddTaskMenu extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        title: '',
        content: '',
        state: 'todo'
      };
  
      this.handleEnter = this.handleEnter.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleContentChange = this.handleContentChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      document.querySelector('#addTask input#title').focus();
    }
  
    handleEnter(e) {
      if (e.key === 'Enter') {
        this.handleSubmit(e);
      }
    }
  
    handleTitleChange(event) {
      this.setState({ title: event.target.value });
    }
  
    handleContentChange(event) {
      this.setState({ content: event.target.value });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      if (this.state.title === '' && this.state.content === '') return;
      let task = {
        title: this.state.title,
        content: this.state.content,
        state: this.state.state
      };
      this.setState({
        title: '',
        content: ''
      });
      this.props.taskSocket.emit('createTask', task);
      document.querySelector('#addTask input#title').focus();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} id='addTask'>
          <h1>Task Menu</h1>
          <label htmlFor='title'>Title :</label> <br />
          <input type='text' id='title' name='title'
            value={this.state.title}
            onChange={this.handleTitleChange}
            onKeyUp={this.handleEnter}
          /> <br />
  
          <label htmlFor='content'>Content :</label> <br />
          <input type='text' id='content' name='content' value={this.state.content} onChange={this.handleContentChange} /> <br />
  
          <button type='submit'>submit !</button>
        </form>
      );
    }
  }
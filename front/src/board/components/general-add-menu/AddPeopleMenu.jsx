import React from "react";

export default class AddPeopleMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { input: '' };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.removePerson = this.removePerson.bind(this);
    this.generatePeopleComponents = this.generatePeopleComponents.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.input === '') return;
    let input = this.state.input;
    let person = { name: input };
    this.setState({ input: '' });
    this.props.socket.emit('createPerson', person);
    document.querySelector('form#people input').focus();
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  removePerson(pid) {
    console.log("removePerson function is executed")
    this.props.socket.emit('deletePerson', pid);
  }

  componentDidMount() {
    document.querySelector("input#peopleInput").focus();
  }

  generatePeopleComponents(people) {
    people = Object.values(people);
    if (people.length === 0) return;
    return people.map((person) =>
      <li key={person.personId} >{person.name}
        <button onClick={() => this.removePerson(person.personId)}>
          <img title='delete this person' src='/images/delete_task.ico' height='10' />
        </button>
      </li>
    );
  }

  render() {
    return (
      <div id='people'>
        <h1>People Menu</h1>
        <ul>{this.generatePeopleComponents(this.props.people)}</ul>
        <input
          id="peopleInput"
          type='text'
          placeholder='add someone here'
          value={this.state.input}
          onChange={this.handleInput}
          onKeyUp={this.handleEnter}
        />
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}
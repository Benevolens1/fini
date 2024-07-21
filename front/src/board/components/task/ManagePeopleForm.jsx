import React from "react";

export default class ManagePeopleForm extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleCheckbox = this.handleCheckbox.bind(this);
      this.generatePeopleCheckboxes = this.generatePeopleCheckboxes.bind(this);
    }
  
    handleCheckbox(e) {
      if (e.target.checked === false) {
        this.props.socket.emit('deleteTaskPerson', this.props.taskId, e.target.id);
      } else {
        this.props.socket.emit('createTaskPerson', this.props.taskId, e.target.id);
      }
    }
  
    generatePeopleCheckboxes() {
      let people = Object.values(this.props.people);
      return people.map((person) => {
        let taskPeople = this.props.taskPeople;
        let taskId = this.props.taskId;
        let checked = false;
        for (const taskPerson of taskPeople) {
          if (taskPerson.taskId === taskId && taskPerson.personId === person.personId) {
            checked = true;
          }
        }
        return (
          <div key={person.personId}>
            <input type='checkbox' id={person.personId} checked={checked} onChange={this.handleCheckbox} />
            <label htmlFor={person.personId}>{person.name}</label>
          </div>
        );
      });
    }
  
    render() {
      return (
        <>
        <div className="managingPeopleMenu">
          {this.generatePeopleCheckboxes()}
          <button onClick={this.props.stopManagingPeople}>OK !</button>
        </div>
        </>
      );
    }
  }
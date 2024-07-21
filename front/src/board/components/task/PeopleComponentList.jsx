import React from "react";

export default class PeopleComponentList extends React.Component {
  constructor(props) {
    super(props);
    this.generatePeopleComponentList = this.generatePeopleComponentList.bind(this);
  }

  generatePeopleComponentList() {
    let taskId = this.props.taskId;
    let people = [];
    for (const taskPerson of this.props.taskPeople) {
      if (taskPerson.taskId === taskId) {
        people.push(this.props.people[taskPerson.personId])
      }
    }
    if (people.length === 0) {
      return [];
    } else {
      let peopleComponents = [];
      for (let i = 0, len = people.length; i < len; i++) {
        let someone = people[i];
        let personId = someone.personId;
        let name = someone.name;
        peopleComponents.push(<li key={personId}>{name}</li>);
      }
      return peopleComponents;
    }
  }

  render() {
    let PeopleComponents = this.generatePeopleComponentList();
    let classname = PeopleComponents.length === 0 ? 'hidden' : '';

    return (
      <ul className={classname}>
        {PeopleComponents}
      </ul>
    );
  }
}
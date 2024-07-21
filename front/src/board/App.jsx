import './App.css'
import { io } from "socket.io-client";
import React from 'react';

// components
import AddPeopleMenu from './components/general-add-menu/AddPeopleMenu';
import AddTaskMenu from './components/general-add-menu/AddTaskMenu';
import Table from './components/columns/Table';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleTaskMenu = this.handleTaskMenu.bind(this);
    this.handlePeopleMenu = this.handlePeopleMenu.bind(this);

    const socket = io();

    const url = window.location.href
    const splittedUrl = url.split('/');
    const boardId = splittedUrl[splittedUrl.length - 1];
    socket.emit('boardId', boardId);

    this.state = {
      tasks: {},
      people: {},
      taskPeople: [],
      taskMenu: false,
      peopleMenu: false,
      somebodyElseModifies: [],
      socket: socket,
      subtasks: []
    };
  }

  handleTaskMenu() {
    if (this.state.taskMenu) {
      this.setState({ taskMenu: false });
    } else {
      this.setState({ taskMenu: true });
    }
  }

  handlePeopleMenu() {
    if (this.state.peopleMenu) {
      this.setState({ peopleMenu: false });
    } else {
      this.setState({ peopleMenu: true });
    }
  }

  componentDidMount() {
    // get board id
    const url = window.location.href
    const splittedUrl = url.split('/');
    const boardId = splittedUrl[splittedUrl.length - 1];

    // get people
    fetch('/api/people/' + boardId, { method: 'GET' })
      .then((res) => res.json())
      .then(peopleList => {
        let people = {};
        for (const person of peopleList) {
          people[person.personId] = person;
        }
        this.setState({ people: people });
      })
      .catch(err => console.log(err));

    // get taskpeople
    fetch('/api/taskpeople/' + boardId, { method: 'GET' })
      .then((res) => res.json())
      .then(taskPeopleList => {
        this.setState({ taskPeople: taskPeopleList });
      })
      .catch(err => console.log(err));

    // get tasks
    fetch('/api/tasks/' + boardId, { method: 'GET' })
      .then((res) => res.json())
      .then(taskList => {
        let tasks = {};
        for (const task of taskList) {
          tasks[task.taskId] = task;
        }
        this.setState({ tasks: tasks });
      }
      )
      .catch(err => console.log(err));
    
    fetch('/api/subtasks/' + boardId, {method: 'GET'})
      .then((res) => res.json())
      .then(subtaskList => this.setState({subtasks: subtaskList}))
      .catch(err => console.log(err));

      let socket = this.state.socket;

      socket.on('createTask', (task) => {
        let tasks = this.state.tasks;
        tasks[task.taskId] = task;
        this.setState({ tasks: tasks });
      });
  
      socket.on('updateTask', (task) => {
        let tasks = this.state.tasks;
        tasks[task.taskId] = task;
        this.setState({ tasks: tasks });
      });
  
      socket.on('deleteTask', (taskId) => {
        let tasks = this.state.tasks;
        let subtasks = this.state.subtasks;
        for (let i = 0; i < subtasks.length; i++) {
          if (subtasks[i].parentId === taskId) {
            subtasks.splice(i, 1);
          }
        }
        delete tasks[taskId];
        this.setState({ tasks: tasks, subtasks: subtasks });
      });
  
      socket.on('createPerson', (person) => {
        console.log("createPerson event launched")
        let people = this.state.people;
        people[person.personId] = person;
        this.setState({ people: people });
      });
  
      socket.on('deletePerson', (personId) => {
        console.log("deletePerson event reveived and launched")
        let people = this.state.people;
        delete people[personId];
        let taskPeople = this.state.taskPeople;
        for (let i = 0, len = taskPeople.length; i < len; i++) {
          if (taskPeople[i].personId === personId) {
            taskPeople.splice(i, 1);
          }
        }
        this.setState({ people: people });
        this.setState({ taskPeople: taskPeople });
      });
  
      socket.on('createTaskPerson', (taskId, personId) => {
        let taskPeople = this.state.taskPeople;
        for (const taskPerson of taskPeople) {
          if (taskPerson.taskId === taskId && taskPerson.personId === personId) {
            return;
          }
        }
        taskPeople.push({ taskId: taskId, personId: personId });
        this.setState({ taskPeople: taskPeople });
      });
  
      socket.on('deleteTaskPerson', (taskId, personId) => {
        let taskPeople = this.state.taskPeople;
        let newTaskPeople = [];
        for (let i = 0, len = taskPeople.length; i < len; i++) {
          if (taskPeople[i].taskId === taskId && taskPeople[i].personId === personId) {
            continue;
          } else {
            newTaskPeople.push(taskPeople[i]);
          }
        }
        this.setState({ taskPeople: newTaskPeople });
      });
  
      socket.on('somebodyElseModifies', (taskId) => {
        let somebodyElseModifies = this.state.somebodyElseModifies;
        somebodyElseModifies.push(taskId);
        this.setState({ somebodyElseModifies: somebodyElseModifies })
      })
  
      socket.on('somebodyElseStopsModification', (taskId) => {
        let somebodyElseModifies = this.state.somebodyElseModifies;
        let afterSomebodyElseModifies = somebodyElseModifies.filter(
          ongoingModificationTid => ongoingModificationTid != taskId
        );
        this.setState({ somebodyElseModifies: afterSomebodyElseModifies });
      });
  
      socket.on('createSubtask', subtask => {
        let subtaskList = this.state.subtasks;
        for (let i = 0; i < subtaskList.length; i++) {
          if (subtaskList[i].taskId === subtask.taskId) {
            return;
          }
        }
        subtaskList.push(subtask);
        console.log("a subtask : ", subtask);
        this.setState({subtasks: subtaskList});
      });
  
      socket.on('updateSubtask', subtask => {
        let subtaskList = this.state.subtasks;
        let taskId = subtask.taskId;
        for (let i = 0; i < subtaskList.length; i++) {
          if (subtaskList[i].taskId === taskId ) {
            subtaskList[i] = subtask;
            break;
          }
        }
        this.setState({subtasks: subtaskList})
      });
  
      socket.on('deleteSubtask', taskId => {
        let subtaskList = this.state.subtasks;
        for (let i = 0; i < subtaskList.length; i++) {
          if (subtaskList[i].taskId === taskId) {
            subtaskList.splice(i, 1);
            break;
          }
        }
        this.setState({subtasks: subtaskList});
      });
  }

  render() {
    for (const person in this.state.people) {
      if (person === undefined) {
        alert('a person is undefined');
      }
    }

    return (
      <>
        <div className='manageBtns'>
          <button onClick={this.handleTaskMenu}>
            <img title='add a new task' src="/images/task_menu.ico" />
          </button>
          <button onClick={this.handlePeopleMenu}>
            <img title='manage people on this board' src='/images/people_menu.ico' />
          </button>
        </div>

        {this.state.taskMenu &&
          <AddTaskMenu socket={this.state.socket} />
        }

        {this.state.peopleMenu &&
          <AddPeopleMenu people={this.state.people} socket={this.state.socket} />
        }

        <Table
          tasks={this.state.tasks}
          people={this.state.people}
          taskPeople={this.state.taskPeople}
          socket={this.state.socket}
          somebodyElseModifies={this.state.somebodyElseModifies}
          subtasks={this.state.subtasks}
        />
      </>
    );
  }
}


export default App

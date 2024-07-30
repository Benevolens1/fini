import React from "react";
import Column from "./Column";

export default class Table extends React.Component {
    constructor(props) {
      super(props);
      this.sortByState = this.sort.bind(this);
    }
  
    sort(tasks) {
      tasks = Object.values(tasks)
  
      let todoTasks = [];
      let doingTasks = [];
      let doneTasks = [];
  
      for (const task of tasks) {
        if (task.state === 'todo') {
          todoTasks.push(task);
        } else if (task.state === 'doing') {
          doingTasks.push(task);
        } else if (task.state === 'done') {
          doneTasks.push(task);
        }
      }
  
      return [todoTasks, doingTasks, doneTasks];
    }
  
    render() {
  
      let [todoTasks, doingTasks, doneTasks] = this.sort(this.props.tasks);
      return (
        <div className="table">
          <Column
            key={() => "todo-column"}
            className="todo-column"
            tasks={todoTasks}
            people={this.props.people}
            taskPeople={this.props.taskPeople}
            socket={this.props.socket}
            taskSocket={this.props.taskSocket}
            peopleSocket={this.props.peopleSocket}
            taskpeopleSocket={this.props.taskpeopleSocket}
            subtaskSocket={this.props.subtaskSocket}
            somebodyElseModifies={this.props.somebodyElseModifies}
            concurrentModifSocket={this.props.concurrentModifSocket}
            setImodify={this.props.setImodify}
            subtasks={this.props.subtasks}
          />
          <Column
            key={() => "doing-column"}
            className="doing-column"
            tasks={doingTasks}
            people={this.props.people}
            taskPeople={this.props.taskPeople}
            socket={this.props.socket}
            taskSocket={this.props.taskSocket}
            peopleSocket={this.props.peopleSocket}
            taskpeopleSocket={this.props.taskpeopleSocket}
            subtaskSocket={this.props.subtaskSocket}
            somebodyElseModifies={this.props.somebodyElseModifies}
            concurrentModifSocket={this.props.concurrentModifSocket}
            setImodify={this.props.setImodify}
            subtasks={this.props.subtasks}
          />
          <Column
            key={() => "done-column"}
            className="done-column"
            tasks={doneTasks}
            people={this.props.people}
            taskPeople={this.props.taskPeople}
            socket={this.props.socket}
            taskSocket={this.props.taskSocket}
            peopleSocket={this.props.peopleSocket}
            taskpeopleSocket={this.props.taskpeopleSocket}
            subtaskSocket={this.props.subtaskSocket}
            somebodyElseModifies={this.props.somebodyElseModifies}
            concurrentModifSocket={this.props.concurrentModifSocket}
            setImodify={this.props.setImodify}
            subtasks={this.props.subtasks}
          />
        </div>
      );
    }
  }
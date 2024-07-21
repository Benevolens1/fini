import React from "react";
import PeopleComponentList from "./PeopleComponentList";
import ModifyTaskForm from "./ModifyTaskForm";
import ManagePeopleForm from "./ManagePeopleForm";
import Subtask from './Subtask';
import AddSubtask from './AddSubtask';

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modifying: false,
      managingpeople: false,
      showActions: false,
      addingSubtask: false
    };

    this.markAs = this.markAs.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.managePeople = this.managePeople.bind(this);
    this.stopManagingPeople = this.stopManagingPeople.bind(this);
    this.selectSubtasksOfThisTask = this.selectSubtasksOfThisTask.bind(this);
    this.generateSubtaskComponents = this.generateSubtaskComponents.bind(this);
    this.changeAddingSubtask = this.changeAddingSubtask.bind(this);
    this.confirmSubtask = this.confirmSubtask.bind(this);
  }

  markAs(state) {
    let task = this.props.task;
    task.state = state;
    this.props.socket.emit('updateTask', task);
  }

  edit() {
    this.setState({ modifying: true });
    this.props.socket.emit('somebodyElseModifies', this.props.task.taskId)
  }

  update(newTask) {
    let task = this.props.task;
    this.props.socket.emit('somebodyElseStopsModification', task.taskId)
    this.setState({ modifying: false });
    task.title = newTask.title
    task.content = newTask.content
    this.props.socket.emit('updateTask', task);
  }

  deleteTask() {
    let task = this.props.task;
    let taskId = task.taskId;
    this.props.socket.emit('deleteTask', taskId);
  }

  managePeople() {
    if (Object.values(this.props.people).length === 0) {
      return;
    }
    this.setState({ managingpeople: true });
  }

  stopManagingPeople() {
    this.setState({ managingpeople: false });
  }

  selectSubtasksOfThisTask() {
    let pid = this.props.task.taskId;
    let allSubtasks = this.props.subtasks;
    let subtasksOfThisTask = [];
    for (let i = 0; i < allSubtasks.length; i++) {
      if (allSubtasks[i].parentId === pid) {
        subtasksOfThisTask.push(allSubtasks[i]);
      }
    }
    return subtasksOfThisTask;
  }

  generateSubtaskComponents(subtasks) {
    let subtaskComponents = subtasks.map(subtask =>
      <Subtask
        key={subtask.taskId}
        subtask={subtask}
        socket={this.props.socket}
        showActions={this.state.showActions}
      />);
    return subtaskComponents;
  }

  changeAddingSubtask() {
    this.setState({ addingSubtask: true });
  }

  confirmSubtask() {
    this.setState({addingSubtask: false});
  }

  render() {
    let task = this.props.task;
    let somebodyElseModifies = this.props.somebodyElseModifies;
    let somebodyElseModifiesTrueOrFalse = somebodyElseModifies.indexOf(task.taskId) >= 0;
    let modifyTask = somebodyElseModifiesTrueOrFalse ? 'modify-task' : '';
    let subtasks = this.props.subtasks;

    return (
      <div className={`task ${modifyTask}`}
        id={task.taskId}
        onMouseEnter={() => {
          if (somebodyElseModifiesTrueOrFalse) {
            return;
          } else {
            return this.setState({ showActions: true });
          }
        }}
        onMouseLeave={() => this.setState({ showActions: false })}
      >
        {somebodyElseModifiesTrueOrFalse &&
          <div className="ongoing-modification">
            <i><b>ongoing modications...</b></i>
          </div>

        }
        {this.state.showActions &&
          <div className="manageBtns">
            <div>

              <button onClick={this.managePeople}><img title='manage people on this task' src='/images/person_in_task.ico' height='20' /></button>
              <button onClick={this.edit}><img title='edit this task' src='/images/edit_task.ico' height='20' /></button>
              <button onClick={this.changeAddingSubtask}><img src="/images/new_subtask.ico" alt="add a subtask" /></button>
            </div>

            <button onClick={this.deleteTask}><img title='delete this task' src='/images/delete_task.ico' height='20' /></button>

          </div>
        }


        {this.state.modifying ?
          <ModifyTaskForm
            title={task.title}
            content={task.content}
            update={this.update}
          />
          :
          <>
            <div className="task-title">{task.title}</div>
            <div className="task-content">{task.content}</div>
          </>
        }

        {
          this.generateSubtaskComponents(this.selectSubtasksOfThisTask())
        }

        {this.state.addingSubtask &&
          <AddSubtask socket={this.props.socket} parentId={task.taskId} confirm={this.confirmSubtask}/>
        }

        {this.state.managingpeople ?
          <ManagePeopleForm
            taskId={this.props.task.taskId}
            people={this.props.people}
            taskPeople={this.props.taskPeople}
            stopManagingPeople={this.stopManagingPeople}
            socket={this.props.socket}
          />
          :
          <PeopleComponentList
            taskId={this.props.task.taskId}
            people={this.props.people}
            taskPeople={this.props.taskPeople}
          />
        }

        {this.state.showActions &&
          <div className="manageBtns">

            {task.state === 'todo' &&
              <>
                <div></div>
                <button onClick={() => this.markAs('doing')} >
                  <img title='mark as DOING' src='/images/orange_arrow_right.ico' height='20' />
                </button>
              </>
            }
            {task.state === 'doing' &&
              <>
                <button onClick={() => this.markAs('todo')} >
                  <img title='mark as TODO' src='/images/red_arrow.ico' height='20' />
                </button>
                <button onClick={() => this.markAs('done')} >
                  <img title='mark as DONE' src='/images/green_arrow.ico' height='20' />
                </button>
              </>
            }
            {task.state === 'done' &&
              <button onClick={() => this.markAs('doing')} >
                <img title='mark as DOING' src='/images/orange_arrow_left.ico' height='20' />
              </button>
            }

          </div>
        }

      </div>
    );

  }
}
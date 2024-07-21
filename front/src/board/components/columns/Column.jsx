import React from "react";
import ColumnHeader from "./ColumnHeader";
import Task from "../task/Task";

export default class Column extends React.Component {
    constructor(props) {
        super(props);
        this.nameColumnTitle = this.nameColumnTitle.bind(this);
        this.generateTaskComponents = this.generateTaskComponents.bind(this);
    }

    nameColumnTitle(className) {
        switch (className) {
            case 'todo-column':
                return 'To do :';
            case 'doing-column':
                return 'Doing...'
            case 'done-column':
                return 'Done !';
        }
    }

    generateTaskComponents(tasksList) {
        let taskComponentList = tasksList.map((task) =>
            <Task
                key={task.taskId}
                task={task}
                people={this.props.people}
                taskPeople={this.props.taskPeople}
                socket={this.props.socket}
                somebodyElseModifies={this.props.somebodyElseModifies}
                subtasks={this.props.subtasks}
            />
        );
        return taskComponentList;
    }

    render() {
        return (
            <div key={() => this.props.className} className={this.props.className}>
                <ColumnHeader columnTitle={this.nameColumnTitle(this.props.className)} />
                {this.generateTaskComponents(this.props.tasks)}
            </div>
        );
    }
}
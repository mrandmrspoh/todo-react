class SelectHandler extends React.Component {
    constructor() {
        super();
        this.selectOnChange = this.selectOnChange.bind(this);
    }
    selectOnChange(event) {
        let userSelect = event.target.value;
        this.props.actionSetState(userSelect);
    }
    render() {
        return (
            <div>
                <select onChange={this.selectOnChange}>
                    <option >Select an action</option>
                    <option >Add</option>
                    <option>Remove</option>
                    <option>Mark as complete</option>
                </select>
            </div>

        )
    }
};




class InputHandler extends React.Component {
    constructor() {
        super();
        this.inputOnChange = this.inputOnChange.bind(this);
    }
    inputOnChange(event) {
        let userInput = event.target.value;
        this.props.taskSetState(userInput);
    }
    render() {
        let action = this.props.action;
        let placeholder;
        if (action == 'Add') {
            placeholder = "input task name"
        } else if (action == 'Remove' || action == 'Mark as complete') {
            placeholder = 'input task id'
        }
        return(
            <div>
                <input onChange={this.inputOnChange} value={this.props.task} placeholder={placeholder} />
            </div>
        )
    }
}


class ClickHandler extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let action = this.props.action;
        let task = this.props.task;
        let taskList = this.props.taskList;
        let completedList = this.props.completedList;
        let validation = this.props.validation;
        console.log('Great!!')
        if (action == 'Add') {
            if (task.length >1 && task.length <200) {
                taskList = taskList.concat(task);
                task = '';
                validation ='';
                this.props.taskSetState( task );
                this.props.taskListSetState( taskList );
                this.props.validationSetState( validation )
            } else {
                validation = 'Error! Task must be more than 1 character and less than 200 characters!';
                this.props.validationSetState( validation );
            }
        } else if (action == 'Remove') {
            let taskId = parseInt(task);
            if ( isNaN(taskId) ) {
                validation = 'Error! Task Id should be a number!';
                this.props.validationSetState( validation );
            } else {
                let removedTask = taskList.splice(taskId-1, 1);
                task = '';
                validation ='';
                this.props.taskSetState( task );
                this.props.taskListSetState( taskList );
                this.props.validationSetState( validation )
            }
        } else if (action == 'Mark as complete') {
            let taskId = parseInt(task);
            if ( isNaN(taskId) ) {
                validation = 'Error! Task Id should be a number!';
                this.props.validationSetState( validation );
            } else {
                let completedTask = taskList[taskId-1];
                let removedTask = taskList.splice(taskId-1, 1);
                completedList = completedList.concat(completedTask);
                task = '';
                validation ='';
                this.props.taskSetState( task );
                this.props.taskListSetState( taskList );
                this.props.completedListSetState( completedList );
                this.props.validationSetState( validation );
            }
        }
    }
    render() {
        return(
            <div>
                <p>{this.props.validation}</p>
                <button onClick={this.onClick}>Submit</button>
            </div>
        )
    }

}



class ShowToDoList extends React.Component {
    render() {
        let taskList = this.props.taskList;
        let showTaskList = taskList.map( (task, index) => {
            return <li key={ 'task' + index } >{task}</li>
        })
        return(
            <div>
                <h1>Todo list</h1>
                <ol>
                    {showTaskList}
                </ol>
            </div>
        )
    }
}


class CompletedList extends React.Component {
    render() {
        let completedList = this.props.completedList;
        let showCompletedList = completedList.map( (task, index) => {
            return <li key={ 'task' + index } >{task}</li>
        })
        return(
            <div>
                <h1>Completed list</h1>
                <ol>
                    {showCompletedList}
                </ol>
            </div>
        )
    }
}


class ToDoListApp extends React.Component {

    constructor() {
        super();
        this.actionSetState = this.actionSetState.bind(this);
        this.taskSetState = this.taskSetState.bind(this);
        this.taskListSetState = this.taskListSetState.bind(this);
        this.completedListSetState = this.completedListSetState.bind(this);
        this.validationSetState = this.validationSetState.bind(this);
        this.state = {
            action: '',
            task: '',
            taskList: ['123','234','456'],
            completedList : [],
            validation: '',
        }
    }

    actionSetState(action) {
        this.setState( {action} );
    }

    taskSetState(task) {
        this.setState( {task} );
    }

    taskListSetState(taskList) {
        this.setState( {taskList} );
    }

    completedListSetState(completedList) {
        this.setState( {completedList} );
    }

    validationSetState(validation) {
        this.setState( {validation} );
    }


    render() {
        return(
            <div>
                <div>
                    <SelectHandler actionSetState={this.actionSetState} />
                    <br/>
                    <InputHandler taskSetState={this.taskSetState} action={this.state.action} />
                    <br/>
                    <ClickHandler action={this.state.action} task={this.state.task} taskList={this.state.taskList} completedList={this.state.completedList} validation={this.state.validation} actionSetState={this.actionSetState} taskSetState={this.taskSetState} taskListSetState={this.taskListSetState} completedListSetState={this.completedListSetState} validationSetState={this.validationSetState}/>
                    <br/>
                </div>
                <ShowToDoList taskList={this.state.taskList} />
                <CompletedList completedList={this.state.completedList} />
            </div>
        )
    }

}


ReactDOM.render( <ToDoListApp />, document.getElementById('root') )
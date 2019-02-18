class ToDoListApp extends React.Component {

    constructor() {
        super();
        this.selectOnChange = this.selectOnChange.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            action: '',
            task: '',
            taskList: ['123','234','456'],
            completedList : [],
            validation: '',
        }
    }



    selectOnChange(event) {
        let userSelect = event.target.value;
        this.setState( {action: userSelect} );
    }



    inputOnChange(event) {
        let userInput = event.target.value;
        this.setState( {task: userInput} );
    }



    onClick() {
        let action = this.state.action;
        let task = this.state.task;
        let taskList = this.state.taskList;
        let completedList = this.state.completedList;
        let resetTask = '';

        if (action == 'Add') {

            if (task.length >1 && task.length <200) {
                let newTaskList = taskList.concat(task);
                this.setState( {task: resetTask} );
                this.setState( {taskList: newTaskList} );
                this.setState( {validation: ''} )
            } else {
                this.setState( {validation: 'Error! Task must be more than 1 character and less than 200 characters!'} );
            }

        } else if (action == 'Remove') {
            let taskId = parseInt(task);
            if ( isNaN(taskId) ) {
                this.setState( {validation: 'Error! Task Id should be a number!'} );
            } else {
                let removedTask = taskList.splice(taskId-1, 1);
                this.setState( {task: resetTask} );
                this.setState( {taskList: taskList} );
                this.setState( {validation: ''} )
            }

        } else if (action == 'Mark as complete') {
            let taskId = parseInt(task);
            if ( isNaN(taskId) ) {
                this.setState( {validation: 'Error! Task Id should be a number!'} );
            } else {
                let completedTask = taskList[taskId-1];
                let removedTask = taskList.splice(taskId-1, 1);
                let newCompletedList = completedList.concat(completedTask);
                this.setState( {task: resetTask} );
                this.setState( {taskList: taskList} );
                this.setState( {completedList: newCompletedList} );
                this.setState( {validation: ''} )
            }

        }

    }



    render() {
        let action = this.state.action;
        let taskList = this.state.taskList;
        let completedList = this.state.completedList;
        let showTaskList = taskList.map( (task, index) => {
            return <li key={ 'task' + index } >{task}</li>
        })
        let showCompletedList = completedList.map( (task, index) => {
            return <li key={ 'task' + index } >{task}</li>
        })


        let placeholder;
        if (action == 'Add') {
            placeholder = "input task name"
        } else if (action == 'Remove' || action == 'Mark as complete') {
            placeholder = 'input task id'
        }

        return(
            <div>

                <div>
                    <select onChange={this.selectOnChange}>
                        <option >Select an action</option>
                        <option >Add</option>
                        <option>Remove</option>
                        <option>Mark as complete</option>
                    </select>
                </div>
                <br/>
                <div>
                    <input onChange={this.inputOnChange} value={this.state.task} placeholder={placeholder} />
                    &nbsp;
                    <button onClick={this.onClick} >Submit</button>
                    <br/>
                    <span>{this.state.validation}</span>
                </div>
                <div>
                    <h1>Todo list</h1>
                    <ol>
                        {showTaskList}
                    </ol>
                </div>
                <div>
                    <h1>Completed list</h1>
                    <ol>
                        {showCompletedList}
                    </ol>
                </div>
            </div>
        )
    }

}


ReactDOM.render( <ToDoListApp />, document.getElementById('root') )
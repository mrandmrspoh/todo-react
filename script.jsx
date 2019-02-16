class Form extends React.Component {

    constructor(){
        super();
        this.inputHandler = this.inputHandler.bind(this);
        // this.state ={
        //     input: '',
        // }
    }

    inputHandler() {
        let userInput = event.target.value;
        // this.setState({input:userInput})
        this.props.setTask(userInput);

    }

    render() {
        return(
            <div>
                <input onChange={this.inputHandler} />
            </div>
        )
    }

}




class AddList extends React.Component {

    constructor(newTask, taskList) {
        super();
        this.addHandler = this.addHandler.bind(this);

    }

    addHandler(){
        let previousTaskList = this.props.taskList
        let newTaskList = previousTaskList.concat(this.props.newTask)
        // this.setState({taskList=newTaskList})
        this.props.setTaskList(newTaskList);
    }

    render() {
        return (
                <button onClick={this.addHandler}>Add Task
                </button>
        )
    }

}




class ShowTasks extends React.Component {

    render() {
        let showTaskList = this.props.taskList.map((task,index) => {
            return (
                <li>{task}</li>
            )
        })

        return (
            <div>
                <ul>
                    {showTaskList}
                </ul>
            </div>
        )
    }

}




class Board extends React.Component {

    constructor(){
        super();
        this.setTask = this.setTask.bind(this);
        this.setTaskList = this.setTaskList.bind(this)
        this.state = {
            task: '',
            taskList: [],
        }
    }

    setTask(task){
        this.setState({task})
    }

    setTaskList(taskList){
        this.setState({taskList})
    }

    render() {
        return (
            <div>
                <Form setTask={this.setTask} />
                <AddList taskList = {this.state.taskList} newTask = {this.state.task} setTaskList = {this.setTaskList} />
                <ShowTasks taskList = {this.state.taskList} />
            </div>
        )
    }

}




ReactDOM.render(<Board/>, document.getElementById("root"))
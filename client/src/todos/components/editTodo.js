import React, {Component} from 'react';

import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';

class EditTodo extends Component {

    constructor(props) {
        super(props);
        if (this.props.todo) {
            this.state = {
                ...this.props.todo
            }
        } else {
            this.state = {
                ...this.emptyTodo()
            }
        }
    }

    emptyTodo = () => {
        return {title: "", description: "", date: new Date()}
    }


    changeNewTitle = (event) => {
        this.setState({title: event.target.value})
    }

    changeNewDescription = (event) => {
        this.setState({description: event.target.value})
    }

    changeNewDate = (event) => {
        this.setState({date: event})
    }

    createTodo = (event) => {
        this.resetTodo()
        this.props.createTodo(this.state)
    }
    editTodo = (event) => {
        this.props.editTodo(this.state)
    }

    resetTodo = () => {
        this.setState({title: "", description: "", date: new Date()})
    }
    cancelEditing = () => {
        this.props.cancelEditing();
    }

    getDateForDatePicker() {
        return new Date();
    }

    render() {
        return (
            <Table.Row>

                <Table.Cell>
                    <Input                        
                        placeholder='Title'
                        value={this.state.title}
                        onChange={this.changeNewTitle}/>
                </Table.Cell>

                <Table.Cell>
                    <Input
                        placeholder='Description'
                        value={this.state.description}
                        onChange={this.changeNewDescription}/>
                </Table.Cell>
                <Options
                    todo={this.props.todo}    
                    editTodo={this.editTodo}
                    createTodo={this.createTodo}
                    resetTodo={this.resetTodo}
                    cancelEdit={this.cancelEditing}
                />

            </Table.Row>
        )
    }
}

export default EditTodo;

const Options = (props) => {
    if (props.todo && props.todo.editing) {
        return EditOptions(props);
    } else {
        return AddOptions(props);
    }
}



const EditOptions = (props) => {
    return (
        <Table.Cell>
            <Button color='green' onClick={props.editTodo}>
                Edit
            </Button>
            < Button color='blue' onClick={props.cancelEdit}>
                Cancel
            </Button>
        </Table.Cell>
    );
}

const AddOptions = (props) => {
    return (
        <Table.Cell>
            <Button color='green' onClick={props.createTodo}>
                Create
            </Button>
            < Button color='blue' onClick={props.resetTodo}>
                Reset
            </Button>
        </Table.Cell>
    );
}


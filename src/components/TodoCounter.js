import React, { Component } from 'react'

class TodoCounter extends Component {
    render() {
        let todos = this.props.todos
        let total = todos.length
        let completeLength = todos.filter(e => e.done).length
        let uncompleteLength = todos.filter(e => !e.done).length
        return (
            <div className="todo-counter">
                <label htmlFor="new-todo">COUNTER</label>
                <div className="todo-table">
                    <div className="todo-row">
                        <span className="cell">Count</span>
                        <span className="cell">Finished</span>
                        <span className="cell">Unfinished</span>
                    </div>
                    <div className="todo-row">
                        <span className="cell">{total}</span>
                        <span className="cell">{completeLength}</span>
                        <span className="cell">{uncompleteLength}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default TodoCounter

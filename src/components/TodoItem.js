import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TodoApi from '../api/todo'
import TodoContext from './TodoContext'

class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        let { task, id, done } = this.props.todo
        this.state = {
            // 使用 editing 这个变量管理正在编辑/非编辑的状态
            // 这个是 react 应用的常见解决思路, 即通过 state 的变化来改变 UI
            editing: false,
            text: task,
            todo: {
                task,
                id,
                done,
            }
        }
    }

    // 指定 contextType 为 TodoContext 之后
    // 就可以从 TodoContext 里面通过 this.context.xxx 的形式获取值
    static contextType = TodoContext

    onEdit = () => {
        this.setState({
            editing: true,
        })
    }

    onDelete = () => {
        let { id } = this.state.todo
        let todoId = String(id)
        this.api.delete(todoId, (r) => {
            // this.props.onDelete(id)
            this.context.onContextDelete(id)
        })
    }

    updateTodo(todoId, data) {
        this.api.update(todoId, data, (r) => {
            this.setState({
                todo: r,
                editing: false,
            })
            this.updateCounter()
        })
    }

    onSubmit = () => {
        let { id } = this.state.todo
        let text = this.state.text
        let todoId = String(id)
        let data = {
            task: text
        }
        this.updateTodo(todoId, data)
    }

    onCancel = () => {
        this.setState({
            editing: false,
        })
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    updateCounter() {
        // let func = this.props.onUpdate
        let func = this.context.onContextUpdate
        func(this.state.todo)
    }

    toggleComplete = () => {
        let { id, done } = this.state.todo
        let data = {
            done: !done,
        }
        let todoId = String(id)
        this.updateTodo(todoId, data)
    }

    render() {
        let {id, task, done} = this.state.todo
        let todo = null
        // 正在编辑的时候是一个组件
        // 完成编辑的时候是另一个组件
        if (this.state.editing) {
            todo = (
                <div>
                    <input id="input-edit" type="text"
                           value={this.state.text}
                           onChange={this.onChange}/>
                    {/*<button onClick={this.onSubmit}>OK</button>*/}
                    {/*<button className="btn-picto" aria-label="Delete" onClick={this.onCancel}>delete</button>*/}
                    <button className="btn-edit" type="button" aria-label="Delete" title="Delete" onClick={this.onSubmit}>
                        <i aria-hidden="true" className="material-icons">done</i>
                    </button>
                    <button className="btn-edit" type="button" aria-label="Delete" title="Delete" onClick={this.onCancel}>
                        <i aria-hidden="true" className="material-icons">close</i>
                    </button>
                </div>
            )
        } else {
            let text = this.state.todo.done ? 'check_box' : 'check_box_outline_blank'
            todo = (
                <div>
                    {/*<button onClick={this.onEdit}>编辑</button>*/}
                    {/*<button onClick={this.onDelete}>删除</button>*/}
                    {/*<button onClick={this.toggleComplete}>{text}</button>*/}
                    {/*todo 的详细信息*/}
                    <Link class="label" to={`/todo/${id}`}>{task}</Link>
                    <button className="btn-picto" type="button" aria-label="Delete" title="Delete" onClick={this.onDelete}>
                        <i aria-hidden="true" className="material-icons">delete</i>
                    </button>
                    <button className="btn-picto" type="button" onClick={this.onEdit}>
                        <i aria-hidden="true" className="material-icons">edit</i>
                    </button>
                    <button className="btn-picto" type="button" onClick={this.toggleComplete}>
                        <i aria-hidden="true" className="material-icons">{text}</i>
                    </button>
                </div>
            )
        }
        let cls = done ? 'todo-complete' : ''
        return (
            <div className={`todo-cell ${cls}`}>
                {todo}
            </div>
        )
    }
}

export default TodoItem

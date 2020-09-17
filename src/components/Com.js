import React, { Component } from 'react'

// 组件通信
// 父组件对子组件通信, 就是父组件把数据给子组件
// 子组件对父组件通信, 就是子组件把数据给父组件
// 父组件传递回调函数给子组件, 然后在子组件调用

class Parent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameFromChild: null,
        }
    }
    tsxn = (dataFromChild) => {
        console.log('args', dataFromChild)
        this.setState({
            nameFromChild: dataFromChild,
        })
    }
    render() {
        return (
            <div className="gua-box">
                <h2>父组件</h2>
                父组件调用 Child 子组件
                <p>来自子组件的数据: { this.state.nameFromChild }</p>
                <Child name='gua'
                       onParentToChild={this.tsxn} />
            </div>
        )
    }
}

class Child extends Component {
    constructor(props) {
        super(props)
        this.state = {
            childName: 'xiao gua'
        }
    }
    actionClick = () => {
        let func = this.props.onParentToChild
        console.log('func', func)
        if (typeof func === 'function') {
            let parameter = this.state.childName
            func(parameter)
        }
    }
    render() {
        let name = this.props.name
        return (
            <div className="gua-box">
                <h2>子组件</h2>
                <button onClick={this.actionClick}>child click</button>
                <p>父组件的数据: { name }</p>
                <p>子组件的数据: { this.state.childName }</p>
            </div>
        )
    }
}

export default Parent

import React, { Component } from 'react'
import Menu from './Menu'
import Com from './Com'

import './home.css'

class Home extends Component {
    render() {
        let path = this.props.match.path
        console.log('path', path)
        return (
            <div>
                {/*Home 组件中调用 Menu 组件*/}
                <Menu path={path}/>
                   Click the text above to switch the tab.
                <br/>
                <br/>
                {/*<Com />*/}
            </div>
        )
    }
}

export default Home

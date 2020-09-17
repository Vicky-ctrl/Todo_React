import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

class Menu extends Component {
    // 根据动态路由的 path 渲染「当前」菜单
    // classNames 是 react 项目中常用的一个 css class 库
    classForPath = (menu) => {
        let path = this.props.path
        // 如果对象的 value 为 true, 那么就返回对象的 key
        // 因为 key 是字符串, 所以会返回字符串
        let c = classNames({
            'active': menu.url === path,
        })
        return c

        // 与下面的代码等价
        // if (menu.url === path) {
        //     return 'active'
        // } else {
        //     return ''
        // }
    }
    render() {
        let menus = [
            {
                text: 'HOME',
                url: '/',
            },
            {
                text: 'TODO',
                url: '/todo',
            },
        ]
        return (
            <nav>
                {
                    menus.map((e, index) =>
                        // Link 组件相当于 a 标签的作用, to 相当于 href 属性
                        <Link to={e.url} key={index}
                              className={this.classForPath(e)}>
                            {e.text}
                        </Link>
                    )
                }
            </nav>
        )
    }
}

export default Menu

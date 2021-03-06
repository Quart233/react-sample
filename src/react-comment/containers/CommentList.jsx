import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommnetList from '../components/comment-list'
import { initComments, deleteComment } from '../reducers/comments'

// commentlistcontainer
// 一个 Smart 组件，负责评论列表数据的加载、初始化、删除评论
// 沟通 CommentList 和 store.state

// 数据流向
// store -> context -> connect -> CommentListContainer -> CommnetList

// dispatch 流向

// 创建 store
// createStore reducer -> dispatch -> reducer -> store

// 将 dispatch 传递给组件
// reducer -> mapDispatchToProps -> connect mount -> this.prop

// 当触发 dispatch 的时候
// 触发 this.prop 上的 dispatch 时 dispatch -> reducer -> store

class CommentListContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
    }

    componentWillMount () {
        // componentWillMount 生命周期中初始化评论
        this._loadComments()
    }

    _loadComments () {
        // 此时 store.state.comment 为 []
        // 从 LocalStorage 中加载评论
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        // this.props.initComments 
        // 是 connect 通过 prop 传进来的
        // 初始化  store.state 中的 comments
        this.props.initComments(comments)
    }

    handleDeleteComment (index) {
        const { comments } = this.props
        // props 是不能变的，所以这里新建了一个删除了指定下标的评论列表
        const newComments = [
            // 截取 index 之前的元素 的元素
            ...comments.slice(0, index),
            // 截取 index 之后的元素 的元素
            ...comments.slice(index + 1)
        ]
        // 更新 localStorage 中的 comments
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onDeleteComment) {
            // 更新 store.state 中的 comments
            this.props.onDeleteComment(index)
        }
    }

    render () {
        return (
            <CommnetList 
            comments={this.props.comments}
            onDleteComment={this.handleDeleteComment.bind(this)} />
        )
    }
}

// 评论表从 store.state.comments 中获取
const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // 将 store.state 中的数据通过 prop 提供给 CommentListContainer
        // 当从 LocalStorage 加载评论列表之后就会通过这个方法
        // 将评论列表初始化到 store.state 当中
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        // 删除评论
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

// 将 CommentListContainer connect 到 store
// 会把 comments initComments onDeleteComment 传给 CommentListContainer
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)
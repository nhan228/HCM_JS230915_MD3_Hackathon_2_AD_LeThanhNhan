import React from 'react'
import api from '../../services'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { todoAction } from '../../store/slices/todo.slice'

import './form.scss'

export default function UpdateForm({ id, setDisplayUpdateFrom, displayUpdateFrom }) {
    const todoStore = useSelector(store => store.todoStore)
    let task = todoStore.data.find(s => s.id === id)
    const dispatch = useDispatch()
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            if (e.target.name.value == '' || e.target.desc.value == '') {
                Modal.warn({
                    title: 'Cảnh báo',
                    content: 'Vui lòng không bỏ trống',
                })
                return
            }
            let task = {
                name: e.target.name.value,
                decs: e.target.desc.value
            }
            let result = await api.todo.update(id, task)
            Modal.success({
                title: 'Thành công',
                content: 'Cập nhật thành công task',
                onOk: () => {
                    dispatch(todoAction.updateTodo(result?.data?.data))
                    e.target.name.value = ''
                    e.target.desc.value = ''
                    setDisplayUpdateFrom(!displayUpdateFrom)
                }
            })
        } catch (err) {
            console.log('err', err);
        }
    }
    return (
        <>
            <div className='update-form'>
                <form onSubmit={(e) => {
                    handleUpdate(e)
                }}>
                    <div onClick={() => {
                        setDisplayUpdateFrom(!displayUpdateFrom)
                    }} className="close">x</div>
                    <h2>Update Task</h2>
                    <label>Name: </label>
                    <input type='text' id='name' defaultValue={task.name}></input>
                    <label>Description: </label>
                    <textarea name="desc" defaultValue={task.decs}></textarea>
                    <button type='submit'>Save</button>
                </form>
            </div>
        </>
    )
}

import React from 'react'
import api from '../../services'
import { useDispatch } from 'react-redux'
import { todoAction } from '../../store/slices/todo.slice'
import { Modal } from 'antd'

import './form.scss'

export default function CreateForm({ displayCreateFrom, setDisplayCreateFrom }) {
    const dispatch = useDispatch()
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            if (e.target.name.value == '' || e.target.desc.value == '') {
                Modal.warn({
                    title: 'Cảnh báo',
                    content: 'Không được bỏ trống!',
                })
                return
            }
            let task = {
                name: e.target.name.value,
                decs: e.target.desc.value
            }
            let result = await api.todo.create(task)
            
            Modal.success({
                title: 'Thành công',
                content: 'Tạo thành công task mới',
                onOk: () => {
                    dispatch(todoAction.addTodo(result?.data?.data))
                    e.target.name.value = ''
                    e.target.desc.value = ''
                    setDisplayCreateFrom(!displayCreateFrom)
                }
            })
        } catch (err) {
            console.log('err', err);
            Modal.error({
                title: 'Lỗi',
                content: "Tạo task không thành công",
                onOk: () => {}
            })
            return
        }
    }
    return (
        <>
            <div className='create-form'>
                <form onSubmit={(e) => {
                    handleCreate(e)
                }}>
                    <div onClick={() => {
                        setDisplayCreateFrom(!displayCreateFrom)
                    }} className='close'>x</div>
                    <h2>Create Task</h2>
                    <label>Name: </label>
                    <input type='text' id='name' placeholder='Enter task name'></input>
                    <label>Description: </label>
                    <textarea name="desc" placeholder='Enter task description '></textarea>
                    <button type='submit'>Create</button>
                </form>
            </div>
        </>
    )
}

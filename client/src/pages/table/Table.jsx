import React from 'react'
import api from '../../services'
import { useDispatch, useSelector } from 'react-redux'
import { todoAction } from '../../store/slices/todo.slice'
import { Modal } from 'antd'

import './table.scss'

export default function Table({ setDisplayUpdateFrom, displayUpdateFrom, setId }) {
    const todoStore = useSelector(store => store.todoStore)
    const userStore = useSelector(store => store.userStore)
    const dispatch = useDispatch()
    const handleDelete = async (userId) => {
        try {
            await api.todo.delete(userId)
            dispatch(todoAction.deleteTodo(userId))
        } catch (err) {
            console.log('err', err);
        }
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoStore.data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className='decs'>{item.decs}</td>
                                {
                                    (userStore.data?.role == "admin") ? <td className='button'><button className='update'
                                        onClick={() => {
                                            setId(item.id)
                                            setDisplayUpdateFrom(!displayUpdateFrom)
                                        }}>Update</button>

                                        <button className='delete'
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: 'Xóa',
                                                    content: 'Bạn có muốn xóa task này',
                                                    okText: 'Yes',
                                                    cancelText: "No",
                                                    onOk: () => { handleDelete(item.id) },
                                                    onCancel: () => { }
                                                })
                                            }}>Delete</button>
                                    </td> : <td><p style={{ color: "red" }}>Không có quyền</p></td>
                                }
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

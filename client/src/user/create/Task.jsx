import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import './task.scss';
import api from '@services/apis';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { todoAction } from '../../store/slices/todolist.slice';

export default function Task() {
    const dispatch = useDispatch();
    const todotStore = useSelector(store => store.todoStore);
    const role = localStorage.getItem("userRole");
    const newRole = role == "false" ? "member" : role == "true" ? "admin" : role;

    const [editingTask, setEditingTask] = useState({
        id: null,
        name: '',
    });
    // Add
    async function handleAddTodo(e) {
        if (newRole == "member") {
            return;
        } else {
            e.preventDefault();
            try {
                let newlist = {
                    name: e.target.name.value,
                };
                console.log(newlist);
                let result = await api.todo.create(newlist);
                console.log("result", result);
                Modal.confirm({
                    title: "Thông báo",
                    content: "Tạo công việc thành công",
                    onOk: () => {
                        dispatch(todoAction.addTodo(result.data.data));
                        e.target.name.value = "";
                    },
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
    // Update
    async function handleUpdate(e, id) {
        e.preventDefault();
        try {
            let updateNew = {
                name: editingTask.name,
            };
            console.log("updateNew", updateNew);
            let result = await api.todo.update(id, updateNew);
            console.log("result", result);
            Modal.confirm({
                title: "Thông báo",
                content: "Bạn có muốn thay đổi không ?",
                onOk: () => {
                    dispatch(todoAction.updateTodo({ id: id, data: updateNew }));
                    setEditingTask({ name: "" });
                },
            });
        } catch (err) {
            console.log("Cập nhật không thành công", err);
        }
    }
    // Delete
    const handleDeleteDo = (todo) => {
        Modal.confirm({
            title: 'Thông báo',
            content: 'Bạn có muốn xóa công việc này?',
            async onOk() {
                try {
                    await api.todo.delete(todo.id);
                    dispatch(todoAction.delete(todo.id));
                    alert("đã xóa");
                } catch (err) {
                    console.log("Lỗi không xóa được công việc", err);
                }
            },
            onCancel() { },
        });
    }

    return (
        <div>
            <div className='container'>
                <h2>TODO LIST</h2>
                <div className='box'>
                    <form onSubmit={(e) => {handleAddTodo(e)}}>
                        <div className='header-box'>
                            <div className='main-box-btn-add'>
                                {editingTask.id == null ?
                                    <input type='text' id='name' name='name' disabled={newRole == "member"}></input> :
                                    <input type='text' id='name' name='name' value={editingTask.name} onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}></input>}
                            </div>
                            <div>
                                {editingTask.id == null ?
                                    <button type='submit' disabled={newRole == "member"}>Add</button> :
                                    <button onClick={(e) => handleUpdate(e, editingTask.id)} disabled={newRole == "member"}>Save
                                    </button>}
                            </div>
                        </div>
                        <div>
                            <h3>task</h3>
                        </div>
                    </form>
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todotStore.data?.map((todo, index) => {
                                        return (
                                            <tr key={todo.id}>
                                                <td>{todo.name}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteDo(todo)} disabled={newRole == "member"}>delete</button>
                                                    <button onClick={() => setEditingTask({ id: todo.id, name: todo.name })} disabled={newRole == "member"}>Edit</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

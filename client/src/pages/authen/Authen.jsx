import React, { useEffect } from 'react'
import { Modal } from 'antd'
import api from '../../services'

import './authen.scss'

export default function Authen() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = "/"
        }
    }, [])
    return (
        <div >
            <form className='login' onSubmit={async (e) => {
                try {
                    e.preventDefault()
                    if (e.target.username.value == "" || e.target.password.value == "") {
                        Modal.warn({
                            title: 'Error',
                            content: "Username và password không được bỏ trống",
                            onOk: () => {}
                        })
                        return
                    }
                    let user = {
                        username: e.target.username.value,
                        password: e.target.password.value,
                    }
                    let result = await api.user.login(user)
                    console.log('res',result);
                    if (result.status == 200) {
                        Modal.success({
                            title: 'Thành công',
                            content: result.data.message,
                            onOk: () => {
                                localStorage.setItem('token', result.data.token)
                                window.location.href = "/"
                            }
                        })
                        localStorage.setItem('token', result.data.token)
                    }
                } catch (err) {
                    Modal.error({
                        title: 'Error',
                        content: err.response?.data?.message || 'Lỗi server',
                        onOk: () => {}
                    })
                }
            }}>
                <h2>LOGIN</h2>
                <input type="text" placeholder="USERNAME" id='username' />
                <input type="password" placeholder="PASSWORD" id='password' />
                <button className="opacity" type="submit">
                    LOGIN
                </button>
            </form>
        </div >
    )
}

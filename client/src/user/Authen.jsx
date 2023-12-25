import React from 'react'
import './authen.scss'
import api from '@services/apis';
import { Modal } from 'antd';

export default function Authen() {
    async function handleLogin(e) {
        e.preventDefault();
        if (!username || !password) {
            Modal.error({
                title: 'Error',
                content: 'Vui lòng nhập đầy đủ thông tin!'
            });
            return;
        }

        try {
            let newdata = {
                username: e.target.username.value,
                password: e.target.password.value
            }
            console.log(newdata);
            let result = await api.member.login(newdata)
            localStorage.setItem("userRole", result.data.data.data.role)
            Modal.success({
                title: "Thông báo",
                content: "Đăng nhập thành công",
                onOk: () => {
                    window.location.href = '/task'
                }
            })
        } catch (err) {

            Modal.error({
                title: 'Error',
                content: "lỗi"
            })
        }
    }

    return (

        < div className="img-background" >
            <form onSubmit={(e) => {
                handleLogin(e)
            }}>
                <div className='box_authen'>
                    <div className='box-sign-in'>
                        <div>
                            <h3>Login</h3>
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <br />
                            <input type="text" placeholder='username' name="username" id='username' required />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" placeholder='password' name='password' id='password' required />
                        </div>
                        <div>
                            <button className="btn-sign-in" type='submit'>Login</button>
                        </div>
                    </div >
                </div>
            </form >
        </div >


    )
}

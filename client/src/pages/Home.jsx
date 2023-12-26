import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Table from '../pages/table/Table.jsx'
import CreateForm from '../pages/form/Create.jsx'
import UpdateForm from '../pages/form/Update.jsx'

import './home.scss'

export default function Home() {
    const userStore = useSelector(store => store.userStore)
    const [displayCreateFrom, setDisplayCreateFrom] = useState(false)
    const [displayUpdateFrom, setDisplayUpdateFrom] = useState(false)
    const [id, setId] = useState(null)
    return (
        <>
            <div className='app'>
                <div className='authen'>
                    {
                        localStorage.getItem('token') ? <button
                            onClick={() => {
                                localStorage.removeItem('token')
                                window.location.reload()
                            }}
                            className='btn_authen_logout'>Đăng xuất</button> : <button onClick={() => {
                                window.location.href = '/authen'
                            }}
                                className='btn_authen_login'>Đăng nhập</button>
                    }
                </div>
                <div className='app-container'>
                    {
                        (userStore.data?.role == "admin") && <button className='create-button' onClick={() => {
                            setDisplayCreateFrom(!displayCreateFrom)
                        }}>Create</button>
                    }
                    {displayCreateFrom && <CreateForm displayCreateFrom={displayCreateFrom} setDisplayCreateFrom={setDisplayCreateFrom} />}
                    {displayUpdateFrom && <UpdateForm id={id} setDisplayUpdateFrom={setDisplayUpdateFrom} displayUpdateFrom={displayUpdateFrom} />}
                    <div className='title'>
                        <h4>TODO LIST</h4>
                    </div>
                    <div className='table-container'>
                        {
                            userStore.data ? <Table setDisplayUpdateFrom={setDisplayUpdateFrom} displayUpdateFrom={displayUpdateFrom} setId={setId} /> : <h2 style={{ margin: "20px" }}>Đăng nhập để xem tasks</h2>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

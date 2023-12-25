import React, { useEffect } from 'react'

export default function BackHome() {
    useEffect(() => {
        window.location.href = BackHome ? BackHome : "/authen"
    }, [])
    return (
        <div>BackHome</div>
    )
}

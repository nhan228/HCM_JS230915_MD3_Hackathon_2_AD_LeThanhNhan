import React from 'react'
import RouteIndex from './routes/RouteIndex'
import api from '../src/services/apis'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { todoAction } from './store/slices/todolist.slice'

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    api.todo.findMany()
      .then(res => {
        console.log(res);
        dispatch(todoAction.setData(res.data));
      })
      .catch(err => {
        console.log("Lỗi data", err);
      });
  }, []);

  return (
    <div>
      <RouteIndex />
    </div>

  )
}

import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import { TextField, Button } from '@material-ui/core'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({
    username: '',
    password: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.username, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <div >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField type="text" {...getInputProps('username')} label={"Username"} />
        <br />
        <TextField type="password" {...getInputProps('password')} label={"Paswword"} />
        <br />
        <br />
        <Button variant="contained" type="submit">Login</Button>
      </form>
      {message && <div className="info info-danger">{message}</div>}
    </div>
  )
}

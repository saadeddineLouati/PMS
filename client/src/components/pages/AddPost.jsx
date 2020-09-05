import React, { useState, useEffect } from 'react'
import api from '../../api'
import { TextField, Button } from '@material-ui/core'

export default function AddPost(props) {
  const { loadPosts } = props
  const [user, setUser] = useState(null)
  const [state, setState] = useState({
    text: '',
  })
  const [message, setMessage] = useState(null)


  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()

    let data = {
      text: state.text,
      author: api.getLocalStorageUser()._id
    }
    console.log(data)
    api
      .addPost(data)
      .then(result => {
        loadPosts()
        setState({
          text: '',
        })
        setMessage(`Your post has been created`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(err => setState({ message: err.toString() }))
  }
  useEffect(() => {

  }, [])
  return (
    <div className="AddPost">
      <h2>Add Post</h2>
      <form>
        <TextField
          name="text"
          id="text"
          label="Text"
          multiline
          rows={4}
          defaultValue={state.text}
          variant="outlined"
          onChange={handleInputChange}
        />
        <br />
        <Button onClick={e => handleClick(e)} variant="outlined">Create post</Button>
      </form>
      {message && <div className="info">{message}</div>}
    </div>
  )
}

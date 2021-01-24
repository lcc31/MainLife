import React from 'react'
import './DoctorAddForm.css'

class DoctorAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      specialization: ''
    }

    this.add = () => {
      this.props.onAdd({
        name: this.state.name,
        specialization: this.state.specialization
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

  }

  render() {
    return (
      <div className="contact">
        <h1>Contact us: </h1>
        <div className="forms">
          <div className="form">
            <label htmlFor='name'>Doctor name: </label>
            <input
              type='text'
              name='name'
              id='name'
              value={this.state.name}
              onChange={this.handleChange} />
          </div>
          <div className="form">
            <label htmlFor='specialization'>Specialization: </label>
            <input
              type='text'
              name='specialization'
              id='specialization'
              value={this.state.specialization}
              onChange={this.handleChange} />
          </div>
          <div className="form">
            <input type='button' value='add' onClick={this.add} />
          </div>
        </div>
      </div>
    )
  }
}

export default DoctorAddForm

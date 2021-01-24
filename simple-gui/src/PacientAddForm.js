import React from 'react'

class PacientAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      consultation: '',
      diagnostic: '',
      age: '',
      gender: ''
    }

    this.add = () => {
      this.props.onAdd({
        name: this.state.name,
        phone: this.state.phone,
        consultation: this.state.consultation,
        diagnostic: this.state.diagnostic,
        age: this.state.age,
        gender: this.state.gender
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
      <div className="form">
        <div>
          <label className="labelForm" htmlFor='name'>Name </label>
          <input className="inputForm"
            type='text'
            name='name'
            id='name'
            value={this.state.name}
            onChange={this.handleChange} />
        </div>
        <div>
          <label className="labelForm" htmlFor='phone'>Phone </label>
          <input className="inputForm"
            type='text'
            name='phone'
            id='phone'
            value={this.state.phone}
            onChange={this.handleChange} />
        </div>
        <div>
          <label className="labelForm" htmlFor='consultation'>Consultation </label>
          <input className="inputForm"
            type='text'
            name='consultation'
            id='consultation'
            value={this.state.consultation}
            onChange={this.handleChange} />
        </div>
        <div>
          <label className="labelForm" htmlFor='diagnostic'>Diagnostic </label>
          <input className="inputForm"
            type='text'
            name='diagnostic'
            id='diagnostic'
            value={this.state.diagnostic}
            onChange={this.handleChange} />
        </div>
        <div>
          <label className="labelForm" htmlFor='age'>Age </label>
          <input className="inputForm"
            type='text'
            name='age'
            id='age'
            value={this.state.age}
            onChange={this.handleChange} />
        </div>
        <div>
          <label className="labelForm" htmlFor='gender'>Gender </label>
          <input className="inputForm"
            type='text'
            name='gender'
            id='gender'
            value={this.state.gender}
            onChange={this.handleChange} />
        </div>
        <div id="inputButtonForm">
          <input
            type='button'
            value='add'
            onClick={this.add} />
        </div>
      </div>
    )
  }
}

export default PacientAddForm

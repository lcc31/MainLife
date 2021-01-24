import React from 'react'
import './Doctor.css'

class Doctor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.item.name,
      specialization: this.props.item.specialization
    }
    this.delete = (evt) => {
      this.props.onDelete(this.props.item.id)
    }
    this.edit = () => {
      this.setState({
        isEditing: true
      })
    }
    this.cancel = () => {
      this.setState({
        isEditing: false
      })
    }

    this.save = () => {
      this.props.onSave(this.props.item.id, {
        name: this.state.name,
        specialization: this.state.specialization
      })
      this.setState({
        isEditing: false
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.select = () => {
      this.props.onSelect(this.props.item.id)
    }

  }

  render() {
    const { item } = this.props
    return (
      <div>
        {
          this.state.isEditing ?
            <>
              <span>
                <input type="text"
                  name='name'
                  value={this.state.name}
                  onChange={this.handleChange} />
              </span>
              <span>
                <input type="text"
                  name='specialization'
                  value={this.state.specialization}
                  onChange={this.handleChange} />
              </span>
              <input type="button"
                value='cancel'
                onClick={this.cancel} />
              <input type="button"
                value='save'
                onClick={this.save} />
            </>
            :
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Specialization</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{item.name}</td>
                  <td>{item.specialization}</td>
                  <td> <span className="buttons">
                    <input type="button"
                      value='delete'
                      onClick={this.delete} />
                    <input type="button"
                      value='edit'
                      onClick={this.edit} />
                    <input type="button"
                      value='select'
                      onClick={this.select} />
                  </span></td>
                </tbody>

              </table>
            </>
        }
      </div>
    )
  }
}

export default Doctor
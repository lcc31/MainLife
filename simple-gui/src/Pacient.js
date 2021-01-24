import React from 'react'
import './Pacient.css'

class Pacient extends React.Component {
  constructor(props) {
    super(props)
    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }
  }

  render() {
    const { item } = this.props
    return (
      <div id="pacientScheduled">
        {item.name} has scheduled {item.consultation} consultation.
        <input id="inputButtonForm"
          type="button"
          value='delete'
          onClick={this.delete} />
      </div>
    )
  }
}

export default Pacient

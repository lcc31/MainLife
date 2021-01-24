import React from 'react'
import PacientStore from './PacientStore'
import Pacient from './Pacient'
import PacientAddForm from './PacientAddForm'

class DoctorDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pacients: []
    }

    this.cancel = () => {
      this.props.onCancel()
    }

    this.store = new PacientStore(this.props.itemId)

    this.add = (pacient) => {
      this.store.addOne(pacient)
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }
  }

  componentDidMount() {
    this.store.getAll()
    this.store.emitter.addListener('GET_PACIENT_SUCCESS', () => {
      this.setState({
        pacients: this.store.data
      })
    })
  }

  render() {
    return (
      <div>
        <h2 className="h2">Doctor's page {this.props.itemId} appointments: </h2>
        <div>
          <PacientAddForm
            onAdd={this.add} />
        </div>
        <div id="btnCancelForm">
          <input
            type="button"
            value='cancel'
            onClick={this.cancel} />
        </div>
        <div id="pacientDetails">
          {
            this.state.pacients.map(e =>
              <Pacient
                item={e}
                key={e.id}
                onDelete={this.delete} />)
          }
        </div>
      </div>
    )
  }
}

export default DoctorDetails

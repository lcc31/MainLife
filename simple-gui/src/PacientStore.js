import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class PacientStore {
  constructor(doctorId) {
    this.doctorId = doctorId
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll() {
    try {
      const response = await fetch(`${SERVER}/doctors/${this.doctorId}/pacients`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_PACIENT_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_PACIENT_ERROR')
    }
  }

  async addOne(pacient) {
    try {
      await fetch(`${SERVER}/doctors/${this.doctorId}/pacients`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacient)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_PACIENT_ERROR')
    }
  }

  async saveOne(id, pacient) {
    try {
      await fetch(`${SERVER}/doctors/${this.doctorId}/pacients/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacient)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_PACIENT_ERROR')
    }
  }

  async deleteOne(id) {
    try {
      await fetch(`${SERVER}/doctors/${this.doctorId}/pacients/${id}`, {
        method: 'delete'
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_PACIENT_ERROR')
    }
  }
}

export default PacientStore

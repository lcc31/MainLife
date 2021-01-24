import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class DoctorStore {
  constructor() {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll() {
    try {
      const response = await fetch(`${SERVER}/doctors`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_DOCTORS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_DOCTORS_ERROR')
    }
  }

  async addOne(doctor) {
    try {
      await fetch(`${SERVER}/doctors`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctor)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_DOCTOR_ERROR')
    }
  }

  async saveOne(id, doctor) {
    try {
      await fetch(`${SERVER}/doctors/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctor)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_DOCTOR_ERROR')
    }
  }

  async deleteOne(id) {
    try {
      await fetch(`${SERVER}/doctors/${id}`, {
        method: 'delete'
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_DOCTOR_ERROR')
    }
  }
}

const store = new DoctorStore()

export default store

import React from 'react'
import './App.css'
import Doctor from './Doctor'
import DoctorAddForm from './DoctorAddForm'
import DoctorDetails from './DoctorDetails'
import store from './DoctorStore'
import Home from './containers/Home'
import Header from './components/Header'
import Hero from './components/Hero'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ContactUS from './containers/ContactUs'
import Post from './containers/Post'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      doctors: [],
      selected: 0
    }
    this.add = (doctor) => {
      store.addOne(doctor)
    }
    this.save = (id, doctor) => {
      store.saveOne(id, doctor)
    }
    this.delete = (id) => {
      store.deleteOne(id)
    }
    this.select = (id) => {
      this.setState({
        selected: id
      })
    }
    this.cancel = () => {
      this.setState({
        selected: 0
      })
    }
  }

  componentDidMount() {
    store.getAll()
    store.emitter.addListener('GET_DOCTORS_SUCCESS', () => {
      this.setState({
        doctors: store.data
      })
    })
  }

  render() {
    if (this.state.selected === 0) {
      return (
        <Router>
          <div className="App">
            <Header />
            <Hero />
            <Route path="/" component={Home} />
            <Route path="/contact-us" component={ContactUS} />
            <Route path="/posts/:slug" component={Post} />
            <>
              <DoctorAddForm
                onAdd={this.add} />
              {
                this.state.doctors.map(e =>
                  <Doctor
                    item={e}
                    key={e.id}
                    onSave={this.save}
                    onDelete={this.delete}
                    onSelect={this.select} />)
              }
            </>
          </div >
        </Router>
      )
    } else {
      return <DoctorDetails
        onCancel={this.cancel}
        itemId={this.state.selected} />
    }
  }
}

export default App

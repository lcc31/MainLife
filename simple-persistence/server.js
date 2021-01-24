const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')

const sequelize = new Sequelize(
  'clinic_db',
  'root',
  'Asdweq1234!#%', {
  dialect: 'mysql'
})

const Doctor = sequelize.define('doctor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 10]
    }
  },
  specialization: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['NEUROLOGY', 'ORTHOPEDIC', 'OSTEOPATHY', 'PEDIATRICS']
  }
})

const Pacient = sequelize.define('pacient', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 10]
    }
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 10
    }
  },
  consultation: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['NEUROLOGY', 'ORTHOPEDIC', 'OSTEOPATHY', 'PEDIATRICS']
  },
  diagnostic: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 30]
    }
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  gender: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['MALE', 'FEMALE']
  }
})

Doctor.hasMany(Pacient)

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

app.get('/doctors', async (req, res, next) => {
  let pageSize = 10
  const query = {
    where: {}
  }
  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
  }
  if (req.query.filter) {
    query.where.maker = {
      [Op.like]: `%${req.query.filter}%`
    }
  }
  if (req.query.page) {
    query.offset = pageSize * parseInt(req.query.page)
    query.limit = pageSize
  }
  try {
    const doctors = await Doctor.findAll(query)
    res.status(200).json(doctors)
  } catch (err) {
    next(err)
  }
})
app.post('/doctors', async (req, res, next) => {
  try {
    await Doctor.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})
app.get('/doctors/:did', async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.did)
    if (doctor) {
      res.status(200).json(doctor)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})
app.put('/doctors/:did', async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.did)
    if (doctor) {
      await doctor.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})
app.delete('/doctors/:did', async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.did)
    if (doctor) {
      await doctor.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/doctors/:did/pacients', async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.did, {
      include: [Pacient]
    })
    if (doctor) {
      res.status(200).json(doctor.pacients)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})
app.post('/doctors/:did/pacients', async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.did)
    if (doctor) {
      const pacient = new Pacient(req.body)
      pacient.doctorId = doctor.id
      await pacient.save()
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})
app.get('/doctors/:did/pacients/:pid', async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.did)
    if (doctor) {
      const pacients = await doctor.getPacients({ id: req.params.pid })
      const pacient = pacients.shift()
      if (pacient) {
        res.status(200).json(pacient)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})
app.put('/doctors/:did/pacients/:pid', async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.did)
    if (doctor) {
      const pacients = await doctor.getPacients({ id: req.params.pid })
      const pacient = pacients.shift()
      if (pacient) {
        await pacient.update(req.body)
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})
app.delete('/doctors/:did/pacients/:pid', async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.did)
    if (doctor) {
      const pacients = await doctor.getPacients({ id: req.params.pid })
      const pacient = pacients.shift()
      if (pacient) {
        await pacient.destroy()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)

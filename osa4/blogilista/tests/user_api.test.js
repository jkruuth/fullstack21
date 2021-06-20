const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

describe('Testcase: ', () => {


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

test('When username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'jk',
        name: 'Joonas',
        password: "tosisalainen"
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('when password is too short or does not exist', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'jkruuuuth',
        name: 'Joonas',
        password: "t"
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('when username should be unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'root',
        name: 'root',
        password: "taikasana"
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

})

afterAll(() => {
    mongoose.connection.close()
})
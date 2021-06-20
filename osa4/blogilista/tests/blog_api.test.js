const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

})

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('Blogs should be identified with id', async () => {
    const allBlogs = await helper.blogsInDb()

    const firstBlog = allBlogs[0]

    expect(firstBlog.id).toBeDefined()

})

test('a valid blog can be added', async () => {
    const validBlog = {
        title: 'This is test, not a real blog',
        author: 'Mikko Meikalainen',
        url: 'TESTTEST.TEST',
        likes: 999
    }

    await api
        .post('/api/blogs')
        .send(validBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const content = blogs.map(i => i.title)
    expect(content).toContain('This is test, not a real blog')
})

test('if not set, likes is set to zero by default', async () => {
    const validBlog = {
        title: 'LIKES TEST',
        author: 'Mikko Meikalainen',
        url: 'LIKESLIKES.LIKES',
    }

    const res = await api
        .post('/api/blogs')
        .send(validBlog) 
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const newBlog = await Blog.findById(res.body.id)

    expect(newBlog.likes).toEqual(0)
})

test('blog without title and url is not valid', async () => {
    const notValidBlog = {
        author: 'Mikko Meikalainen',
        likes: 99
    }

    await api
        .post('/api/blogs')
        .send(notValidBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})
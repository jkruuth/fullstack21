const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Top 2 ruokapaikat Suomessa',
        author: 'Esa-Pekka S',
        url: 'jesjes.com',
        likes: 10
    },
    {
        title: 'Pienta pintaremonttia',
        author: 'Antero Tapani',
        url: 'remppareiska.com',
        likes: 13
    },
    {
        title: 'Parhaat rantalomakohteet',
        author: 'Marja K',
        url: 'lomalomaloma.fin',
        likes: 103
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(r => r.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}
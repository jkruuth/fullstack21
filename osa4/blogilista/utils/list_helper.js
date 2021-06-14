const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.map(blog => blog.likes).reduce(reducer)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    const mostLikes = Math.max(...blogs.map(blog => blog.likes), 0)

    const found = blogs.find(blog => blog.likes === mostLikes)
    return {
        "title": found.title,
        "author": found.author,
        "likes": found.likes
    }
}

const mostBlogs = (blogs) => {
    const authorBlogs = _.countBy(blogs, 'author')

    const theMostBlogs = _.max(Object.keys(authorBlogs), authors => authorBlogs[authors])

    return {
        author: theMostBlogs,
        blogs: authorBlogs[theMostBlogs]
    }
}

const mostLikes = (blogs) => {
    const groupByAuthor = _.groupBy(blogs, 'author')
    const authorAndLikes = _(groupByAuthor).map((blog, author) => ({
        author: author,
        likes: _.sumBy(blog, 'likes')
    })).value()

    return _.maxBy(authorAndLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
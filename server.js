const express = require('express')
require('env').config()
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRoute = require('./routes/articles')
const app = express()

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>
console.log('Connected')).catch(err => console.log(err))

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use('/articles', articleRoute)


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})

app.listen(5000)

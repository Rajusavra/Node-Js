let env = require('dotenv');
env.config();

// *********** Packages *********** //
const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')

// *********** Routes *********** //
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const balanceRouter = require('./routes/balance')
const expenseRouter = require('./routes/expense')
const searchRouter = require('./routes/search')

const User = require('./models/users')

const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error'))
db.once('open', () => console.log('Database Connected'))

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret: 'secret',
  touchAfter: 24 * 60 * 60,
})

const sessionConfig = {
  store,
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})


app.get('/', async (req, res) => {
  if(req.user) {
    return res.redirect(`/${req.user.username}`)
  }
  res.render('index')
})

app.get('/favicon.ico', (req, res) => res.status(404))

app.use('/', authRouter)
app.use('/', searchRouter)
app.use('/', expenseRouter)
app.use('/', balanceRouter)
app.use('/', userRouter)

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
    }
  console.log(`Serving on port ${port}`);
});

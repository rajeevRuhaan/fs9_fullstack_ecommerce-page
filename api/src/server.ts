import errorHandler from 'errorhandler'
import mongoose from 'mongoose'
// import dotenv from 'dotenv'

import app from './app'
import { MONGODB_URI } from './util/secrets'
import logger from './util/logger'

// dotenv.config({ path: '.env' })

const mongoUrl = MONGODB_URI

// const mongo = `mongodb://fs9-fullstack:${process.env.PASSWORD}@cluster0-shard-00-00.kienc.mongodb.net:27017,cluster0-shard-00-01.kienc.mongodb.net:27017,cluster0-shard-00-02.kienc.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-bq83u0-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Successfully connected to MongoDB')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

// Start Express server
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

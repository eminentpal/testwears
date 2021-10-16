const mongoose = require ("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }).then(con => {
          console.log(`MongoDB Database connected with Host: ${con.connection.host}  `)
      })
}

module.exports = connectDatabase

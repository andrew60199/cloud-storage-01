const env = process.env.NODE_ENV || 'development';

let allowedList 

if (env === 'production') {
    allowedList = [
        'https://www.remmdesigns.com'
    ]
} else {
    allowedList = [
        'http://localhost:5173'
    ]
}

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedList.indexOf(origin) !== -1) {
            // console.log(origin)
            // console.log(allowedList)

            callback(null, true)
        } else {
            // console.log(allowedList)
            // console.log(origin)

            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200,
    credentials: true,
}

module.exports = corsOptions
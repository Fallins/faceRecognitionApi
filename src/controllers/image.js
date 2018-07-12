const Clarifai = require('clarifai')
const app = new Clarifai.App({
    apiKey: 'aceecbb72eaf453faeb5d4112e960d8c'
})

const handleApiCall = (req, res) => {
    return app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => {
            res.status(400).json('An error occured when fetch API')
            console.log(err)
        })

}

const increseEntries = (req, res, db) => {
    const {id} = req.body
    db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => {
        res.status(400).json('Unable to get entries...')
        console.log(err)
    })
}

module.exports = {
    increseEntries,
    handleApiCall
}
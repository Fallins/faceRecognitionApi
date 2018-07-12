const getProfile = (req, res, db) => {
    const {id} = req.params

    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length == 0)
            return res.json('User not found...')
        return res.json(user[0])
    })
    .catch(err => console.log('An error occured when getting user', err))
}

module.exports = {
    getProfile
}
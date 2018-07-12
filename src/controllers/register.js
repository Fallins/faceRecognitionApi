const handleRegister = (req, res,db, bcrypt) => {
    const {email, name, password} = req.body
    const hash = bcrypt.hashSync(password)

    if(!email || !name || !password) return res.status(400).json('Incorrect form submission...')

    // using transaction to make ture every opertion is working. otherwise it will all failed
    db.transaction(trx => {
        trx.insert({
            hash, email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name, email,
                    joined: new Date(),
                })
                .then(user => res.json(user))
                .catch(err => {
                    console.log(err)
                    res.status(400).json('Unable to register...')
                })
        })
        .then(trx.commit)
        .catch(err => {
            console.log(err)
            res.status(400).json('Unable to register...')
            trx.rollback(err)
        })
    })
    
}

module.exports = {
    handleRegister
}
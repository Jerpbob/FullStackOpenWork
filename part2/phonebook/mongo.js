const mongoose = require('mongoose')

if (process.argv.length === 5) {

    const password = process.argv[2]
    const personName = process.argv[3]
    const number = process.argv[4]

    const url = `mongodb+srv://phonebook:${password}@cluster0.6dhjn8m.mongodb.net/?retryWrites=true&w=majority`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        contactNumber: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        name: personName,
        contactNumber: number,
    })

    person.save().then(result => {
        console.log(`Added ${personName} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    const password = process.argv[2]
    const url = `mongodb+srv://phonebook:${password}@cluster0.6dhjn8m.mongodb.net/?retryWrites=true&w=majority`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        contactNumber: String,
    })

    const Person = mongoose.model('Person', personSchema)

    console.log("phonebook:")

    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, person.contactNumber)
            })
            mongoose.connection.close()
        })
}
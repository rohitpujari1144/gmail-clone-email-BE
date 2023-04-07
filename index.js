const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)
const port = 6000

// getting all emails
app.get('/', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allEmails = await db.collection('All Emails').find().toArray()
        res.status(200).send(allEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// sending new email to All Emails and Unread Emails collection
app.post('/newEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Unread Emails').insertOne(req.body)
        await db.collection('All Emails').insertOne(req.body)
        res.status(201).send({ message: 'New Email sent', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting emails from Unread Emails collection
app.get('/getUnreadEmails', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allUnreadEmails = await db.collection('Unread Emails').find().toArray()
        res.status(200).send(allUnreadEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// sending email to read email collection
app.post('/readEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Read Emails').insertOne(req.body)
        res.status(201).send({ message: 'Email sent to Read Emails', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all read emails
app.get('/allReadEmails', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allReadEmails = await db.collection('Read Emails').find().toArray()
        res.status(200).send(allReadEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// sending email to star
app.post('/startEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Star Emails').insertOne(req.body)
        res.status(201).send({ message: 'Email sent to star', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all star emails
app.get('/allStarEmails', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allStarEmails = await db.collection('Star Emails').find().toArray()
        res.status(200).send(allStarEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// sending email to important
app.post('/importantEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Important Emails').insertOne(req.body)
        res.status(201).send({ message: 'Email sent to important', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all important emails
app.get('/allImportantEmails', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allImportantEmails = await db.collection('Important Emails').find().toArray()
        res.status(200).send(allImportantEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// sending email to draft
app.post('/draftEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Draft Emails').insertOne(req.body)
        res.status(201).send({ message: 'Email sent to draft', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all draft emails
app.get('/allDraftEmails', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allDraftEmails = await db.collection('Draft Emails').find().toArray()
        res.status(200).send(allDraftEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})


app.listen(port, () => { console.log(`App listening on ${port}`) })

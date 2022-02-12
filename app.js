const express = require('express');
const app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/contact')
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});

const contact = mongoose.model('contact', contactSchema);

app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static / css'))
app.use('/js', express.static(__dirname + 'static / js'))
app.use('/img', express.static(__dirname + 'static / img'))

app.set('views', './views')
app.set('view engine', 'ejs')


app.get('', (req, res) => {
        res.render('home')
    })
    // app.get('#home', (req, res) => {
    //     res.render('home', { title: 'this is my homepage' })
    // })
    // app.get('#client-section', (req, res) => {
    //     res.render('home')
    // })
    // app.get('#services', (req, res) => {
    //     res.render('home')
    // })
    // app.get('#contact', (req, res) => {
    //     res.render('home')
    // })
app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send('this item has been save to the database')
    }).catch(() => {
        res.status(400).send("item was not saved to the database")
    });
    // res.render('contact')
})


app.listen(port, () =>
    console.log(`listening to port ${port}`));
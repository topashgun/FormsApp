const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(cors());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b8d0adfed37cad',
    password: '655293f0',
    database: 'heroku_5f8fd6523b2b2f8'
})
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/add', (req, res) => {
    const { username, password, initial, firstName, lastName, selectedDate, selectedFile, sex, age, description, type, index } = req.query;
    if (type == "add") {
        connection.query('insert into tble_form_details (initial, firstName, lastName, userName, password, dob, selectedFile, sex, age, description, notes, tags) values ("' + initial + '","' + firstName + '","' + lastName + '","' + username + '","' + password + '","' + selectedDate + '","' + selectedFile + '","' + sex + '","' + age + '","' + description + '","-","-")');
    } else {
        connection.query('update tble_form_details set initial="' + initial + '", firstName="' + firstName + '", lastName="' + lastName + '", userName="' + username + '", password="' + password + '", dob="' + selectedDate + '", selectedFile="' + selectedFile + '", sex="' + sex + '", age="' + age + '", description="' + description + '" where id="' + index + '"');
    }
    return res.send("added successfully");
})

app.get('/getAllForms', (req, res) => {
    connection.query("SELECT * FROM tble_form_details", (error, response) => {
        return res.json(response)
    });
});
app.get('/getAllTags', (req, res) => {
    connection.query("SELECT * FROM tags", (error, response) => {
        return res.json(response)
    });
});

app.get('/addNote', (req, res) => {
    const { notes, noteIndex } = req.query;
    connection.query('update tble_form_details set notes="' + notes + '" where id="' + noteIndex + '"');
    return res.send("added successfully");
})
app.get('/addTag', (req, res) => {
    const { tag } = req.query;
    connection.query("SELECT * FROM tags where tag='" + tag + "'", (error, response) => {
        if (response.length == 0) {
            connection.query("insert into tags values('" + tag + "')")
            return res.send("added successfully");
        } else {
            return res.send("exists");
        }
    });
})
app.get('/updateTags', (req, res) => {
    const { tags, index } = req.query;
    connection.query('update tble_form_details set tags="' + tags + '" where id="' + index + '"');
    return res.send("added successfully");
})

app.get('/deleteForm', (req, res) => {
    const { index } = req.query;
    connection.query('delete from tble_form_details where id="' + index + '"');
    return res.send("deleted successfully");
})
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port);

console.log('App is listening on port ' + port);
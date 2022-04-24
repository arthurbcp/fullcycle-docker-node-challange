const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let sql = 'DROP TABLE IF EXISTS people'
connection.query(sql)

sql = "CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key (id))";
connection.query(sql)

const names = ['Arthur', 'Wesley', 'João', 'Pedro']

names.forEach((name) => {
    sql = `INSERT INTO people(name) values('${name}')`
    connection.query(sql)
})

connection.end()


app.get('/', (req, res) => {
    const conn = mysql.createConnection(config)
    conn.query('SELECT name FROM people', (err, rows) => {
        if (err) throw err

        let html = '<h1>Full Cycle</h1>'
        html += '<ul>'
        rows.forEach(row => {
            html += `<li>${row.name}</li>`
        });
        html += '</ul>'
        conn.end()
        res.send(html)

    })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
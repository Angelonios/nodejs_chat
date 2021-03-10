'use strict';
const mysql     = require('mysql');
const express   = require('express');

const app       = express();
const port      = process.env.PORT || 5005;
const resStr    = "Mysql Data:";

app.get('/', function (req, res){
    const mysqlHost = process.env.MYSQL_HOST || 'localhost';
    const mysqlPort = process.env.MYSQL_HOST || '3306';
    const mysqlUser = process.env.MYSQL_HOST || 'root';
    const mysqlPass = process.env.MYSQL_HOST || 'root';
    const mysqlDB   = process.env.MYSQL_HOST || 'node_db';

    const connectionOptions = {
        host: mysqlHost,
        port: mysqlPort,
        user: mysqlUser,
        password: mysqlPass,
        database: mysqlDB,
    };

    console.log('Mysql Connection config:');
    console.log(connectionOptions);

    const dbConnection = mysql.createConnection(connectionOptions);

    dbConnection.connect();

    dbConnection.query('SELECT ?', ['Hello World'], function (error, results, fields) {
        if(error) throw error;

        let response = '';
        results.forEach(function(data){
            response += data + ' : ';
            console.log(response)
        })

        if(response.length === 0)
            response = 'No records found!';

        res.status(200).send(response);
    })
    
    dbConnection.end();
})
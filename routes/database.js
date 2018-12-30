var db_connect = function (project) {
    
    var promise = new Promise(function(resolve, reject) {
        var mysql = require('mysql');

        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "new_task"
        });
        
        connection.connect(function (err) {
            if (err) {
                reject(err);
                return;
            }else{
                resolve(connection);
            }

        });
    });
    return promise;
}

var db_query =  function (connection, sql, data) {
    var promise = new Promise(function(resolve, reject) {
        connection.query(sql, data, function (err, results, fields) {
            //close connection 
            db_close(connection);
            
            if (err) {
                reject(err);
            } else{
                resolve(results);
            }
        });
    });
    return promise;
}

var db_close = function (connection) {
    connection.end();
}

module.exports = {
    connect: db_connect,
    query: db_query,
    close: db_close
}
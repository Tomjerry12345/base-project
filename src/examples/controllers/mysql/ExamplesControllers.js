var mysql = require('mysql');

var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "examples_db"
});

exports.checkConnection = (req, res) => {
    con.getConnection((err, connection) => {
        connection.release()
        if (err) {
            res.status(200).json({
                code: 404,
                response: err.message
            })
            throw err;
        };

        res.status(200).json({
            code: 200,
            response: "connected"
        })
    })
}

exports.add = (req, res) => {
    
    const nama = req.body.nama
    const alamat = req.body.alamat
    const password = req.body.password
    const image = req.files.image[0].path.replace(/\\/g, "/");

    console.log(req.body)
    // const image = req.files.image[0].path.replace(/\\/g, "/");
    // // const file = req.files.file[0].path.replace(/\\/g, "/");
    // file = ""

    // var sql = `INSERT INTO examples (nama, alamat, password, image, file) VALUES ('${nama}', '${alamat}', '${password}', '${image}', '${file}')`;

    // con.query(sql, function (err, result) {

    // if (err) {
    //     res.status(200).json({
    //         code: 404,
    //         response: err.message
    //     })
    // };

    // res.status(200).json({
    //     code: 200,
    //     response: "inserted one data"
    // })

    res.status(200).json({
        code: 200,
        response: "inserted one data"
    })

//   });
    
}

exports.get = (req, res) => {
    con.query("SELECT * FROM examples", function (err, result, fields) {
        if (err) {
            res.status(200).json({
                code: 404,
                response: err.message
            })
        };

        res.status(200).json({
            code: 200,
            response: result
        })
      });
}

exports.update = (req, res) => {

}

exports.delete   = (req, res) => {
    
}
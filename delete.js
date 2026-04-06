const db = require("../database");

exports.delete = (req,res)=>{
    const {table,id} = req.body
    const query = `Delete from ${table} where id = ?`

    db.query(query,[id],(err,result)=>{
        if(err){
            res.status(500).send("Database error")
        }
        res.json({ message: "Successful delete" });
    })
}
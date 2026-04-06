const db = require("../database");

exports.update = (req,res)=>{
    const{table, data} = req.body
    const id = data.id
    delete data.id

    const keys = Object.keys(data)
    const values = Object.values(data)

    const setClause = keys.map(key => `${key} = ?`).join(", ")
    values.push(id)

    const query = `Update ${table} set ${setClause} where id = ?`

    db.query(query,values,(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send("Database error")
        }
        res.json({message:"Successful update"})
    })
}
const db = require("../database");

exports.record = (req,res)=>{
    const{table, data} = req.body

    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = keys.map(()=>"?").join(", ")

    const query = `Insert into ${table} (${keys.join(", ")}) values(${placeholders})`

    db.query(query,values,(err,result)=>{
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Adatbázis hiba történt." });
        }
        res.json({ success: true, message: "Sikeres mentés!" });
    });
}
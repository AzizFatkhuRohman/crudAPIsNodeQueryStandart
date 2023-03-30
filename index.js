import  express  from "express";
import mysql from "mysql";
import cors from "cors"
const app = express()
app.use(cors())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"blogreact"
})
app.use(express.json())
app.get("/selectArticles", (req,res)=>{
    const q = "SELECT * FROM articles ORDER BY id DESC"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.get("/detailArticles/:id", (req,res)=>{
    const articlesId = req.params.id
    const q = "SELECT * FROM articles WHERE id=?"
    db.query(q,[articlesId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/insertArticles", (req,res)=>{
    const q = "INSERT INTO articles (`judul`, `konten`) VALUES (?)"
    const values = [
        req.body.judul,
        req.body.konten
    ]
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Create articles succesfully")
    })
})
app.put("/updateArticles/:id",(req,res)=>{
    const articlesId = req.params.id
    const q = "UPDATE articles SET `judul`=?, `konten`=? WHERE id=?"
    const values = [
        req.body.judul, req.body.konten
    ]
    db.query(q,[...values,articlesId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Update articles succesfully")
    })
})
app.delete("/deleteArticles/:id", (req,res)=>{
    const articlesId = req.params.id
    const q = "DELETE FROM articles WHERE id=?"
    db.query(q,[articlesId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Delete articles succesfully")
    })
})
app.listen(5000, ()=>{
    console.log("Connected to Backend")
})
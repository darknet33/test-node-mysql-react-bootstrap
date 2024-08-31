const express =require("express");
const app =express();
const mysqsl=require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db=mysqsl.createConnection({
    host:"192.168.0.12",
    user:"remote",
    password:"1234",
    database:"testSistema"
});

app.post("/create", (req, res) => {
    const nombre = req.body.nombre;

    db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al registrar la categoría");
        } else {
            res.send(result);
        }
    });
});

app.get("/categorias", (req, res) => {
    db.query('SELECT * FROM categorias', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al obtener las categorías");
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const id=req.body.id
    const nombre = req.body.nombre;

    db.query('UPDATE categorias SET nombre=? WHERE id_categoria=?', [nombre,id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al registrar la categoría");
        } else {
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id=req.params.id;

    db.query('DELETE FROM categorias WHERE id_categoria=?',id, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al registrar la categoría");
        } else {
            res.send(result);
        }
    });
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto: 3001")
})
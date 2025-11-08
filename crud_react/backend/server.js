const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.use(cors());                    

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: 3307,
    password: "",
    database: "kozutak",
}); 

app.get("/", (req, res) => {
    res.send("Fut a backend!");
})


// regiok lista
app.get("/regiok", (req, res) => {
    const sql = "SELECT * FROM `regiok`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})  //idaig  

app.get("/regiok_8", (req, res) => {
    const sql = "SELECT * FROM `regiok` WHERE Rid = 8";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})  

app.get("/regiok/:id", (req, res) => {
    const sql = "SELECT * FROM `regiok` WHERE Rid = ?";
    db.query(sql,[req.params.id],(err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
}) 

//régió hozzása
app.post("/ujregio", (req, res) => {
    const sql = "INSERT INTO `regiok` (`Rid`, `regionev`, `regio_tipusa`) VALUES (?, ?, ?)";
    const values = ['11', 'Budapest', 'Főváros'];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Hiba történt:", err);
            return res.status(500).json({ error: "Adatbázis hiba történt." });
        }
        return res.status(200).json({ message: "Sikeres beszúrás!", result });
    });
});

// több régió egyszerre
app.post("/ujregiok", (req, res) => {
    const sql = "INSERT INTO `regiok` (`Rid`, `regionev`, `regio_tipusa`)  VALUES (?, ?, ?), (?, ?, ?)";

    // Az értékeket lapított tömbként kell megadni
    const values = [
        '9', 'Dél Alföld', 'régió',
        '10', 'Szeged', 'Főváros'
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Hiba történt:", err);
            return res.status(500).json({ error: "Adatbázis hiba történt." });
        }
        return res.status(200).json({
            message: "A rekord(ok) beszúrása sikeres volt.",
            result
        });
    });
});

 

//régió törlése
app.delete("/torles/:id", (req, res) => {
    const sql = "DELETE FROM `regiok` WHERE Rid = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})    

//egyszerre több régió törlés
app.delete("/torles/", (req, res) => {
    // Példa: A kérésben kapott rekordok azonosítói (Rid) egy tömbben
    const idsToDelete = req.body.ids; // Például: [1, 2, 3]

    // Ellenőrzés, hogy van-e legalább egy azonosító
    if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
        return res.status(400).json({ error: "Nem adtál meg törlendő azonosítókat." });
    }

    // SQL lekérdezés az `IN` kulcsszóval
    const sql = "DELETE FROM `regiok` WHERE `Rid` IN (?)";

    // SQL végrehajtása
    db.query(sql, [idsToDelete], (err, result) => {
        if (err) {
            console.error("Hiba történt:", err);
            return res.status(500).json({ error: "Adatbázis hiba történt." });
        }

        return res.status(200).json({ 
            message: "A rekord(ok) törlése sikeres volt.", 
            affectedRows: result.affectedRows 
        });
    });
});
app.delete("/torles/:id", (req, res) => {
    const sql = "DELETE FROM `regiok` WHERE Rid = 8";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
}) 

app.put("/modosit/:id", (req, res) => {
    const sql = "UPDATE `regiok` SET `regionev` = Budapest, `regio_tipusa` = Város WHERE `Rid` = 3";
        db.query(sql, (err, result) => {
        if (err) return res.json(err);  
        return res.json(result)
    })
})  
app.get("/regiok_4", (req, res) => {
    const sql = "SELECT * FROM `regiok` WHERE Rid = 4";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})  
app.put("/modosit", (req, res) => {
    const sql = "UPDATE `regiok` SET `regionev` = Budapest, `regio_tipusa` = Város WHERE `Rid` = 4";
        db.query(sql, (err, result) => {
        if (err) return res.json(err);  
        return res.json(result)
    })
})  
app.listen(3001, () => {
    console.log("Server is running on port 3001");
}); 

                                                                                                                                              

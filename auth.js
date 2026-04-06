const express = require("express");
const db = require("../database");
const authControllerRegister = require("../controllers/auth");
const authControllerLogin = require("../controllers/login");
const authControllerBooking = require("../controllers/booking");
const authControllerUpdate = require("../controllers/update");
const authControllerDelete = require("../controllers/delete");
const authControllerRecord = require("../controllers/record");
const router = express.Router();



router.post("/register",authControllerRegister.register);
router.post("/login",authControllerLogin.login);
router.post("/booking",authControllerBooking.booking);
router.post("/update-record",authControllerUpdate.update);
router.post("/delete-record",authControllerDelete.delete);
router.post("/add-record",authControllerRecord.record);

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

router.get("/busy-slots", (req, res) => {
    const { barberId, date } = req.query;
    
    const query = `
        SELECT appointment_time as start, s.duration_minutes as duration 
        FROM appointments a
        JOIN services s ON a.service_id = s.id
        WHERE a.employee_id = ? AND a.appointment_date = ?
    `;

    db.query(query, [barberId, date], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json(result); 
    });
});

module.exports = router;
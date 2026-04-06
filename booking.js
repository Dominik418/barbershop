const session = require("express-session");
const db = require("../database");
const {sendBookingEmail} = require("../utils/mailers.js")

exports.booking = (req, res) => {
    const { name, email, phone, date, time, service, barber } = req.body;
    
    const isLoggedIn = !!req.session.userName;

    const checkQuery = `
        SELECT a.id FROM appointments a
        JOIN services s ON a.service_id = s.id
        WHERE a.employee_id = ? 
        AND a.appointment_date = ? 
        AND (
            ? BETWEEN a.appointment_time AND ADDTIME(a.appointment_time, SEC_TO_TIME(s.duration_minutes * 60 - 1))
        )
    `;

    db.query(checkQuery, [barber, date, time], (err, result) => {
        if (err) return res.status(500).send("DB Error");

        if (result.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: "We are sorry, but this date (or time) has already been booked" 
            });
        }

        const insertQuery = "INSERT INTO appointments (customer_name, customer_email, customer_phone, appointment_date, appointment_time, service_id, employee_id) VALUES (?,?,?,?,?,?,?)";
        db.query(insertQuery, [name, email, phone, date, time, service, barber], (err, results) => {
            if (err) return res.status(500).send("There was an error at saving");

            sendBookingEmail(email,name,date,time)

            return res.json({ success: true, message: "Booking successful! We sent you a confirmation email." });
        });
    });
};
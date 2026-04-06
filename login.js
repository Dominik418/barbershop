const bcrypt = require("bcryptjs");
const session = require("express-session");
const express = require("express");
const db = require("../database");

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
            if (err) return res.send("Database error");

            if (result.length > 0) {
                const user = result[0];
               
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    req.session.userId = user.id;
                    req.session.userName = user.username;
                    req.session.userEmail = user.email;
                    req.session.userPhone = user.phone_num;
                    req.session.userRole = user.role;
                    
                    req.session.save(()=>{
                        if(user.role === "barber"){
                            res.redirect("/login/barber-dashboard")
                        }
                        else if(user.role === "admin"){
                            res.redirect("/login/admin-dashboard")
                        }
                        else{
                            return res.redirect("/login/logged");
                        }
                    })
                } else {
                    return res.render("login",{
                        message:"Incorrect Password"
                    });
                }
            } else {
                return res.render("login",{
                        message:"Incorrect Username"
                    });
            }
        });
        } else {
             return res.render("login",{
                message:"Please Enter Username and Password Details"
           });
        }
};
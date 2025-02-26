const express = require("express");
const mongoose = require("mongoose");

function connect_mongo(url){
    mongoose
    .connect(url)
    .then(() => console.log("DataBase is connection successful"))
    .catch((err) => {
        console.log("error : ", err);
    });
}

module.exports = connect_mongo
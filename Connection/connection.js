const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose
    .connect("mongodb+srv://vkvikas028:MUIiZfWv3RL1vD6x@cluster0.qjxupbp.mongodb.net/")
    .then(() => {
        console.log("Connection Successful");
    })
    } catch (error) {
        res.status(400).json({
            message: "Not Connected",
        });
    }
};

conn();
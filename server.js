const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/explain", (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "No code provided"});
    }

    const lines = code.split("\n").length;

    res.json({
        overview: `This code has ${lines} line(s).`,
        lineByLine: "Line-by-line explanation will go here.",
        issues: "No issues detected yet."
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
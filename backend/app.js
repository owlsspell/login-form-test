const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const sequelize = require("./config");
const User = require("./shemas/users");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sekret_key = require("./sekret_key");
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

app.post("/signup", async function (req, res, next) {
    const { email, password } = req.body;
    let findedUser = await User.findOne({
        where: { email: email },
    })
    if (findedUser) {
        return res.status(200).json({
            message: `User ${findedUser.email} already exists`,
        })
    }
    let hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
    await sequelize.authenticate();
    await sequelize.sync();
    try {
        const user = await User.create({
            email: email,
            password: hashedPassword,
        });
        let token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                password: hashedPassword,
            },
            sekret_key.JWT_SECRET
        );
        res.status(200).json({
            message: `User ${user.email} created successfully`,
            token,
            email: user.email
        })
    } catch (e) {

        console.log('error', e);
    }

});

app.post("/login", async function (req, res, next) {
    const { email, password } = req.body;
    await User.findOne({
        where: { email: email },
    }).then((userInfo) => {
        if (userInfo === null) {
            return res.status(401).send("Email not found");
        }
        const user = userInfo.toJSON();
        let hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        if (hashedPassword !== user.password) {
            return res.status(401).send("Invalid password");
        }
        let token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                password: hashedPassword,
            },
            sekret_key.JWT_SECRET
        );
        return res.json({ token: token });

    })
        .catch((err) => {
            throw err;
        });


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}...`);
});


// connection.end()

const express = require("express");
const Users = require("./db")
const app = express();
const jws = require("jsonwebtoken")
const key = "123456"
const zod = require("zod");
const cors = require("cors");
const authenticator = require("./middleware");
// const { authenticator } = require("./middleware");

const credSchema = zod.string() 
const detailsSchema = zod.object({
    name: zod.string(),
    description: zod.string(),
    interests: zod.array(zod.string()),
    linkdIn: zod.string(),
    twitter: zod.string()
})

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // or your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
app.use(cors(corsOptions));

app.post("/signup", (req, res) => {
    const {username, password} = req.body;
    if(credSchema.safeParse(username).success && credSchema.safeParse(password).success){
        Users.create({username, password});
        res.json({"msg": "User registered successfully."})
    }else{
        res.status(404).send("Invalid credentials")
    }
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    if(credSchema.safeParse(username).success && credSchema.safeParse(password).success){
        const user = await Users.findOne({username, password})
            if(user){
                const token = jws.sign({username, password}, key);
                return res.status(200).json({"Token": token});
            }else{
                return res.status(401).send("Invalid credentials")
            }  
    }else{
        return res.status(401).send("Invalid credentials")
    }
})

app.put("/makecard", authenticator, (req, res) => {
    const {username, password} = req.headers;
    const {cardDetails} = req.body;
    if(detailsSchema.safeParse(cardDetails).success){
        const {name, description, interests, linkdIn, twitter} = cardDetails;
        Users.updateOne(
            {username, password},
            {
                $set: {
                    cardDetails: {
                        name: name,
                        description: description,
                        interests: interests,
                        linkdIn: linkdIn,
                        twitter: twitter
                    }
                }
            }
        )
        .then(() => {
            res.json({msg: "card created sucessfully!"})
        })
        .catch(error => {
            res.send("Error in making the card:", error);
        }); 
    }else{
        res.status(401).send("Invalid credentials.")
    }
})

app.get("/getcard", authenticator, (req, res) => {
    const {username, password} = req.headers;
    Users.findOne({username, password})
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.status(501).json(err)
    })
})

app.delete("/deleteaccount", authenticator, async(req, res) => {
    const {username, password} = req.headers;
    Users.deleteOne({username, password})
    .then((result) => {
        if(result.deletedCount > 0){
            res.json({msg: "Account deleted succesfuly."})
        }else{
            res.send("No such acccount or already deleted.")
        }
    })
    .catch(() => res.status(501).send("Unable to delete account"))
})

app.listen(3000, ()=> {
    console.log("Listning on  port 3000");
})
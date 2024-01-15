const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashok9818236898:sCYTAhSkShUhmZeM@cluster0.riwbhae.mongodb.net/Buisnesscard').then(() => {
    console.log("mdb connected cuccessfully");
}).catch((e) => console.log("unable to connect to mdb"));

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    cardDetails: {
        name: String,
        description: String,
        interests: [String],
        linkdIn: String,
        twitter: String
    }

});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
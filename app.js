import express from "express";
import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// let Users = [
//     {id:1, name: 'hany', age:30},
//     {id:2, name: 'ali', age:44},
//     {id:3, name: 'khaled', age:33},
//     {id:4, name: 'samy', age:22},
//     {id:5, name: 'abdo', age:43}
// ];
// fs.writeFileSync("data.json", JSON.stringify(Users));

let users = fs.readFileSync("data.json","utf-8");
users = JSON.parse(users);



const app = express();
app.use(express.json());

app.get("/users/user/:name?",(req,res)=>{
    let name = req.params.name;
    console.log(name)
    if(name){
        let foundUser = users.filter(element => element.name === name);
        console.log(foundUser);
        if(foundUser.length > 0){
            res.json({message:"found user", user_data:foundUser});
        }else{
            res.json({message:"user not found"});
        }
    }else{
        res.json({message:"list users search by name", data: users});
    }
});
app.get("/users/:id?",(req,res)=>{
    // res.send('<h1>hello</h1>');
    // res.json({message:"hello abdo"});
    // res.status(200).json({message:"hello abdo"});
    // const myfile = fileURLToPath(import.meta.url);
    // console.log(myfile);
    // const mydir = path.dirname(myfile);
    // console.log(mydir);
    // res.sendFile(path.join(mydir,"./index.html"));
    const id = req.params.id;
    if(id){
        let foundUser = users.find(element => element.id == id);
        if(foundUser){
            res.json({message:"found user", user_data:foundUser});
        }else{
            res.json({message:"user not found"});
        }
    }else{
        res.json({message:"list users", data: users});
    }

});

// req.query
app.post("/users/:id?", (req,res)=>{
    
    const user = req.body;
    user.id = users[users.length-1].id +1;
    users.push(user);
    fs.writeFileSync("data.json",JSON.stringify(users));
    res.json({message:"test", data:user, total_data: users});

});
// app.put("/users", (req,res)=>{
    
//     const user = req.body;
//     const foundUser = Users.find(element=> element.id == user.id);
//     if(foundUser){
//         foundUser.name = user.name;
//         foundUser.age  = user.age;
//         res.json({message:"after update", total_data: Users});
//     }else{
//         res.json({message:"user not found"});
//     }

// });
app.put("/users/:id", (req,res)=>{
    const id = req.params.id;
    
    const user = req.body;
    const foundUser = users.find(element=> element.id == id);
    if(foundUser){
        foundUser.name = user.name;
        foundUser.age  = user.age;
        fs.writeFileSync("data.json",JSON.stringify(users));
        res.json({message:"after update", total_data: users});
    }else{
        res.json({message:"user not found"});
    }

});
app.delete("/users/:id", (req,res)=>{
    const id = req.params.id; // id is a string so if I want to use === I should parse it first
    const userToDelete = users.find(element=> element.id == id);
    if(userToDelete){
        users = users.filter(element => element.id != id);
        fs.writeFileSync("data.json",JSON.stringify(users));
        res.json({message:"after delete", total_data: users});
    }else{
        res.json({message:"user not found"});
    }

});
app.listen(3000, function(){
    console.log("server is running on port 3000")
})
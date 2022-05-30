const express= require('express');

const db = require('../config/db');
const UserModel = db.socialNWDB.user;

const router = express.Router();


router.get('/',(req,res)=>{

    res.send("auth route connection established")
})



 //@Method : POST
 //Desc: This is api will add the sign up details to to database.
 //API Name: http://localhost:3000/api/auth/signup


 router.post('/signup',(req,res)=>{

    //1. we should collect the data from the request

    let reqname = req.body.name;
    let reqemail = req.body.email;
    let reqpassword = req.body.password;
    let reqinsta_name = req.body.insta_name;
    let reqcountry = req.body.country;
    let reqbio = req.body.bio;
    let req_user_image;
    if(req.body.user_image){
     req_user_image =req.body.user_image ;

    }


    
    //    res.send( req.body);


    //2. pass or store  the requested data to user table
    
//if user email is present in db then we should not store the data and we should send a response
// that user already exist



    UserModel.create({
        name: reqname,
        email: reqemail,
        password:reqpassword,
        insta_id: reqinsta_name,
        country: reqcountry,
        bio: reqbio,
        user_image: req_user_image

    }).then(()=>{
//3. if the data is added we should informed to client
        res.send({
            message: "user added successfully",
            status : 200
        })
    })
    .catch(()=>{
 //4. if the data is not added, we should inform to client
        res.send({

            message: "used not able to add in server",
            status: 500

        })
    })
    
    
    
    
   
 })


 //@Method : POST
 //Desc: This is api will check the credentials and respond to the UI.
 //API Name: http://localhost:3000/api/auth/signin


router.post('/signin', (req,res)=>{

   const req_email = req.body.email;
   const req_password =  req.body.password;


        UserModel.findOne({where: {
            email: req_email,
            password:req_password 
        },raw:true})
        .then((usersdata)=>{

            if(usersdata){
                res.send({
                    message: "user signin successfully",
                    status : 200,
                    email:req_email
                })
            }else{
                res.send({
                    message: "invalid email id or password. please sign up the application",
                    status : 404
                })
            }
        })
        .catch((err)=>{
            res.send({

                message: "used not able to sigin",
                status: 500
    
            })
        })


}  )


module.exports = router;
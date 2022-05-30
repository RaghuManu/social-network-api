const express= require('express');

const db = require('../config/db');
const VoteModel = db.socialNWDB.vote;

const router = express.Router();


//method:POST
//desc:  This api will add the votes data
//apiUrl: http://localhost:3000/api/vote/add

router.post('/add',(req,res)=>{

    const req_post_id = req.body.post_id;
    const req_email   = req.body.email;
    let req_vote    = req.body.vote;

    if(req_vote === true){
        req_vote = true;
    }else{
        req_vote = false;
    }


    VoteModel.findAll({where: {post_id: req_post_id,email: req_email  },raw:true  })
    .then((voteUsers)=>{

        //check same email and postid is exist or not
        if(voteUsers.length > 0){
        //if same email and postid is exist then update the data

        VoteModel.update({votes: req_vote}, {
            where: {
                post_id: req_post_id,email: req_email
            } } )
        .then((data)=>{
            res.send({
                data:{message: "your vote is updated"},
                status : 200
        
            })
        }).catch((err)=>{

            throw err;

        })


        }else{
        //if same email and postid is not exist then create the data

        VoteModel.create({
            post_id: req_post_id,
            votes: req_vote,
            email: req_email
    
        })
        .then((voteData)=>{
            res.send({
                data:{message: "your vote is added"},
                status : 200
        
            })
        })
        .catch((err)=>{
           throw err;
        })

        }
       
    }).catch((err)=>{
        res.send({

            data:{message: "your vote is not added or updated"},
            status : 500,
            err:err
    
        })  
    })


/*     */


})






//method:GET
//desc:  This api will provide all posts details with the count of dislikes and likes of the posts
//apiUrl: http://localhost:3000/api/vote


router.get('/',  (req,res)=>{

    VoteModel.findAll(
        
        {attributes:['post_id'],raw:true}
        
        )
    .then(async(votes)=>{
        
       for (const element of votes) {
           
      let likeCount=  await VoteModel.count({
            where: {
                votes: 1,
                post_id: element['post_id']
            
            }})

    let dislikeCount=  await VoteModel.count({
                where: {
                    votes: 0,
                    post_id: element['post_id']
                
                }})

        element['likeCount'] = likeCount;
        element['dislikeCount'] = dislikeCount;
       }

       votes= Array.from(new Set(votes.map(JSON.stringify))).map(JSON.parse);
       res.send({
        status: 200,
        data:votes
    });


    }).catch((err)=>{
        res.send({

            data:{message: "some problem to load the posts"},
            status : 500,
            err:err
    
        })  
    })
})



module.exports = router;
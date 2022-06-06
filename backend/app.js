const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/user');
const Order = require('./models/order');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const nodemailer = require("nodemailer");

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service:'hotmail',
          auth: {
            user: 'slimbensmida@hotmail.com', // generated ethereal user
            pass: 'roccocool159753159753159753...', // generated ethereal password
          },
        });



// Security Configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});
//Connect to database
mongoose.connect('mongodb://localhost:27017/snay3i', { useNewUrlParser: true, useUnifiedTopology: true });

//Integration bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join('backend/images')))
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
    }
    const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
    error = null;
    }
    //Affecter la destination
    cb(null, 'backend/images')
    },
    //file name
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + '-snay3i-' +
    '.' + extension;
    //Affecter file name
    cb(null, imgName);
    }
    });
    
// -------------------------------------------- user ---------------------------------------------
// add user
app.post('/api/addUser',multer({ storage: storage}).single('img'),(req,res)=>{
    let user = {} ; 
    let url = req.protocol + '://' + req.get('host');
    User.findOne({email : req.body.email}).then(
        (doc)=>{
            if (doc) {
                res.status(200).json({
                    message : '0'
                })
            } else {
                // add
                bcrypt.hash(req.body.password,10).then(
                    (cryptedPwd)=>{
                        if (req.body.role == 'tech') {
                             user = new User ({
                                name : req.body.name,
                                email : req.body.email,
                                password : cryptedPwd,
                                tel  : req.body.tel,
                                role  : req.body.role,
                                speciality  : req.body.speciality,              
                                experience  : req.body.experience,             
                                status  : req.body.status,
                                zone:req.body.zone,
                                declanations:req.body.declanations,
                                availability:req.body.availability,
                                img: url + '/images/' + req.file.filename,
                                likes: req.body.likes,
                                dislikes: req.body.dislikes
                            })
                        } else {
                            user = new User ({
                                name : req.body.name,
                                email : req.body.email,
                                password : cryptedPwd,
                                tel  : req.body.tel,
                                role  : req.body.role,
                                zone:req.body.zone
                                })
                        }
                        user.save();
                        res.status(200).json({
                            message : '1'
                        })
                    }
                )

            }
        }
    )


    
})
// get clients
app.get('/api/getClients',(req,res)=>{
    User.find({role : 'client'}).then(
        (docs)=>{
            if (docs) {
                res.status(200).json({
                    clients : docs
                })
            }
        }
    )
})
// get pending techs
app.get('/api/getPending',(req,res)=>{
    User.find({status : 'pending'}).then(
        (docs)=>{
            if (docs) {
                res.status(200).json({
                    techs : docs
                })
            }
        }
    )
})
// update user
app.put('/api/approve/:id',(req,res)=>{
    let id = req.params.id ; 
    console.log(id);
     let user = {
        _id : req.body._id,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        tel  : req.body.tel,
        role  : req.body.role,
        speciality  : req.body.speciality ,              
        experience  : req.body.experience  ,             
        status  : req.body.status,
        declanations  : req.body.declanations,
        availability  : req.body.availability,
        siteFeed  : req.body.siteFeed,
        likes  : req.body.likes,
        dislikes  : req.body.dislikes
    }
    console.log(user);
    User.updateOne({_id : id},user).then(
        (result)=>{
            if (result) {
                res.status(200).json({
                    message : 'tech approved'
                })
            }
          
        }
    )

})
// get confirmed techs
app.get('/api/getTechs',(req,res)=>{
    User.find({status : 'confirmed'}).then(
        (docs)=>{
            if (docs) {
                res.status(200).json({
                    techs : docs
                })
            }
        }
    )
})
// get admins
app.get('/api/getAdmins',(req,res)=>{
    User.find({role : 'admin'}).then(
        (docs)=>{
            if (docs) {
                res.status(200).json({
                    admins : docs
                })
            }
        }
    )
})
// login
app.post('/api/login',(req,res)=>{
    User.findOne({email : req.body.email}).then(
        (emailOutput)=>{
            if (!emailOutput) {
                res.status(200).json({
                    message : '0'
                })
            }

            return bcrypt.compare(req.body.password , emailOutput.password);
        }).then(
            (passwordOutput)=>{
                if (!passwordOutput) {
                    res.status(200).json({
                        message : '1'
                    })
                } else {
                    User.findOne({email : req.body.email}).then(
                        (result)=>{
                            console.log(result);
                            res.status(200).json({
                                message : '2',
                                userFound : result
                            })
                        }
                    )
                }
            }
        )
})
// delete user
app.delete('/api/deleteUser/:id',(req,res)=>{
    let id = req.params.id ;  
    User.deleteOne({_id : id}).then(
        (result)=>{
            if (result) {
                res.status(200).json({
                    message : 'user deleted'
                })
            }
        }
    )
})
// get user by id 
app.get('/api/users/:id',(req,res)=>{
    console.log('here in get user by id ',req.params);
    let id = req.params.id;
    console.log(id);
    User.findOne({_id : id}).then(
        (doc)=>{
            if (doc) {
                console.log(doc);
                res.status(200).json({
                    user : doc
                })
            }
          
        }
    )
})
// editLogs
app.put('/api/editLogs/:id',(req,res)=>{
    let id = req.params.id ; 
    bcrypt.hash(req.body.password , 10).then(
        (pwd)=>{
            let user = {
                _id : req.body._id,
                name : req.body.name,
                email : req.body.email,
                password : pwd,
                tel  : req.body.tel,
                role  : req.body.role,
                speciality  : req.body.speciality ,              
                experience  : req.body.experience  ,             
                status  : req.body.status,
                declanations  : req.body.declanations,
                availability  : req.body.availability,
                likes  : req.body.likes,
                dislikes  : req.body.dislikes
            }
            User.updateOne({_id : id},user).then(
                (result)=>{
                    if (result) {
                        res.status(200).json({
                            message : 'tech approved'
                        })
                    }
                  
                }
            )
        }
    )
     
  

})
// like
app.get('/api/like/:id',(req,res)=>{
    let id = req.params.id ;
    User.findOne({_id:id}).then(
        (doc)=>{
            if (doc) {
                let likes = Number(doc.likes);
                doc.likes = (likes+1);
                User.updateOne({_id:doc.id},doc).then(
                    (result)=>{
                        if (result) {
                            res.status(200).json({
                                message : 'likes + 1 '
                            })
                        }
                    }
                )
            }
        }
    )
})
// dislike
app.get('/api/dislike/:id',(req,res)=>{
    let id = req.params.id ;
    User.findOne({_id:id}).then(
        (doc)=>{
            if (doc) {
                let dislikes = Number(doc.dislikes);
                doc.dislikes = (dislikes+1);
                User.updateOne({_id:doc.id},doc).then(
                    (result)=>{
                        if (result) {
                            res.status(200).json({
                                message : 'dislikes + 1 '
                            })
                        }
                    }
                )
            }
        }
    )
})
// retrieve pwd (sending code via email )
app.get('/api/retrieve/:mail/:code',(req,res)=>{
    let mail = req.params.mail ; 
    let code = req.params.code ; 
    User.findOne({email : mail}).then(
        (doc)=>{
            if (doc) {
                
                async function main() {
                    // Generate test SMTP service account from ethereal.email
                  
                    // create reusable transporter object using the default SMTP transport
                  
                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                      from: '"Snay3i" <slimbensmida@hotmail.com>', // sender address
                      to: doc.email, // list of receivers
                      subject: "password recovery ✔", // Subject line
                      text: code, // plain text body
                    });
                  
                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                  
                    // Preview only available when sending through an Ethereal account
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                  }
                  
                  main().catch(console.error);
                  res.status(200).json({
                    message : '1'
                  })



            }else{
                res.status(200).json({
                    message : '0'
                })
            }
        }
    )
})
app.get('/api/changePwd/:email/:newPwd',(req,res)=>{
    let mail = req.params.email ; 
    let newPwd = req.params.newPwd ;
    User.findOne({email : mail}).then(
        (doc)=>{
            if (doc) {
                bcrypt.hash(newPwd , 10).then(
                    (cryptedNewPwd)=>{
                        doc.password = cryptedNewPwd ; 
                        User.updateOne({email : mail},doc).then(
                            res.status(200).json({
                                message : 'pwd updated'
                            })
                        )
                    }
                )
            }
        }
    ) 
})









// -------------------------------------------- / user --------------------------------------------------------------

// -------------------------------------------- order ----------------------------------------------------------
// add order
app.post('/api/addOrder',(req,res)=>{
let order = new Order({
    idClient : req.body.idClient,
    idTech : req.body.idTech,
    cathegory : req.body.cathegory,
    date : req.body.date,
    status : req.body.status,
    description : req.body.description,
    service : req.body.service,
    price : req.body.price,
    adress : req.body.adress,
    zone : req.body.zone,
    rating : req.body.rating,
    feedBack : req.body.feedBack
   
})
order.save();
res.status(200).json({
    message:'order added'
})
})
// get all orders
app.get('/api/getOrders',(req,res)=>{
    Order.find((err,docs)=>{
        if (err) {
            res.status(200).json({
                message : 'error'
            })
        } else {
            res.status(200).json({
                orders : docs
            })
        }
    })
})
// update order
app.put('/api/approveOrder/:id',(req,res)=>{
    let id = req.params.id ; 
    let order = {
    _id : id,
    idClient : req.body.idClient,
    idTech : req.body.idTech,
    date : req.body.date,
    status : req.body.status,
    description : req.body.description,
    adress : req.body.adress,
    service : req.body.service,
    cathegory : req.body.cathegory,
    price : req.body.price,
    zone : req.body.zone,
    img : req.body.img,
    rating : req.body.rating,
    feedBack : req.body.feedBack
    
    }
    Order.updateOne({_id : id},order).then(
        (result)=>{
            if (result) {
                res.status(200).json({
                    message : 'order confirmed'
                })
            }
        }
    )
})
// get order by id
app.get('/api/getOrder/:id',(req,res)=>{
    let id = req.params.id ; 
    Order.findOne({_id : id}).then(
        (doc)=>{
            if (doc) {
                res.status(200).json({
                    order : doc,
                    message:'1'
                })
            }else{
                res.status(200).json({
                    message:'0'                   
                })
            }
        }
    )
})
// drop order
app.delete('/api/deleteOrder/:id',(req,res)=>{
    let id = req.params.id ; 
    Order.deleteOne({_id : id}).then(
        (result)=>{
            if (result) {
                res.status(200).json({
                    message:'order deleted'
                })
            }
            
        }
    )
})
// rate order
app.get('/api/rateOrder/:id/:feed/:feedBack',(req,res)=>{
    let id = req.params.id ; 
    let feed = req.params.feed ; 
    let feedBack = req.params.feedBack ; 
    Order.findOne({_id:id}).then(
        (doc)=>{
            if (doc) {
                doc.rating = feed ;
                doc.feedBack = feedBack ;  
                Order.updateOne({_id:doc._id},doc).then(
                    (result)=>{
                        if (result) {
                            res.status(200).json({
                                message : 'order rated'
                            })
                        }
                    }
                )
            }
        }
    )
})














// -------------------------------------------------------------------------------------------------------------



module.exports = app;
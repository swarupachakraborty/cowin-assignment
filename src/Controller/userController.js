const UserModel = require("../Model/userModel")
const jwt=require('jsonwebtoken')





const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



const CreateUser = async function (req, res) {
    try {
        let user = req.body
        let { name,phone,age,pin,Adharno } = user

        if (!isValidRequestBody(user)) {
            return res.status(400).send({ status: false, msg: "enter data in user body" })
        }
        
        if (!isValid(name)) {
            return res.status(400).send({status: false,  msg: "Enter Valid Name " })
        }
        
        if (!isValid(phone)) {
            return res.status(400).send({status: false, msg: "Enter phone no. " })
        }

        if (!(/^[6-9]\d{9}$/.test(phone))) {
            return res.status(400).send({ status: false, message: `Phone number should be a valid number` })

        }
        
        const isphone = await UserModel.findOne({ phone })
        if (isphone) {
            return res.status(400).send({status: false, msg: "Phone no.  is already used" })
        }
       
        if (!isValid(password.trim())) {
            return res.status(400).send({status: false, msg: "Enter Password " })
        }
        if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password.trim()))) {
            return res.status(400).send({status: false, msg: "password length Min.8 - Max. 15" })
        }

        const NewUsers = await UserModel.create(user)
        return res.status(201).send({ Status: true, msg: "Data sucessfully Created", data: NewUsers })

    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}


const userLogin = async function(req,res){
    try {
       const requestBody= req.body;
       if(!isValidRequestBody(requestBody)){
           res.status(400).send({status:false, message:'Invalid request parameters, Please provide login details'})
           return
       }

       //Extract params
       const {phone, password} = requestBody;

       //validation starts
       if(!isValid(email)){
           res.status(400).send({status:false, message:`Email is required`})
           return
       }
       
       if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
           res.status(400).send({status:false, message: `Emaiul should be a valid email address`})
           return
       }

       if(!isValid(password)){
           res.status(400).send({status:false, message: `Password is required`})
           return
       }
       //validation ends

       const user = await userModel.findOne({email,password});

       if(!user){
           res.status(400).send({status:false, message:`Invalid login credentials`});
           return
       }

       const token = jwt.sign({
           userId: user._id.toString(),
           batch: "uranium",
           organisation: 'FunctionUp',
            iat: new Date().getTime() /1000 
       },"My private key" ,{expiresIn:"30m"}
           
       );

       res.header('x-api-key',token);
       res.status(200).send({status:true, message:`User login successfully`, data:{token}});

   } catch (error) {
       res.status(500).send({status:false, message:error.message});
   }
}


module.exports= {CreateUser,userLogin}

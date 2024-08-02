


const User = require("../Models/user.model");

  const findCurrentUser= async(req,res)=>{
    try {
        const user=await req.user;

        const currentUser=await User.findById(user.user._id)

        currentUser.password=null
        //console.log(currentUser);
        return res.status(200).send(currentUser);

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

 const findUserById= async(req,res)=>{

    try {
       const user=await User.findById(req.params.userId)

        user.password=null

        return res.status(2000).send(currentUser);

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

 const searchUser=async(req,res)=>{
    
    try {
        const page=req.query.page || 1;
        const limits=req.query.size || 10;

        const skip=(page-1)*limits;
        const keyword=req.query.search?{
            $or:[
                {username:{$regex:req.query.search, $options:"i"}},
                {email:{$regex:req.query.search, $options:"i"}}
            
            ]
        }:{}

        const users=await User.find(keyword).select("userName profile_image").skip(skip).limit(limits)
            
        return res.status(200).send(users)
    } catch (error) {
       
        return res.status(500).send(error.message)
    }
}

 const editUser=async(req,res)=>{
   
    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});

        
           
        return res.status(200).send(updatedUser)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

 const deleteUser=async(req,res)=>{
    try {
        const deletedUser=await User.findByIdAndDelete(req.params.id);

        

        return res.status(200).send({message:"user deleted successfully",user:deletedUser})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports={findCurrentUser,findUserById,searchUser,editUser,deleteUser}


//1 import projectSchema
const projects=require('../Models/projectSchema')

//add project logic
exports.addProject=async(req,res)=>{
    console.log('inside the addProject method');
    const{title,language,github,livelink,overview}=req.body
    const projectImage=req.file.filename
    const userId=req.payload
    console.log(title,language,github,livelink,overview,projectImage);
    console.log(userId);

    try {
        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(404).json("project already exists")
        }else{
            const newProjects=new projects({title,language,github,livelink,overview,projectImage,userId})
            await newProjects.save()
            res.status(200).json(newProjects)  
        }
    } catch (err) {
            res.status(401).json({message:err.message});
    }

   
}


//1 get a perticular project details
exports.getAProject=async(req,res)=>{
    //get userid
    const userId=req.payload
    try{
        const AProject=await projects.find({userId})
        if(AProject){
            res.status(200).json(AProject)
        }else{
            res.status(401).json("can't find projects")
        }
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

//2 get 3 project details from home projects

exports.getHomeProjects=async(req,res)=>{
   
    try{
        const HomeProject=await projects.find().limit(3)
        if(HomeProject){
            res.status(200).json(HomeProject)
        }else{
            res.status(401).json("can't find projects")
        }
    }catch(err){
        res.status(401).json({message:err.message})
    }
}



//3 get all projects details

// exports.getAllUsersProjects=async(req,res)=>{
   
//     try{
//         const AllUsersProject=await projects.find()
//         if(AllUsersProject){

//                 }else{
//             res.status(401).json("can't find projects")
//         }
//     }catch(err){
//         res.status(401).json({message:err.message})
//     }
// }

exports.getAllUsersProjects = async (req, res) => {

    const searchKey=req.query.search
    console.log(searchKey);

    let query={}

    //case sensitive
    if(searchKey){
        query.language={$regex:searchKey,$options:"i"}
    }

   

    try {
        const AllUsersProject = await projects.find(query);
        if (AllUsersProject) {
            // Handle found projects and send them in the response
            res.status(200).json(AllUsersProject);
        } else {
            res.status(401).json("Can't find projects");
        }
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};


//4 delete user project

// exports.deleteUserProject=async(req,res)=>{
//     const {pid}=req.params  //get project id
//     try {
//         const deleteUserProject=await projects.findOneAndDelete({pid:_id})
//         // Creates a findOneAndDelete query: atomically finds the given document,
//         // deletes it, and returns the document as it was before deletion.
//         res.status(200).json(deleteUserProject);
//     } catch (err) {
//         res.status(401).json({ message: err.message });  
//     }
// }
// Assuming projects is your Mongoose model

// exports.deleteUserProject = async (req, res) => {
//     const { pid } = req.params; // get project id
//     try {
//         const deleteUserProject = await projects.findOneAndDelete({ _id: pid }); // Corrected the query to use _id instead of pid
//         // Creates a findOneAndDelete query: atomically finds the given document,
//         // deletes it, and returns the document as it was before deletion.
//         res.status(200).json(deleteUserProject);
//     } catch (err) {
//         res.status(401).json({ message: err.message });
//     }
// };


exports.deleteUserProject = async (req, res) => {
    const { pid } = req.params; // Get project id
    try {
        const deleteUserProject = await projects.findOneAndDelete({ _id: pid });
        // Use pid to find and delete the project
        // Creates a findOneAndDelete query: atomically finds the given document,
        // deletes it, and returns the document as it was before deletion.
        res.status(200).json(deleteUserProject);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};


//update user projects
exports.updateUserProjects=async(req,res)=>{
    const{title,language,github,livelink,overview,projectImage}=req.body
    userId=req.payload
    const{pid}=req.params
    const uploadImage=req.file?req.file.filename:projectImage

    try {
        //FIND PERTICULAR PROJECTS, UPDATE THE DATA AND SAVE THE CHANGES
        const updateProject=await projects.findByIdAndUpdate({_id:pid},{title,language,github,livelink,overview,projectImage:uploadImage,userId}) 
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

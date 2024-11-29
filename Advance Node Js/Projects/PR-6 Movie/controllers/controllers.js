
const fs=require('fs')
const usersmodel=require('../models/usersmodels')
const addpage=(req, res)=>{
    return res.render('add')
}
const viewpage= async (req, res)=>{

    try {
    
        const users= await usersmodel.find({})
       
        return res.render('views',{
           users
        })
       } catch (error) {

           console.log(error);
           return false
       }
}

const adddata=async(req, res)=>{
   try{
       const {name,desc,price} = req.body;

        await usersmodel.create({
            name : name,
            desc:desc,
            price:price,
            image : req.file.path
       })
       console.log(`user add`);
       return res.redirect('/');  
    }catch(err){
        console.log(err);
        return false;
    }
}


const deletedata= async (req, res)=>{
    try {
        const id=req.query.id
        
        let singal=await usersmodel.findById(id)
        fs.unlinkSync(singal.image)


        await usersmodel.findByIdAndDelete(id)

        return res.redirect('views')
        

    } catch (error) {
        console.log(error);
        return false
    }
}
const edit =async(req,res)=>{

    try {
        const id=req.query.id

   const singal= await  usersmodel.findById(id)
        
        return res.render('edit',{
            singal
        })

    } catch (error) {
        console.log(error);
        return false
    }
    
    
}


const update=async(req, res)=>{
    try {
        const {editid,name,desc,price} = req.body;


        
        if (req.file) {
            let singal= await usersmodel.findById(editid)
            fs.unlinkSync(singal.image)

            await usersmodel.findByIdAndUpdate(editid,{
        name : name,
            desc:desc,
            price:price,
            image : req.file.path
      })


return res.redirect('/views')
        } else {
           const  single = await  usersmodel.findById(editid);

            await usersmodel.findByIdAndUpdate(editid,{
                name : name,
                desc:desc,
                price:price,
                image : single.image
            })
            return res.redirect('/views');
        }
   
    } catch (error) {
        console.log(error);
        
    }
}


module.exports={
    addpage,
    viewpage,
    adddata,
    deletedata,edit,
    update
}

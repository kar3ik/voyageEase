import axios from 'axios'
export const signupHandler =async (name,number, email,password) =>{

    try{
        const data = await axios.post("http://localhost:4005/api/auth/register", {
            //backend : frontend,
            username:name,
            number:number, 
            email:email,
            password:password
        })
        console.log(data)
    }catch(err){
        console.log("error adding user")
    }

}
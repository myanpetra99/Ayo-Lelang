const url = 'http://localhost:8081/'
class AuthServices{

    static async register(data){
       return await axios.post(url+'register',data).then(res => {
        console.log(res)
    })
    }

    static async login(data){
       const token =  await axios.post(url+'login',data)
       return token
     }

     static async logout(){
        return await axios.get(url+'logout')
     }
}

export default AuthServices;
const url = 'http://localhost:8081/user'


class UserServices{

    static async getUser(){
        const user = await axios.get(url)
        console.log(user.data)
        return user.data
    }
    static async isVerified(){
       const status = await axios.get(url+'/verifyStatus')
       return status.data
     }

     static async changePhoto(fd){
        await axios.post(url+'/updatepicture',fd)
     }
}

export default UserServices;
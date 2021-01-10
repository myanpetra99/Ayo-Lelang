const url = 'http://localhost:8081/user'

class UserServices{

    static async getUser(){
        const user = await axios.get(url)
        return user.data
    }

}

export default UserServices;
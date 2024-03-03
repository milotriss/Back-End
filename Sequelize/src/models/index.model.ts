import { User } from "./user.model"
import { UserInfo } from "./userInfo.model";

const createTable = () => {
    User.sync().then(() => {
        console.log("users created successfully");
    })
    UserInfo.sync().then(() => {
        console.log("userInfo created successfully");
    })
}

export default createTable;
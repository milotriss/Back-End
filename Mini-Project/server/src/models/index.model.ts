import Student from "./student.model";

const createTable = () => {
    Student.sync().then(() => {
        console.log('create table successfully');
    })
}

export default createTable;
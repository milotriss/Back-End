import express from 'express';
import StudentService from '../services/student.service';
const studentController = express.Router()

const studentService = new StudentService()
studentController
.get('/all-students',async (req:express.Request, res:express.Response) => {
    try {
        const result = await studentService.getAllStudentsReal()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: "Loi roi fen oi"});
    }
})
.get('/',async (req:express.Request, res:express.Response) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const sort = req.query.sort || undefined
        const result = await studentService.getAllStudents(sort,page,limit)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: "Loi roi fen oi"});
    }
})
.get('/search', async (req:express.Request, res:express.Response)=> {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 3
        const value:string = String(req.query.search).toLowerCase() || ""
        const data = await studentService.searchStudents(value,page,limit)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: "Loi roi fen oi"});
    }
})
.post('/create', async (req:express.Request, res:express.Response) => {
    try {
        
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            gender: Number(req.body.gender),
            birthDay: req.body.birthDay,
            city: req.body.city,
            country: req.body.country
        }
        await studentService.createStudent(data)
        res.status(201).json('create student successfully')
    } catch (error) {
        res.status(500).json({message: "Loi roi fen oi"})
    }
})
.patch('/update/:id', async (req:express.Request, res:express.Response)=> {
    try {
        const id = +req.params.id
        const updateData = {...req.body}
        const data = await studentService.updateStudent(id,updateData)
        if (data[0] === 0) {
            res.status(404).json('not found')
        }else {
            res.status(200).json({message:"Student updated successfully"})
        }
    } catch (error) {
        res.status(500).json({message: "Loi roi fen oi"})
    }
})
.delete('/delete/:id', async (req:express.Request, res:express.Response) =>{
    try {
        const id = +req.params.id
        const data = await studentService.deleteStudent(id)
        if (!data) {
            res.status(404).json('not found')
        }else {
            res.status(204).json({message:"Student deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({message: "Loi roi fen oi"})
    }
})

export default studentController;
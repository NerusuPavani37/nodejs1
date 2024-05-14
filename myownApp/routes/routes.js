const express=require("express");
const router=express.Router();
const students=require("../data");

router.get('/',(req,res) =>{
    res.send(students);
});


router.get('/:id' ,(req,res) =>{
    const {id}=req.params;
    const student= students.filter(student => student.id == id);
    if(student.length > 0){
        res.send(student);
    }
    else{
        res.status(404).json({succes : false, msg: `no student with id ${id}`})
    }
})

router.post('/newstudent', (req,res) =>{
    const {id,name,age,grade,subjects} =req.body;
    res.send([... students,{id,name,age,grade,subjects}]);
})

router.put('/:id', (req, res) => {
    const { name, age } = req.body;
    const studentId = Number(req.params.id);
    
    const index = students.findIndex(student => student.id === studentId);

    if (index !== -1) {
        students[index].name = name;
        students[index].age = age;
        
        res.json(students[index]);
    } else {
        res.status(404).json({ success: false, msg: `No student with id ${studentId}` });
    }
});




module.exports=router;
// studentController.js
const Student = require("../models/student");

async function createStudent(req, res) {
  try {
    const { name, semester, degree } = req.body;
    const newStudent = await Student.create({ name, semester, degree });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getStudents(req, res) {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getStudentById(req, res) {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateStudent(req, res) {
  try {
    const { name, semester, degree } = req.body;
    const updatedStudent = await Student.update(
      { name, semester, degree },
      { where: { id: req.params.id }, returning: true }
    );
    if (updatedStudent[0] === 1) {
      res.status(200).json(updatedStudent[1][0]);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteStudent(req, res) {
  try {
    const deletedStudentCount = await Student.destroy({
      where: { id: req.params.id },
    });
    if (deletedStudentCount === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};

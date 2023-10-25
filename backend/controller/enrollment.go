package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Thitiporn2045/skillflek/entity"
)
type CourseResult1 struct {
	ID          uint   
	Name        string
	Description string
	Image string
}

//GET /approvedCourses/id
func ListEnrollByID(c *gin.Context) {
	var apcourses []CourseResult1
	var student entity.Student
	id := c.Param("id")
	if err := entity.DB().Raw("Select DISTINCT c.id, c.name,c.description, c.image  FROM students s INNER JOIN enrollments e INNER JOIN approve_courses ap INNER JOIN courses c ON s.id = e.student_id AND e.approve_course_id = ap.course_id AND ap.course_id = c.id WHERE ap.status_id = 1 AND s.id = ? ORDER BY e.id DESC",id).Find(&apcourses,&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": apcourses})
}
//GET /approvedCourses
func ListListEnroll(c *gin.Context) {
	var apcourses entity.Approve_Course
	if err := entity.DB().Raw("Select * FROM students s INNER JOIN enrollments e INNER JOIN approve_courses ap INNER JOIN courses c ON s.id = e.student_id AND e.approve_course_id = ap.course_id AND ap.course_id = c.id WHERE ap.status_id = 1  ORDER BY e.id DESC").Find(&apcourses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": apcourses})
}

// POST /createEnrollment
func CreateEnrollment(c *gin.Context) {
	var enrollment entity.Enrollment
	var student entity.Student
	var course entity.Approve_Course

	if err := c.ShouldBindJSON(&enrollment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", enrollment.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", enrollment.Approve_Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	e := entity.Enrollment{
		EnrollTime:        enrollment.EnrollTime,
		Student:        student,
		Approve_Course: course,
	}

	if err := entity.DB().Create(&e).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": e})
}

// GET /getEnrollment/:id
func GetEnrollment(c *gin.Context) {
	var enrollment entity.Enrollment
	courseid := c.Param("courseid")
	studentid := c.Param("studentid")
	if err := entity.DB().Raw("SELECT * FROM enrollments WHERE approve_course_id = ? AND student_id = ?", courseid, studentid).Find(&enrollment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": enrollment})
}

func CheckEnrollment(c *gin.Context) {
	var enrollment []entity.Enrollment
	courseID := c.Params.ByName("courseid")
	studentID := c.Params.ByName("studentid")

	if err := entity.DB().Where("student_id = ? AND approve_course_id = ?", studentID, courseID).Find(&enrollment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": enrollment})
}

// DELETE /DelEnrollments/:id
func DeleteEnrollment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "The enrollment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
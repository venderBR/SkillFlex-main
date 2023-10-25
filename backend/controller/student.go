package controller

import (
	"net/http"

	"github.com/Thitiporn2045/skillflek/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateStudent(c *gin.Context) {
	var student entity.Student

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง User
	u := entity.Student{
		FirstName: student.FirstName, // ตั้งค่าฟิลด์ FirstName
		LastName:  student.LastName,  // ตั้งค่าฟิลด์ LastName
		Email:     student.Email,     // ตั้งค่าฟิลด์ Email
		Password : student.Password,
		Phone :	   student.Phone,
		Infomation:student.Infomation,
		Background_Pic : student.Background_Pic,
		Profile_Pic : student.Profile_Pic,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /user/:id
func GetStudent(c *gin.Context) {
	var student entity.Student
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM students WHERE id = ?", id).Find(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

// GET /user/:email
func GetStudentEmail(c *gin.Context) {
	var student entity.Student
	id := c.Param("email")
	if err := entity.DB().Raw("SELECT * FROM students WHERE email = ?", id).Find(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

// GET /users
func ListStudents(c *gin.Context) {
	var students []entity.Student
	if err := entity.DB().Raw("SELECT * FROM students").Find(&students).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": students})
}

// DELETE /users/:id
func DeleteStudent(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateStudent(c *gin.Context) {
	var student entity.Student
	var result entity.Student

	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", student.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	if err := entity.DB().Save(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

func UpdateStudentInfo(c *gin.Context) {
    id := c.Param("id") // รับค่า id จาก URL

    var input struct {
        FirstName     string 
        LastName      string 
        Infomation    string 
        Background_Pic string 
        Profile_Pic    string 
    }
    // แปลง JSON request body เป็นตัวแปร input
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var student entity.Student

    // ค้นหา student ด้วย id
    if tx := entity.DB().Where("id = ?", id).First(&student); tx.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
        return
    }

    // อัปเดตข้อมูลของ student ด้วยค่าใหม่
    student.FirstName = input.FirstName
    student.LastName = input.LastName
    student.Infomation = input.Infomation
    student.Background_Pic = input.Background_Pic
    student.Profile_Pic = input.Profile_Pic


    // บันทึกการอัปเดต
    if err := entity.DB().Model(&student).Where("id = ?", id).Updates(&student).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": student})
}

func GetStudentNameInCourse(c *gin.Context) {
    var course entity.Course
    id := c.Param("id")
    query := `SELECT c.id, c.name,s.first_name, t.first_name AS teacher_name
			FROM students s
			INNER JOIN enrollments e ON s.id = e.student_id
			INNER JOIN approve_courses ap ON e.approve_course_id = ap.course_id
			INNER JOIN courses c ON ap.course_id = c.id
			INNER JOIN teachers t ON c.teacher_id = t.id
			WHERE ap.status_id = 1 AND c.id = ?`

    if err := entity.DB().Raw(query, id).Find(&course).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": course})
}


func CoursesInfoByIDstudents(c *gin.Context) {

    var students []entity.Student
    id := c.Param("id")
    if err := entity.DB().Raw("SELECT students.first_name,students.last_name  " +
        "FROM courses " +
        "INNER JOIN approve_courses ON approve_courses.course_id = courses.id " +
        "INNER JOIN teachers ON courses.teacher_id = teachers.id " +
        "INNER JOIN statuses ON approve_courses.status_id = statuses.id " +
        "INNER JOIN enrollments ON approve_courses.id = enrollments.approve_course_id " +
        "INNER JOIN students ON enrollments.student_id = students.id " +
        "WHERE courses.id = ?", id).Find(&students).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": students})
}

package controller

import (
	"net/http"
	"time"

	"github.com/Thitiporn2045/skillflek/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateCourse(c *gin.Context) {
	var course entity.Course
	var teacher entity.Teacher
	var categories entity.Category

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", course.Teacher_ID).First(&teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", course.Category_ID).First(&categories); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
        return
    }

	// สร้าง User
	curentTime := time.Now()
	u := entity.Course{
		Teacher:teacher, 
		Category: categories,        // โยงความสัมพันธ์กับ Entity Gender
		Name: course.Name, // ตั้งค่าฟิลด์ FirstName
		Description:  course.Description,  // ตั้งค่าฟิลด์ LastName
		Image: course.Image,
		    // ตั้งค่าฟิลด์ Email
		CreateTime: curentTime ,     // ตั้งค่าฟิลด์ Phone
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}


func GetCourse(c *gin.Context) {
	var course entity.Course
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM courses WHERE id = ?", id).Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": course})
}
func GetLatestCourse(c *gin.Context) {
    var course entity.Course
    id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM courses c INNER JOIN teachers t ON c.teacher_id = t.id WHERE t.id = ? ORDER BY c.id DESC LIMIT 1", id).Find(&course).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": course})
}
func GetAllsCourse(c *gin.Context) {
    var course entity.Course
    id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM courses c INNER JOIN teachers t ON c.teacher_id = t.id WHERE t.id = ? ", id).Find(&course).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": course})
}
func CoursesInfoByID(c *gin.Context) {
    var course entity.Course
    id := c.Param("id")
    if err := entity.DB().Raw("SELECT courses.name,courses.image " +
        "FROM courses " +
        "INNER JOIN approve_courses ON approve_courses.course_id = courses.id " +
        "INNER JOIN teachers ON courses.teacher_id = teachers.id " +
        "INNER JOIN statuses ON approve_courses.status_id = statuses.id " +
        "INNER JOIN enrollments ON approve_courses.id = enrollments.approve_course_id " +
        "INNER JOIN students ON enrollments.student_id = students.id " +
        "WHERE courses.id = ?", id).Find(&course).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": course})
}

func CoursesInfoByApprove(c *gin.Context) {
    var approve entity.Approve_Course
    id := c.Param("id")
    if err := entity.DB().Raw("SELECT approve_courses.description " +
        "FROM courses " +
        "INNER JOIN approve_courses ON approve_courses.course_id = courses.id " +
        "INNER JOIN teachers ON courses.teacher_id = teachers.id " +
        "INNER JOIN statuses ON approve_courses.status_id = statuses.id " +
        "INNER JOIN enrollments ON approve_courses.id = enrollments.approve_course_id " +
        "INNER JOIN students ON enrollments.student_id = students.id " +
        "WHERE courses.id = ?", id).Find(&approve).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": approve})
}

func GetCourseByID(c *gin.Context) {
	var course entity.Course
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM courses WHERE id = ?", id).Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": course})
}

func GetLatestCourseForCreate(c *gin.Context) {
    var course entity.Course
    id := c.Param("id")

    // ใช้ Raw SQL query เพื่อดึงคอร์สล่าสุดของครูที่มี ID เป็น 2
    if err := entity.DB().Raw("SELECT * FROM courses WHERE teacher_id = ? ORDER BY id DESC LIMIT 1", id).Scan(&course).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": course})
}
func GetAllCourse(c *gin.Context) {
	var courses []entity.Course
	if err := entity.DB().Raw("SELECT * FROM courses").Scan(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}

type courseTeacher struct {
	ID          uint
	Name        string
	Description string
	Image       string
	Category    string
	Teacher_ID  uint
	FirstName   string
	Time_Approve	 time.Time
	StatusName string
}

type courseContent struct {
	ID          uint
	Name        string
	Description string
	VideoPath	string
}



func GetDeacription(c *gin.Context) {
	var material []entity.Material
	if err := entity.DB().Raw("SELECT * FROM materials").Find(&material).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": material})
}

func GetCourseByIDwantName(c *gin.Context) {
	var course []courseTeacher
	if err := entity.DB().Raw("SELECT courses.id, courses.name, teachers.first_name " +
	"FROM teachers INNER JOIN courses " +
	"ON teachers.id = courses.teacher_id ").Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course})
}

func GetCourseApproved(c *gin.Context) {
	var courses []courseTeacher
	if err := entity.DB().Raw("SELECT DISTINCT courses.name, teachers.first_name, statuses.name AS StatusName, approve_courses.Time_Approve FROM " +
	"teachers INNER JOIN courses INNER JOIN approve_courses INNER JOIN statuses " +
	"ON teachers.id = courses.teacher_id " +
	"AND courses.id  = approve_courses.course_id " +
	"AND statuses.id = approve_courses.status_id " + 
	"WHERE approve_courses.status_id = 1 " + 
	"OR approve_courses.status_id = 2").Scan(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}

func GetContentCourse(c *gin.Context) {
	var course []courseContent
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT courses.id,units.name,materials.video_path, units.description AS Description "+
	"FROM courses INNER JOIN teachers INNER JOIN units INNER JOIN materials "+
	"ON courses.teacher_id = teachers.id AND courses.id = units.course_id AND materials.unit_id = units.id "+
	"WHERE courses.id = ?", id).Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course})
}

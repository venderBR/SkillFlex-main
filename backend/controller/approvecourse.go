package controller

import (
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/Thitiporn2045/skillflek/entity"
)
type CourseResult struct {
	ID          uint   
	Name        string
	Description string
	Category_ID   uint
	Image string
	Teacher_ID uint
}

//GET /approvedCourses
func ListApprovedCoursesByID(c *gin.Context) {
	var courses []CourseResult
	var teacher entity.Teacher
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT DISTINCT courses.id, courses.name, courses.description, courses.image "+
		" FROM approve_courses INNER JOIN courses INNER JOIN teachers "+
		"ON approve_courses.course_id = courses.id AND courses.teacher_id = teacher_id "+
		"WHERE approve_courses.status_id = 1 AND teacher_id = ? ORDER BY courses.id DESC",id).Find(&courses,&teacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}
func ListUnApprovedCoursesByID(c *gin.Context) {
	var courses []CourseResult
	var teacher entity.Teacher
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT DISTINCT courses.id, courses.name, courses.description, courses.image "+
		" FROM approve_courses INNER JOIN courses INNER JOIN teachers "+
		"ON approve_courses.course_id = courses.id AND courses.teacher_id = teacher_id "+
		"WHERE approve_courses.status_id = 2 AND teacher_id = ? ORDER BY courses.id DESC",id).Find(&courses,&teacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}
//GET /approvedCourses
func ListApprovedCourses(c *gin.Context) {
	var courses []CourseResult
	if err := entity.DB().Raw("SELECT DISTINCT courses.id, courses.name, courses.description, courses.image, courses.category_id "+
		"FROM approve_courses INNER JOIN courses ON approve_courses.course_id = courses.id "+
		"WHERE approve_courses.status_id = 1 ORDER BY courses.id DESC").Find(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}

func GetApprovedCourse(c *gin.Context) {
	var course  []CourseResult
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT DISTINCT courses.id, courses.name, courses.description, courses.category_id, courses.image FROM approve_courses INNER JOIN courses ON approve_courses.course_id = courses.id WHERE approve_courses.status_id = 1 AND courses.id = ?", id).Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course})
}
// POST /approveCourse
func CreateApprove(c *gin.Context) {
	var approvedCourse entity.Approve_Course
	var admin entity.Admin
	var course entity.Course

	if err := c.ShouldBindJSON(&approvedCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ใส่ข้อมูล Admin
	if tx := entity.DB().Where("id = 1").First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	//ใส่ข้อมูล course
	if tx := entity.DB().Where("id = ?", approvedCourse.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}
	// สร้าง Approve
	a := entity.Approve_Course{
		Admin:  admin,
		Course: course,
		// Status_ID: nil,
	}
	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": a})
}

func UpdateStatusApprove(c *gin.Context) {
	id := c.Param("id")
	var approve entity.Approve_Course

	// ค้นหา approve_course ด้วย course_id เท่ากับ id (ที่ได้จาก URL)
	if tx := entity.DB().Where(" course_id = ?", id).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "CourseAP not found"})
		return
	}

	CurrentTime := time.Now()
	approve.Time_Approve = CurrentTime //update เวลา


	// อัปเดต status_id ของ approve_course ที่มี course_id เท่ากับ id (ที่ได้จาก URL) เป็น 1
	if err := entity.DB().Model(&approve).Where("course_id = ?", id).Update("status_id", 1).Update("time_approve", approve.Time_Approve).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": approve})
}


func UpdateStatusDisapprove(c *gin.Context) {
	var approve entity.Approve_Course

	var input struct {
		Description string
		Course_ID   uint
		Time_Approve time.Time
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา approve_course ด้วย id
	if tx := entity.DB().Where("course_id = ?", input.Course_ID).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	CurrentTime := time.Now()
	approve.Description = input.Description
	approve.Time_Approve = CurrentTime //update เวลา

	// อัปเดต Status_ID ของ approve_course ที่มี course_id เท่ากับ id (ที่ได้จาก URL) เป็น 1
	if err := entity.DB().Model(&approve).Where("course_id = ?", input.Course_ID).Update("status_id", 2).Update("description", approve.Description).Update("time_approve", approve.Time_Approve).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": approve})
}
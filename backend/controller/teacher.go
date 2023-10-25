package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Thitiporn2045/skillflek/entity"
)

// POST /users
func CreateTeacher(c *gin.Context) {
	var teacher entity.Teacher

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&teacher); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง User
	u := entity.Teacher{
		FirstName: teacher.FirstName, 
		LastName:  teacher.LastName,  
		Email:     teacher.Email,   
		Password : teacher.Password,
		Phone :	   teacher.Phone,
		Infomation:teacher.Infomation,
		Background_Pic : teacher.Background_Pic,
		Profile_Pic : teacher.Profile_Pic,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /user/:id
func GetTeacher(c *gin.Context) {
	var teacher entity.Teacher
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM teachers WHERE id = ?", id).Find(&teacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": teacher})
}

func GetTeacherEmail(c *gin.Context) {
	var teacher entity.Teacher
	id := c.Param("email")
	if err := entity.DB().Raw("SELECT * FROM teachers WHERE email = ?", id).Find(&teacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": teacher})
}

// GET /users
func ListTeachers(c *gin.Context) {
	var teachers []entity.Teacher
	if err := entity.DB().Raw("SELECT * FROM teachers").Find(&teachers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": teachers})
}

// DELETE /users/:id
func DeleteTeacher(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM teachers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateTeacher(c *gin.Context) {
	var teacher entity.Teacher
	var result entity.Teacher

	if err := c.ShouldBindJSON(&teacher); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", teacher.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	if err := entity.DB().Save(&teacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": teacher})
}

func UpdateTeacherInfo(c *gin.Context) {
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

    var teacher entity.Teacher

    // ค้นหา student ด้วย id
    if tx := entity.DB().Where("id = ?", id).First(&teacher); tx.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
        return
    }

    // อัปเดตข้อมูลของ student ด้วยค่าใหม่
    teacher.FirstName = input.FirstName
    teacher.LastName = input.LastName
    teacher.Infomation = input.Infomation
    teacher.Background_Pic = input.Background_Pic
    teacher.Profile_Pic = input.Profile_Pic

    // บันทึกการอัปเดต
    if err := entity.DB().Model(&teacher).Where("id = ?", id).Updates(&teacher).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": teacher})
}
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Thitiporn2045/skillflek/entity"
)

func CreateUnit(c *gin.Context) {
	var unit entity.Unit
	var course entity.Course


	if err := c.ShouldBindJSON(&unit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	if tx := entity.DB().Where("id = ?", unit.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// สร้าง User
	u := entity.Unit{
		Course : course ,         // โยงความสัมพันธ์กับ Entity Gender
		Name: unit.Name, // ตั้งค่าฟิลด์ FirstName
		Description: unit.Description,
		Order:  unit.Order,  // ตั้งค่าฟิลด์ LastName
   // ตั้งค่าฟิลด์ Phone
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

func GetLatestUnit(c *gin.Context) {
    var unit entity.Course
    id := c.Param("id")

    // ใช้ Raw SQL query เพื่อดึงคอร์สล่าสุดของครูที่มี ID เป็น 2
    if err := entity.DB().Raw("SELECT * FROM units WHERE course_id = ? ORDER BY id DESC LIMIT 1", id).Scan(&unit).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": unit})
}

func CoursesInfoByIDunits(c *gin.Context) {
    var units []entity.Unit
    id := c.Param("id")
    if err := entity.DB().Raw("SELECT units.name " +
        "FROM courses " +
        "INNER JOIN units ON courses.id = units.course_id " +
		"WHERE courses.id = ?", id).Find(&units).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	
		c.JSON(http.StatusOK, gin.H{"data": units})
}

func ListUnitsByCourseID(c *gin.Context) {
	var units []entity.Unit
	courseID := c.Param("courseid")

	if err := entity.DB().Raw("SELECT * FROM units WHERE course_id = ?", courseID).Find(&units).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": units})
}
//GET /unit/:id
func GetUnit(c *gin.Context) {
	var unit  entity.Unit
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM units WHERE id = ?", id).Find(&unit).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": unit})
}
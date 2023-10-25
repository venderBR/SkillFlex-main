package controller

import (
	"net/http"

	"github.com/Thitiporn2045/skillflek/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateAdmin(c *gin.Context) {
	var admin entity.Admin

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง User
	u := entity.Admin{
		FirstName: admin.FirstName, // ตั้งค่าฟิลด์ FirstName
		LastName:  admin.LastName,  // ตั้งค่าฟิลด์ LastName
		Email:     admin.Email,     // ตั้งค่าฟิลด์ Email
		Password : admin.Password,
		Phone :	   admin.Phone,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /user/:id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM students WHERE id = ?", id).Find(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

// GET /user/:email
func GetAdminEmail(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("email")
	if err := entity.DB().Raw("SELECT * FROM admins WHERE email = ?", id).Find(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

// GET /users
func ListAdmins(c *gin.Context) {
	var admins []entity.Admin
	if err := entity.DB().Raw("SELECT * FROM admins").Find(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admins})
}

// DELETE /users/:id
func DeleteAdmin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateAdmin(c *gin.Context) {
	var admin entity.Admin
	var result entity.Admin

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", admin.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	if err := entity.DB().Save(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

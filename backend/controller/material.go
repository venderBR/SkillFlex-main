package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Thitiporn2045/skillflek/entity"
)

type Material struct {
	ID          uint
	Description string
	VideoPath   string
	FilePath string
}

func CreateMaterial(c *gin.Context) {
	var material entity.Material
	var unit entity.Unit

	if err := c.ShouldBindJSON(&material); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", material.Unit_ID).First(&unit); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "unit not found"})
		return
	}

	u := entity.Material{
		Unit : unit ,   
		VideoPath: material.VideoPath,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}


func GetMaterial(c *gin.Context) {
	var material entity.Material
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM materials WHERE id = ?", id).Find(&material).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": material})
}


func CoursesInfoByIDmaterial(c *gin.Context) {
    var materials []entity.Material
    id := c.Param("id")
    if err := entity.DB().Raw("SELECT materials.video_path " +
        "FROM courses " +
        "INNER JOIN units ON courses.id = units.course_id " +
		"INNER JOIN materials ON materials.unit_id = units.id " +
        "WHERE courses.id = ?", id).Find(&materials).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": materials})
}

func ListMaterialByUnitID(c *gin.Context) {
	var material []Material
	unitID := c.Params.ByName("unitid")

	if err := entity.DB().Raw("SELECT * FROM materials WHERE unit_id = ?", unitID).Find(&material).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": material})
}
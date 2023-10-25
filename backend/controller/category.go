
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Thitiporn2045/skillflek/entity"
)

func GetCategory(c *gin.Context) {
	var category []entity.Category
	if err := entity.DB().Raw("SELECT * FROM categories ").Find(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": category})
}


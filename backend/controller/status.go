
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Thitiporn2045/skillflek/entity"
)

func GetStatusCouse(c *gin.Context) {
    // var courseInfo []CourseInfo
    var status entity.Status
    id := c.Param("id")
    if err := entity.DB().Raw("SELECT DISTINCT statuses.name " +
        "FROM courses " +
        "INNER JOIN approve_courses ON approve_courses.course_id = courses.id " +
        "INNER JOIN teachers ON courses.teacher_id = teachers.id " +
        "INNER JOIN statuses ON approve_courses.status_id = statuses.id " +
        "INNER JOIN enrollments ON approve_courses.id = enrollments.approve_course_id " +
        "INNER JOIN students ON enrollments.student_id = students.id " +
        "WHERE courses.id = ?", id).Find(&status).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": status})
}
func GetApprove(c *gin.Context) {
	var status entity.Status
	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = 1").Scan(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}

func GetDisapprove(c *gin.Context) {
	var status entity.Status
	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = 2").Scan(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}

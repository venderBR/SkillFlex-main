package main

import (
	"github.com/gin-gonic/gin"
	"github.com/Thitiporn2045/skillflek/controller"
	"github.com/Thitiporn2045/skillflek/entity"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// User Routes
	r.GET("/teachers", controller.ListTeachers)
	r.GET("/teacher/:id", controller.GetTeacher)
	r.GET("/loginteacher/:email", controller.GetTeacherEmail)

	r.POST("/teachers", controller.CreateTeacher)
	
	r.PATCH("/teachers", controller.UpdateTeacher)
	r.DELETE("/teachers/:id", controller.DeleteTeacher)

	r.GET("/students", controller.ListStudents)
	r.GET("/student/:id", controller.GetStudent)
	r.GET("/loginstudent/:email", controller.GetStudentEmail)

	r.POST("/students", controller.CreateStudent)
	r.PATCH("/students", controller.UpdateStudent)
	r.DELETE("/students/:id", controller.DeleteStudent)

	r.GET("/admins", controller.ListAdmins)
	r.GET("/admin/:id", controller.GetAdmin)
	r.GET("/loginadmin/:email", controller.GetAdminEmail)

	r.POST("/admins", controller.CreateAdmin)

	r.PATCH("/admins", controller.UpdateAdmin)
	r.DELETE("/admins/:id", controller.DeleteAdmin)
	// Gender Routes
	r.PATCH("/teachers/:id", controller.UpdateTeacherInfo)

	r.PATCH("/students/:id", controller.UpdateStudentInfo)

	r.GET("/courses", controller.GetCourse)
	r.GET("/courses/:id", controller.GetLatestCourse)
	r.GET("/coursesalls/:id", controller.GetAllsCourse)

	// r.GET("/approvedCoursemain", controller.ListApprovedCourses)
	r.GET("/approvedCoursemain/:id", controller.ListApprovedCoursesByID)
	r.GET("/unapprovedCoursemain/:id", controller.ListUnApprovedCoursesByID)
	r.GET("/enroll", controller.ListListEnroll)
	r.GET("/enroll/:id", controller.ListEnrollByID)
	// // Run the server
	// r.POST("/createenrollment", controller.CreateEnrollment)
	// r.GET("/getenrollment", controller.GetEnrollment)
	// r.GET("/checkenrollment/:courseid/:studentid", controller.CheckEnrollment)
	// r.DELETE("/delenrollments/:id", controller.DeleteEnrollment)

	//Approved course routes
	r.GET("/approvedcoursess", controller.ListApprovedCourses)
	r.GET("/approvedcourses/:id", controller.GetApprovedCourse)

	// //Unit routes
	// r.GET("/units/:courseid", controller.ListUnitsByCourseID)
	// r.GET("/unit/:id", controller.GetUnit)

	// //Material routes
	// r.GET("/material/:unitid", controller.ListMaterialByUnitID)
	
//Enrollment routes
r.POST("/createEnrollment", controller.CreateEnrollment)
r.GET("/getEnrollment", controller.GetEnrollment)
r.GET("/checkEnrollment/:courseid/:studentid", controller.CheckEnrollment)
//r.GET("/enrollments", controller.ListEnrollments)

//Approved course routes
r.GET("/approvedCourses", controller.ListApprovedCourses)
r.GET("/approvedCourse/:id", controller.GetApprovedCourse)

//Unit routes
r.GET("/units/:courseid", controller.ListUnitsByCourseID)
r.GET("/unit/:id", controller.GetUnit)

//Material routes
r.GET("/material/:unitid", controller.ListMaterialByUnitID)

	//---------------
	r.GET("/categorys", controller.GetCategory)

	r.POST("/courses", controller.CreateCourse)
	r.GET("/course/:id", controller.GetCourseByID)
    r.GET("/course_lastest/:id", controller.GetLatestCourseForCreate)

//aBOUT CourseInfo
	r.GET("/coursesInfo/:id", controller.CoursesInfoByID)
	r.GET("/coursesInfoStudents/:id", controller.CoursesInfoByIDstudents)
	r.GET("/coursesInfo_units/:id", controller.CoursesInfoByIDunits)
	r.GET("/coursesInfo_materials/:id", controller.CoursesInfoByIDmaterial)
	r.GET("/coursesInfo_status/:id", controller.GetStatusCouse)
	r.GET("/coursesInfo_approve_description/:id", controller.CoursesInfoByApprove)
	r.GET("/studentIncourse/:id", controller.GetStudentNameInCourse)

	r.POST("/units", controller.CreateUnit)
	r.GET("/unit_lastest/:id", controller.GetLatestUnit)

	r.POST("/materials", controller.CreateMaterial)

	//Get content/:id
	r.GET("/content/:id",  controller.GetContentCourse)

	// Post Approve
	r.POST("/Approve", controller.CreateApprove)

	// show course
	r.GET("/coursesall", controller.GetAllCourse)
	
	// show course/:id
	r.GET("/courseAd/:id", controller.GetCourseByID)
	
	r.GET("/courseReq", controller.GetCourseByIDwantName)

	r.GET("/teachers/:id", controller.GetTeacher)
	// r.GET("/teachers", controller.ListTeachers)

	// get approved, disapproved
	r.GET("/approved", controller.GetApprove)
	r.GET("/disapproved", controller.GetDisapprove)

	r.GET("/courseApproved", controller.GetCourseApproved)

	r.PATCH("/statusAp/:id", controller.UpdateStatusApprove)
	r.PATCH("/statusDis", controller.UpdateStatusDisapprove)
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

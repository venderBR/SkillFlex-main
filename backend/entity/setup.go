package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("skillflek.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&Admin{},
		&Approve_Course{},
		&Course{},
		&Enrollment{},
		&Material{},
		&Status{},
		&Student{},
		&Teacher{},
		&Unit{},
		&Category{},
	)

	initialStatusValue := []Status{
		{Name: "approved"},
		{Name: "unapproved"},
	}

	database.Create(&initialStatusValue)

	initialCategoryValue := []Category{
		{Name: "Art"},
		{Name: "Biology"},
		{Name: "Business"},
		{Name: "Computer Science"},
		{Name: "Dance"},
		{Name: "Data Science"},
		{Name: "Finance"},
		{Name: "History"},
		{Name: "Language"},
		{Name: "Programming"},
		{Name: "Science"},
		{Name: "Static"},
	}

	database.Create(&initialCategoryValue)

	db = database
}

package db

func Migrate() {
	DB.AutoMigrate(
		&User{},
		&Timeslot{},
	)
}
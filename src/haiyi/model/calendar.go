package model

import (
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

var (
	ColCalendar = bson.M{
		"name": "calendar",
		"index": map[string][]string{
			"0": []string{"title"},
		},
		"background.index": map[string]bool{
			"0": true,
		},
	}
)

type ModelCalendar struct {
	Id            bson.ObjectId `bson:"_id" json:"_id"`
	OriginalId    int64         `bson:"id" json:"id"`
	Timestamp     int64         `bson:"timestamp" json:"timestamp"`
	LocalDateTime string        `bson:"localDateTime" json:"localDateTime"`
	Importance    int           `bson:"importance" json:"importance"`
	Title         string        `bson:"title" json:"title"`
	Forecast      string        `bson:"forecast" json:"forecast"`
	Actual        string        `bson:"actual" json:"actual"`
	Previous      string        `bson:"previous" json:"previous"`
	Revised       string        `bson:"revised" json:"revised"`
	CategoryId    int64         `bson:"category_id" json:"category_id"`
	RelatedAssets string        `bson:"relatedAssets" json:"relatedAssets"`
	Remark        string        `bson:"remark" json:"remark"`
	Mark          string        `bson:"mark" json:"mark"`
	Underline     int           `bson:"underline" json:"underline"`
	AccurateFlag  int           `bson:"accurateFlag" json:"accurateFlag"`
	Level         int           `bson:"level" json:"level"`
	Country       string        `bson:"country" json:"country"`
	Currency      string        `bson:"currency" json:"currency"`
	CalendarType  string        `bson:"calendarType" json:"calendarType"`
	Description   string        `bson:"description" json:"description"`
	Del           bool          `bson:"del" json:"del"`
	// eventRowId string        `bson:"eventRowId" json:"eventRowId"`
}

type CalendarData struct {
	Results []ModelCalendar `bson:"results" json:"results"`
}

func GetCalendarList(query bson.M, col *mgo.Collection) (list []ModelCalendar, err error) {
	query["del"] = false
	sorter := "-timestamp"
	err = col.Find(query).Sort(sorter).All(&list)
	return
}

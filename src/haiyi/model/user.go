package model

import (
	"labix.org/v2/mgo/bson"
)

var (
	ColUser = bson.M{
		"name": "user",
		"index": map[string][]string{
			"0": []string{"name,email,status,delete"},
		},
		"background.index": map[string]bool{
			"0": true,
		},
	}
)

/*
用户表
user {
    "name" : <name>,
    "email" : <email>,
    "password" : <password>,
    "status" : <status>,
    "delete" : <delete>,
    "create_time" : <create_time>,
    "update_time" : <update_time>,
}
*/
type ModelUser struct {
	Id         bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Name       string        `bson:"name" json:"name"`
	Email      string        `bson:"email" json:"email"`
	Password   string        `bson:"password" json:"password"`
	Status     byte          `bson:"status" json:"status"`
	Delete     byte          `bson:"delete" json:"delete"`
	CreateTime int64         `bson:"create_time" json:"create_time"`
	UpdateTime int64         `bson:"update_time" json:"update_time"`
}

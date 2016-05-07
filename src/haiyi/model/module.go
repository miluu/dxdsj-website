package model

import (
	//"labix.org/v2/mgo"
	"encoding/gob"
	"labix.org/v2/mgo/bson"
)

func init() {
	gob.Register(ModelModule{})
	gob.Register([]ModelModule{})
}

var (
	ColModule = bson.M{
		"name": "module",
		"index": map[string][]string{
			"0": []string{"path,name,order,status"},
		},
		"background.index": map[string]bool{
			"0": true,
		},
	}
)

/*
模块表
module {
    "name" : <name>,
    "path" : <path>,
    "order" : <order>,
    "status" : <status>,
    "create_time" : <create_time>,
    "update_time" : <update_time>,
}
*/
type ModelModule struct {
	Id         bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Name       string        `bson:"name" json:"name"`
	Path       string        `bson:"path" json:"path"`
	Order      int64         `bson:"order" json:"order"`
	Status     byte          `bson:"status" json:"status"`
	CreateTime int64         `bson:"create_time" json:"create_time"`
	UpdateTime int64         `bson:"update_time" json:"update_time"`
}

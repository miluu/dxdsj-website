package model

import (
	"encoding/gob"
	"labix.org/v2/mgo/bson"
)

func init() {
	gob.Register(ModelRole{})
	gob.Register([]ModelRole{})
}

var (
	ColRole = bson.M{
		"name": "role",
		"index": map[string][]string{
			"0": []string{"name,status,right.scope,right.modules.module,delete"},
		},
		"background.index": map[string]bool{
			"0": true,
		},
	}
)

/*
角色表
role {
    "name" : <name>,
    "users" : []<user_name>,
    "status" : <status>,
    "right" : {
        "scope" : <scope>,// 0=>action,1=>module,2=>app,3=>site
        "modules" : []{
            "module":<module_path>,
            "actions" : []<action_name>,
        }
    },
    "delete" : <delete>,
    "create_time" : <create_time>,
    "update_time" : <update_time>,
}
*/
type ModelRole struct {
	Id         bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Name       string        `bson:"name" json:"name"`
	Users      []string      `bson:"users" json:"users"`
	Status     byte          `bson:"status" json:"status"`
	Right      bson.M        `bson:"right" json:"right"`
	Delete     byte          `bson:"delete" json:"delete"`
	CreateTime int64         `bson:"create_time" json:"create_time"`
	UpdateTime int64         `bson:"update_time" json:"update_time"`
}

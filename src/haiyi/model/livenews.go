package model

import (
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

var (
	ColLivenews = bson.M{
		"name": "livenews",
		"index": map[string][]string{
			"0": []string{"title"},
		},
		"background.index": map[string]bool{
			"0": true,
		},
	}
)

/*
livenews表
livenews {
	"id"         : <id>, 			  	//string 获取的id
	"status"     : <status>, 			//string 状态 "published"
	"title"      : <title>, 			//string 标题
	"type"       : <type>, 		  	//string 类型 "news", "data", "ad"
	"importance" : <importance>,	//string 重要 "1", "2", "3"
	"createdAt"  : <createdAt>, 	//string 创建时间 "1462543606"
	"updatedAt"  : <updatedAt>, 	//string 更新时间 "1462543606"
	"contentHtml": <contentHtml>,	//string 输出内容
	"channelSet" : <channelSet>,	//string 所属频道 "1,3"
	"imageUrls"  : [<imageUrls>],	//[]string 图片url
}
*/

type ModelLivenews struct {
	Id                bson.ObjectId `bson:"_id" json:"_id"`
	OriginalId        int64         `bson:"id" json:"id"`
	Title             string        `bson:"title" json:"title"`
	Type              string        `bson:"type" json:"type"`
	Importance        int           `bson:"importance" json:"importance"`
	CreatedAt         int64         `bson:"createdAt" json:"createdAt"`
	UpdatedAt         int64         `bson:"updatedAt" json:"updatedAt"`
	ContentHtml       string        `bson:"contentHtml" json:"contentHtml"`
	ChannelSet        []int         `bson:"channelSet" json:"channelSet"`
	ImageUrls         []string      `bson:"imageUrls" json:"imageUrls"`
	OriginalImageUrls []string      `bson:"orginalImageUrls" json:"orginalImageUrls"`
	Del               bool          `bson:"del" json:"del"`
}

func GetLivenewsList(query bson.M, sorter []string, limit int, col *mgo.Collection) (list []ModelLivenews, err error) {
	query["del"] = false
	err = col.Find(query).Sort(sorter...).Limit(limit).All(&list)
	return
}

func GetLivenewsById(id bson.ObjectId, col *mgo.Collection) (livenews ModelLivenews, err error) {
	err = col.FindId(id).One(&livenews)
	return
}

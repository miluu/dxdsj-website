package controllers

import (
	"encoding/json"
	"golanger.com/log"
	. "haiyi/model"
	"labix.org/v2/mgo/bson"
	"net/http"
	"strconv"
)

type PageIndex struct {
	*App
}

func (p *PageIndex) Init(rw http.ResponseWriter, r *http.Request) {
	p.App.Init(rw, r)
	p.offRight = true
	p.offLogin = true
}

func (p *PageIndex) RouteIndex() {
	query := bson.M{}
	sorter := []string{"-createdAt"}
	limit := 30
	livenewsList, _ := GetLivenewsList(query, sorter, limit, p.dbCol.colLivenews.C())
	p.templateData["LivenewsList"] = livenewsList
}

func (p *PageIndex) RouteLivenewsDetail(rw http.ResponseWriter, r *http.Request) bool {
	idStr := r.URL.Query().Get("id")
	if !bson.IsObjectIdHex(idStr) {
		rw.Write([]byte("参数错误"))
		return true
	}
	id := bson.ObjectIdHex(idStr)
	livenews, _ := GetLivenewsById(id, p.dbCol.colLivenews.C())
	p.templateData["Livenews"] = livenews
	return false
}

func (p *PageIndex) RouteCalendar() {
}

func (p *PageIndex) RouteCalendarDetail() {
}

func (p *PageIndex) RouteApiLivenews(rw http.ResponseWriter, r *http.Request) (b bool) {
	sort := r.URL.Query().Get("sort")
	b = true
	query := bson.M{}
	sorter := []string{"-createdAt"}
	if sort == "1" {
		sorter = []string{"createdAt"}
	}
	limit := 30
	ret := bson.M{
		"status": 0,
		"msg":    "",
		"list":   []ModelLivenews{},
	}
	fromCreateAtStr := r.URL.Query().Get("createdAt")
	fromCreateAtInt, err := strconv.ParseInt(fromCreateAtStr, 10, 0)
	if err == nil {
		query["createdAt"] = bson.M{
			"$lt": fromCreateAtInt,
		}
		if sort == "1" {
			query["createdAt"] = bson.M{
				"$gt": fromCreateAtInt,
			}
		}
	}
	list, err := GetLivenewsList(query, sorter, limit, p.dbCol.colLivenews.C())
	if err != nil {
		log.Error("<RouteApiLivenews> err: ", err)
		retJson, _ := json.Marshal(list)
		rw.Write(retJson)
		return
	}
	ret["status"] = 1
	ret["list"] = list
	retJson, _ := json.Marshal(ret)
	rw.Write(retJson)
	return
}

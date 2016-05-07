package controllers

import (
	"golanger.com/log"
	"net/http"
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
	log.Debug("<RouteIndex> start.")
}

/*
func (p *PageIndex) RouteLogin() {}

func (p *PageIndex) Http_POST_Login(rw http.ResponseWriter, r *http.Request) bool {
	r.ParseForm()
	if _, ok := r.PostForm["ajax"]; ok {
		m := bson.M{
			"status":  1,
			"message": "",
		}

		rw.Header().Set("Content-Type", "application/json")
		rw.Header().Set("Cache-Control", "no-store")

		username := r.FormValue("username")
		password := r.FormValue("password")
		passwordMd5 := utils.Strings(password).Md5()
		colQuerier := bson.M{"name": username, "status": 1, "delete": 0}
		colSelecter := bson.M{"password": 1}
		col := ModelUser{}
		var jres []byte
		err := p.dbCol.colUser.C().Find(colQuerier).Select(colSelecter).One(&col)
		if err != nil || col.Password == "" {
			m["status"] = -1
			m["message"] = "无此用户"
		} else {
			if passwordMd5 != col.Password {
				m["status"] = 0
				m["message"] = "密码错误"
			} else {
				m["back_url"] = r.URL.Query().Get("back_url")
				p.Session["username"] = username
				p.Session["ukey"] = passwordMd5
				p.CookieSession.Set(p.Session, rw, r)
			}
		}

		jres, _ = json.Marshal(m)
		rw.Write(jres)
	}

	return true
}

func (p *PageIndex) RouteLogout(rw http.ResponseWriter, r *http.Request) bool {
	p.Session = nil
	p.CookieSession.Set(p.Session, rw, r)
	http.Redirect(rw, r, "/login", http.StatusFound)
	return true
}
*/

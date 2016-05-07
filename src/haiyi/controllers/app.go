package controllers

import (
	"golanger.com/db/mongo"
	"golanger.com/log"
	"golanger.com/session/cookiesession"
	"golanger.com/template"
	"haiyi/config"
	. "haiyi/model"
	"labix.org/v2/mgo/bson"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type Config struct {
	config.BaseCfg
	config.TempalteCfg
}

type dbCol struct {
	colModule   *mongo.Collection
	colRole     *mongo.Collection
	colUser     *mongo.Collection
	colLivenews *mongo.Collection
	colCalendar *mongo.Collection
}

type App struct {
	Config        Config
	CookieSession *cookiesession.SessionManager
	Template      *template.Template
	AssetsPath    string
	TemplatePath  string
	Session       map[string]interface{}
	templateData  map[string]interface{}
	dbCol         *dbCol
	offLogin      bool
	offRight      bool
	startRunTime  int64
}

func (a *App) SetStartRunTime(startRunTime int64) {
	a.startRunTime = startRunTime
}

func (a *App) SetOffLogin(login bool) {
	a.offLogin = login
}

func (a *App) SetOffRight(right bool) {
	a.offRight = right
}

func (a *App) InitDb(mod, ro, ur, livenews, calendar *mongo.Collection) {
	if a.dbCol == nil {
		a.dbCol = &dbCol{}
	}

	a.dbCol.colModule = mod
	a.dbCol.colRole = ro
	a.dbCol.colUser = ur
	a.dbCol.colLivenews = livenews
	a.dbCol.colCalendar = calendar
}

func (a *App) RenderBody(data interface{}) {
	a.templateData["Body"] = data
}

func (a *App) SetTemplateData(key string, data interface{}) {
	a.templateData[key] = data
}

func (a *App) initHeader(rw http.ResponseWriter) {
	rw.Header().Set("Content-Type", "text/html; charset=utf-8")
}

func (a *App) initLR() {
	a.offLogin = false
	a.offRight = false
}

func (a *App) initTemplateData() {
	a.templateData = map[string]interface{}{}
}

func (a *App) initSession() {
	a.Session = map[string]interface{}{}
}

func (a *App) Init(rw http.ResponseWriter, r *http.Request) {
	a.initHeader(rw)
	a.initLR()
	a.initTemplateData()
	a.initSession()
	a.Session = a.CookieSession.Get(r)
}

func (a *App) Before(rw http.ResponseWriter, r *http.Request) (b bool) {
	check := func() {
		if !a.Config.BaseCfg.CheckRight {
			a.getModule(true)
		} else {
			a.getRole()
			a.getModule(false)

			if !a.offRight {
				if b = !a.checkRight(r); b {
					b = true
					rw.WriteHeader(http.StatusForbidden)
					rw.Write([]byte("无权限"))
				}
			}
		}
	}

	if a.offLogin {
		check()
	} else {
		bLoginPath := r.URL.Path == "/login"
		if a.checkUser() {
			check()
			if bLoginPath {
				if back_url := r.URL.Query().Get("back_url"); back_url != "" {
					http.Redirect(rw, r, back_url, http.StatusFound)
				} else {
					http.Redirect(rw, r, "/index", http.StatusFound)
				}
			}
		} else {
			if !bLoginPath {
				b = true
				http.Redirect(rw, r, "/login?back_url="+r.URL.String(), http.StatusFound)
			}
		}
	}

	return
}

func (a *App) RenderTemplate(tplPath string, rw http.ResponseWriter, r *http.Request) {
	a.templateData["SESSION"] = a.Session
	a.templateData["GET"] = r.URL.Query()
	a.templateData["POST"] = r.PostForm
	a.templateData["TimeStamp"] = a.startRunTime

	if err := a.Template.ExecuteTemplate(rw, filepath.Clean(tplPath), a.templateData); err != nil {
		log.Warn("<App.RenderTemplate> ", "ExecuteTemplate faild:", err)
	}
}

func (a *App) AddStaticFile(name, staticPath string) {
	if _, fiErr := os.Stat(filepath.Clean(staticPath)); fiErr == nil {
		a.templateData[name] = staticPath[len(a.Config.AssetsDirectory[2:])-1:]
	}
}

func (a *App) DocumentStatic(init bool) map[string]interface{} {
	if init {
		a.initTemplateData()
	}

	themePath := a.AssetsPath[len(a.Config.AssetsDirectory[2:])-1:]
	jsDir := a.Config.StaticJsDirectory[:len(a.Config.StaticJsDirectory)-1]
	cssDir := a.Config.StaticCssDirectory[:len(a.Config.StaticCssDirectory)-1]
	imgDir := a.Config.StaticImgDirectory[:len(a.Config.StaticImgDirectory)-1]
	a.templateData["_THEME_PATH"] = themePath
	a.templateData["_ADDON_PATH"] = themePath + "/add-on"
	a.templateData["_JS_PATH"] = themePath + "/" + jsDir
	a.templateData["_CSS_PATH"] = themePath + "/" + cssDir
	a.templateData["_IMG_PATH"] = themePath + "/" + imgDir
	a.AddStaticFile("_GLOBAL_JS_PATH", a.AssetsPath+"/"+jsDir+"/global/global.js")
	a.AddStaticFile("_GLOBAL_CSS_PATH", a.AssetsPath+"/"+cssDir+"/global/global.css")

	return a.templateData
}

func (a *App) Render(rw http.ResponseWriter, r *http.Request) {
	a.DocumentStatic(false)
	dir, file := filepath.Split(r.URL.Path)
	if dir == "/" {
		dir = "/index/"
	}

	jsDir := a.Config.StaticJsDirectory[:len(a.Config.StaticJsDirectory)-1]
	cssDir := a.Config.StaticCssDirectory[:len(a.Config.StaticCssDirectory)-1]
	a.AddStaticFile("_DIR_GLOBAL_JS_PATH", a.AssetsPath+"/"+jsDir+dir+"global.js")
	a.AddStaticFile("_DIR_GLOBAL_CSS_PATH", a.AssetsPath+"/"+cssDir+dir+"global.css")
	a.AddStaticFile("_CURRENT_JS_PATH", a.AssetsPath+"/"+jsDir+dir+file+".js")
	a.AddStaticFile("_CURRENT_CSS_PATH", a.AssetsPath+"/"+cssDir+dir+file+".css")

	a.RenderTemplate(a.TemplatePath+dir+file+".html", rw, r)
}

func (a *App) getRole() {
	if username, nok := a.Session["username"]; nok {
		if _, ok := a.Session["role"]; !ok {
			cols := []ModelRole{}
			colSelector := bson.M{"_id": 0, "name": 1, "right": 1}
			colQuerier := bson.M{"status": 1, "delete": 0, "users": username}
			colSorter := []string{"-right.scope", "-status"}

			query := a.dbCol.colRole.C().Find(colQuerier).Select(colSelector).Sort(colSorter...)
			iter := query.Iter()
			for {
				col := ModelRole{}
				b := iter.Next(&col)
				if b != true {
					break
				}

				cols = append(cols, col)
			}

			a.Session["role"] = cols
		}
	}

}

func (a *App) getModule(showAll bool) {
	if _, ok := a.Session["modules"]; !ok {
		cols := []ModelModule{}
		colSelector := bson.M{"name": 1, "path": 1}
		colQuerier := bson.M{"status": 1}
		colSorter := []string{"-order", "-create_time"}
		hasModule := map[string]bool{}
		query := a.dbCol.colModule.C().Find(colQuerier).Select(colSelector).Sort(colSorter...)
		iter := query.Iter()

		for {
			col := ModelModule{}
			b := iter.Next(&col)
			if b != true {
				break
			}

			if showAll {
				cols = append(cols, col)
			} else if roles, ok := a.Session["role"]; ok {
				for _, role := range roles.([]ModelRole) {
					if _, ok := hasModule[col.Path]; !ok {
						switch role.Right["scope"].(string) {
						case "3": //site
							cols = append(cols, col)
							hasModule[col.Path] = true
						case "2": //app
							cols = append(cols, col)
							hasModule[col.Path] = true
						case "1": //module
							if role.Right["modules"] != nil {
								for _, module := range role.Right["modules"].([]interface{}) {
									mod := module.(bson.M)
									if mod["module"].(string) == col.Path {
										cols = append(cols, col)
										hasModule[col.Path] = true
									}
								}
							}
						case "0": //action
							if role.Right["modules"] != nil {
								for _, module := range role.Right["modules"].([]interface{}) {
									mod := module.(bson.M)
									if len(mod["actions"].([]interface{})) > 0 {
										if mod["module"].(string) == col.Path {
											cols = append(cols, col)
											hasModule[col.Path] = true
										}
									}
								}
							}
						}
					}
				}
			}
		}

		a.Session["modules"] = cols
	}
}

func (a *App) checkRight(r *http.Request) (hasRight bool) {
	rUPath := r.URL.Path
	sPos := strings.LastIndex(rUPath, "/")
	reqModule := rUPath[:sPos+1]
	actionPath := rUPath[sPos+1:]
	//根据方法的规则把path反解析成方法的格式
	if strings.Contains(actionPath, "-") {
		aPaths := strings.Split(actionPath, "-")
		apath := ""
		for _, ap := range aPaths {
			apath += strings.Title(ap)
		}
		actionPath = apath
	} else {
		actionPath = strings.Title(actionPath)
	}

	reqAction := "Route" + actionPath
	for _, module := range a.Session["modules"].([]ModelModule) {
		if module.Path == reqModule {
			for _, role := range a.Session["role"].([]ModelRole) {
				if role.Right["scope"].(string) != "0" {
					hasRight = true
					return
				} else {
					if role.Right["modules"] != nil {
						for _, mod := range role.Right["modules"].([]interface{}) {
							m := mod.(bson.M)
							if module.Path == m["module"].(string) {
								for _, action := range m["actions"].([]interface{}) {
									if reqAction == action.(string) {
										hasRight = true
										return
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return
}

func (a *App) checkUser() (res bool) {
	username, uok := a.Session["username"]
	ukey, ukok := a.Session["ukey"]

	if uok && ukok {
		colQuerier := bson.M{"name": username, "password": ukey, "status": 1}
		colSelecter := bson.M{"name": 1}
		col := ModelUser{}
		err := a.dbCol.colUser.C().Find(colQuerier).Select(colSelecter).One(&col)

		if err == nil && col.Name != "" {
			res = true
		}
	}

	return
}

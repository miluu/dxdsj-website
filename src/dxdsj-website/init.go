package main

import (
	"bytes"
	"golanger.com/db/mongo"
	"golanger.com/log"
	"golanger.com/session/cookiesession"
	"golanger.com/webrouter"
	appCfg "haiyi/config"
	. "haiyi/controllers"
	. "haiyi/model"
	_ "haiyi/templatefunc"
	"net/http"
	"path/filepath"
	"strings"
	"time"
)

var (
	conf     = appCfg.LoadConfig("config/site/")
	monAdmin = mongo.NewMongoPool("", conf.MgoAdminDns, conf.MgoAdminMode, conf.MgoAdminRefresh, 0, 0, 100)
	mon      = mongo.NewMongoPool("", conf.MgoDns, conf.MgoMode, conf.MgoRefresh, 0, 0, 100)
)

func init() {
	webrouter.Handle("/"+conf.StaticDirectory+"/", http.StripPrefix("/"+conf.StaticDirectory+"/", http.FileServer(http.Dir(conf.AssetsDirectory+conf.StaticDirectory+"/"))))

	assetsPath := filepath.Clean(conf.AssetsDirectory + conf.StaticDirectory + "/" + conf.ThemeDirectory + conf.Theme)
	themePath := filepath.Clean(conf.TemplateDirectory + conf.ThemeDirectory + conf.Theme)
	webrouter.HandleFunc("/favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Clean(assetsPath+"/img/global/favicon.ico"))
	})

	app := &App{
		Config: Config{
			conf.BaseCfg,
			conf.TempalteCfg,
		},
		CookieSession: cookiesession.New(conf.CookieName, conf.CookieKey, conf.CookieDomain),
		AssetsPath:    assetsPath,
		TemplatePath:  themePath,
	}

	app.SetStartRunTime(time.Now().Unix())

	app.InitDb(
		monAdmin.C(ColModule),
		monAdmin.C(ColRole),
		monAdmin.C(ColUser),
		mon.C(ColLivenews),
		mon.C(ColCalendar),
	)

	for _, tfile := range strings.Split(conf.TemplateFile, "|") {
		if t, err := app.Template.ParseGlob(themePath + "/" + tfile); err == nil {
			app.Template = t
		} else {
			log.Fatalln("<init> ", err)
		}
	}

	var buf bytes.Buffer
	if notFoundErr := app.Template.ExecuteTemplate(&buf, filepath.Clean(themePath+"/_notfound/notfound.html"), app.DocumentStatic(true)); notFoundErr != nil {
		log.Warn("<init> ", "readfile notfound html faild:", notFoundErr)
	} else {
		webrouter.NotFoundHtmlHandler(buf.String())
	}

	webrouter.Register("/", &PageIndex{App: app})
}

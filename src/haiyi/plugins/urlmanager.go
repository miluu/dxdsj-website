package plugins

import (
	"golanger.com/log"
	"golanger.com/urlmanager"
	"golanger.com/webrouter"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
)

func init() {
	urlManager := urlmanager.New()
	urlManager.Start()
	config, err := ioutil.ReadFile(filepath.Clean("./config/plugins/urlmanager"))
	if err != nil {
		log.Error("<init.urlmanager> ", "readfile config/urlmanager faild:", err)
		os.Exit(-1)
	}

	urlManager.LoadRule(string(config), false)

	webrouter.Injector("urlmanager", "", 999, func(w http.ResponseWriter, r *http.Request) (ret bool) {
		if urlManager.Manage() {
			newUrl := urlManager.ReWrite(w, r)
			if newUrl == "redirect" {
				ret = true
			} else {
				r.URL, _ = url.Parse(newUrl)
			}
		}

		return
	})
}

package config

import (
	"golanger.com/config"
	"golanger.com/log"
)

type BaseCfg struct {
	AssetsDirectory string `json:"AssetsDirectory"`
	StaticDirectory string `json:"StaticDirectory"`
	CheckRight      bool   `json:"CheckRight"`
}

type LogCfg struct {
	LogLevel string `json:"LogLevel"`
}

type CookieCfg struct {
	CookieExpires int    `json:"CookieExpires"`
	CookieName    string `json:"CookieName"`
	CookieDomain  string `json:"CookieDomain"`
	CookieKey     string `json:"CookieKey"`
}

type TempalteCfg struct {
	TemplateDirectory  string `json:"TemplateDirectory"`
	ThemeDirectory     string `json:"ThemeDirectory"`
	Theme              string `json:"Theme"`
	TemplateFile       string `json:"TemplateFile"`
	StaticCssDirectory string `json:"StaticCssDirectory"`
	StaticJsDirectory  string `json:"StaticJsDirectory"`
	StaticImgDirectory string `json:"StaticImgDirectory"`
}

type MongodbCfg struct {
	MgoAdminDns     string `json:"mgo_admin_dns"`
	MgoAdminMode    string `json:"mgo_admin_mode"`
	MgoAdminRefresh bool   `json:"mgo_admin_refresh"`
	MgoDns          string `json:"mgo_dns"`
	MgoMode         string `json:"mgo_mode"`
	MgoRefresh      bool   `json:"mgo_refresh"`
}

type Config struct {
	BaseCfg
	LogCfg
	CookieCfg
	TempalteCfg
	MongodbCfg
}

func LoadConfig(configDir string) Config {
	conf := Config{}
	config.Dir(configDir).Load(&conf)
	log.SetLevel(conf.LogLevel)

	return conf
}

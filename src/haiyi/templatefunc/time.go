package templatefunc

import (
	"golanger.com/template"
	"golanger.com/utils"
	"time"
)

func init() {
	t := utils.NewTime()

	template.AddFunc("UnixToStr", func(n int64, layouts ...string) string {
		return t.UnixToStr(n, layouts...)
	})

	template.AddFunc("StrToUnix", func(s string) int64 {
		if s == "now" {
			return time.Now().Unix()
		}

		return t.StrToUnix(s)
	})
}

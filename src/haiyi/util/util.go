package util

import (
	"golanger.com/utils"
)

var t = utils.NewTime()

func UnixToStr(n int64, layouts ...string) string {
	return t.UnixToStr(n, layouts...)
}

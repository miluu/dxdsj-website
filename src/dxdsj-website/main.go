package main

import (
	"bytes"
	"flag"
	"golanger.com/fsnotify"
	"golanger.com/log"
	"golanger.com/webrouter"
	_ "haiyi/plugins"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"time"
)

var (
	addr        = flag.String("addr", ":30200", `Server port`)
	autoToDo    = flag.Bool("auto", false, `when u modify some dir to auto restart this app`)
	deferToAuto = flag.Duration("defer", time.Second, `defer to when u modify some file`)
	appName     = filepath.Base(os.Args[0])
)

func installApp() error {
	cmd := exec.Command("go", "install", "../...")
	outp, err := cmd.CombinedOutput()
	log.Debug("<installApp> ", "Rebuild "+appName+"...")
	log.Debug("<installApp> ", "Error: ", err)
	log.Debug("<installApp> ", "OutPut: "+string(outp))

	return err
}

func startApp() *exec.Cmd {
	cmd := exec.Command(os.Args[0], "-addr", *addr)
	var b bytes.Buffer
	cmd.Stdout = &b
	cmd.Stderr = &b
	err := cmd.Start()
	log.Debug("<startApp> ", "Error: ", err)
	log.Debug("<startApp> ", "OutPut: "+b.String())
	if err == nil {
		pid := cmd.Process.Pid
		ioutil.WriteFile(filepath.Clean("./"+appName+".pid"), []byte(strconv.Itoa(pid)), 0700)
		log.Debug("<startApp> ", "Start "+appName+" - pid:", pid)
	}

	return cmd
}

func init() {
	logDir := "log/"
	if _, err := os.Stat(logDir); err != nil {
		os.Mkdir(logDir, 0775)
	}

	logFi, err := os.OpenFile(filepath.Clean("log/"+appName), os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0700)
	if err != nil {
		log.Fatalln(err)
	}

	log.SetOutput(logFi)
}

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU()*2 - 1)
	flag.Parse()

	goFileWatcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}

	teplFileWatcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}

	if !*autoToDo {
		log.Info("<main> ", "Listen server address: "+*addr)
		if err := webrouter.ListenAndServe(*addr, nil); err != nil {
			log.Fatalln("<main> ", "ListenAndServe error: ", err)
		}
	} else {
		//先手动添加监控列表，以后再补到配置文件里面
		goDifs := []string{
			filepath.Clean("../src/haiyi/config"),
			filepath.Clean("../src/haiyi/controllers"),
			filepath.Clean("../src/haiyi/plugins"),
			filepath.Clean("../src/haiyi/model"),
			filepath.Clean("../src/haiyi/templatefunc"),
			filepath.Clean("../src/haiyi/util"),
		}
		for _, dir := range goDifs {
			if err := goFileWatcher.Watch(dir); err != nil {
				log.Warn(err)
			}
		}

		dirs := []string{
			filepath.Clean("config/plugins"),
			filepath.Clean("config/site"),
			filepath.Clean("views/theme/default/_global"),
			filepath.Clean("views/theme/default/_notfound"),
			filepath.Clean("views/theme/default/index"),
		}
		for _, dir := range dirs {
			if err := teplFileWatcher.Watch(dir); err != nil {
				log.Warn("dir:", dir, " error:", err)
			}
		}

		cmd := startApp()
		var (
			planToStartTime time.Time
			planToBuildTime time.Time
		)

		for {
			select {
			case ev := <-goFileWatcher.Event:
				log.Debug("<main> ", "goFileWatcher event:", ev)
				if planToBuildTime.IsZero() || ((time.Since(planToBuildTime) - *deferToAuto) > (500 * time.Millisecond)) {
					planToBuildTime = time.Now()
					time.AfterFunc(*deferToAuto, func() {
						if time.Since(planToBuildTime) > *deferToAuto {
							if installApp() == nil {
								cmd.Process.Kill()
								cmd = startApp()
							}
						}
					})
				}
			case ev := <-teplFileWatcher.Event:
				log.Debug("<main> ", "teplFileWatcher event:", ev)
				if planToStartTime.IsZero() || ((time.Since(planToStartTime) - *deferToAuto) > (500 * time.Millisecond)) {
					planToStartTime = time.Now()
					time.AfterFunc(*deferToAuto, func() {
						if time.Since(planToStartTime) > *deferToAuto {
							cmd.Process.Kill()
							cmd = startApp()
						}
					})
				}
			}
		}
	}
}

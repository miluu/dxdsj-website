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

func (p *PageIndex) RouteDataDetail() {
	log.Debug("<RouteDataDetail> start.")
}

func (p *PageIndex) RouteCalendar() {
	log.Debug("<RouteCalendar> start.")
}

func (p *PageIndex) RouteCalendarDetail() {
	log.Debug("<RouteCalendarDetail> start.")
}

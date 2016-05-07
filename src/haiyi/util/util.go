package util

func GetPageCount(totleNum, pageNum int) (pageCount []int, totlePage int) {
	totlePage = getTotlePage(totleNum, pageNum)
	for i := 1; i <= totlePage; i++ {
		pageCount = append(pageCount, i)
	}
	return
}

func getTotlePage(totleNum, pageNum int) (totlePage int) {
	totlePage = totleNum / pageNum
	if totleNum%pageNum != 0 {
		totlePage += 1
	}
	return
}

func GetIndex(i, p, n int) int {
	return n*(p-1) + i + 1
}

func GetIdxList(p, n, l int) (idxList []int) {
	for i := 0; i < l; i++ {
		idxList = append(idxList, GetIndex(i, p, n))
	}
	return
}

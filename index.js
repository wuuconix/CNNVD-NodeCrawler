const { JSDOM } = require("jsdom")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const fs = require("fs/promises")

const crawler = (CNNVD) => { //接受一个类似CNNVD-201709-1260这样的CNNVD编号
    return new Promise((resolv) => {
        fetch(`http://www.cnnvd.org.cn/web/xxk/ldxqById.tag?CNNVD=${CNNVD}`).then(res => res.text()).then(res => {
            const dom = new JSDOM(res)
            const name = dom.window.document.querySelector("body > div.container.m_t_10 > div > div.fl.w770 > div.detail_xq.w770 > h2").textContent.trim() //漏洞名称
            const CNNVDID = dom.window.document.querySelector("body > div.container.m_t_10 > div > div.fl.w770 > div.detail_xq.w770 > ul > li:nth-child(1) > span").textContent.slice(8) //CNNVD编号
            const level = dom.window.document.querySelector("body > div.container.m_t_10 > div > div.fl.w770 > div.detail_xq.w770 > ul > li:nth-child(2) > a").textContent.trim() //危害等级
            const CVEID = dom.window.document.querySelector("body > div.container.m_t_10 > div > div.fl.w770 > div.detail_xq.w770 > ul > li:nth-child(3) > a").textContent.trim() //CVE编号
            const type = dom.window.document.querySelector("body > div.container.m_t_10 > div > div.fl.w770 > div.detail_xq.w770 > ul > li:nth-child(4) > a").textContent.trim() //漏洞类型
            const spotTime = dom.window.document.querySelector("body > div.container.m_t_10 > div > div.fl.w770 > div.detail_xq.w770 > ul > li:nth-child(5) > a").textContent.trim() //发现时间
            const vulType = dom.window.document.querySelector("body > div.container.m_t_10 > div > div.fl.w770 > div.detail_xq.w770 > ul > li:nth-child(6) > a").textContent.trim() //威胁类型
            const updateTime = dom.window.document.querySelector("body > div.container.m_t_10 > div > div.fl.w770 > div.detail_xq.w770 > ul > li:nth-child(7) > a").textContent.trim() //更新时间
            let summary = "" //漏洞简洁
            const summaryP = dom.window.document.querySelectorAll("body > div.container.m_t_10 > div > div.fl.w770 > div:nth-child(4) p") //简洁段落
            for (let p of summaryP) {
                summary += p.textContent
            }
            summary = summary.trim()
            let result = {
                "漏洞名称": name,
                "CNNVD编号": CNNVDID,
                "危害等级": level,
                "CVE编号": CVEID,
                "漏洞类型": type,
                "发现时间": spotTime,
                "威胁类型": vulType,
                "更新时间": updateTime,
                "漏洞简介": summary
            }
            resolv(result)
        })
    })
}

const CNNVDList = ["CNNVD-202102-1202", "CNNVD-201808-778", "CNNVD-201801-898"] //在这个列表里写下你需要爬取的漏洞的CNNVD编号
let promiseList = []
for (let CNNVD of CNNVDList) {
    promiseList.push(crawler(CNNVD))
}
Promise.all(promiseList).then(res => {
    console.log("漏洞相关信息爬取如下：\n")
    console.log(res)
    fs.writeFile("CNNVDS.json", JSON.stringify(res)).then(res => {
        console.log("已存入CNNVDS.json")
    })
})

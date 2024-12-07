const dashPage = (req,res) => {
    return res.render('dash')
}
const galaryPage = (req,res) => {
    return res.render('galary')
}
const calenderPage = (req,res) => {
    return res.render('calender')
}
const invoicePage = (req,res) => {
    return res.render('invoice')
}
const chatPage = (req,res) => {
    return res.render('chat')
}

module.exports = {
    dashPage,galaryPage,calenderPage,invoicePage,chatPage
}
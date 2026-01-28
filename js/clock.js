function Appendzero(obj) {
if(obj<10) return "0" +""+ obj;
else return obj;
}
function changeClock() {
var d = new Date();
document.getElementById("date_c").innerHTML = Appendzero(d.getFullYear()) + "-" + Appendzero((d.getMonth() + 1)) + "-" + Appendzero(d.getDate());
document.getElementById("clock_c").innerHTML = Appendzero(d.getHours()) + ":" + Appendzero(d.getMinutes()) + ":" + Appendzero(d.getSeconds());
}
window.setInterval(changeClock, 1000); 
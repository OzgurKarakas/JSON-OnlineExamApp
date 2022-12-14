let sunucudanDonen;

var baglanti = new XMLHttpRequest();
baglanti.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        sunucudanDonen = JSON.parse(baglanti.responseText)
        soruGetir();
    }

    return sunucudanDonen;
};
baglanti.open("GET", "data.json", true);
baglanti.send();

const sonucAlani = document.getElementsByClassName("soruAlani")[0];
const soru = document.getElementById("soru");
const secenekler = document.getElementsByName("secenek");

const aciklamaA = document.getElementById("aciklamaA");
const aciklamaB = document.getElementById("aciklamaB");
const aciklamaC = document.getElementById("aciklamaC");
const aciklamaD = document.getElementById("aciklamaD");

const gonder = document.getElementById("gonder");

let puan = 0;
let sira = 0;

function soruGetir() {
    secimiTemizle();
    console.log(sunucudanDonen);

    let siradakiSoru = sunucudanDonen.sorular[sira];

    soru.innerHTML = siradakiSoru.soru;
    aciklamaA.innerText = siradakiSoru.aciklamaA;
    aciklamaB.innerText = siradakiSoru.aciklamaB;
    aciklamaC.innerText = siradakiSoru.aciklamaC;
    aciklamaD.innerText = siradakiSoru.aciklamaD;
}
function secimiTemizle() {
    secenekler.forEach(secenek => secenek.checked = false);
}

function secimiAl() {
    let secim;

    secenekler.forEach(secenek => {
        if (secenek.checked == true) {
            secim = secenek.id;
        }
    })
    return secim;
}

gonderButonu.addEventListener("click", () => {
    const secilen = secimiAl();
    console.log(secilen);

    if (secilen) {
        if (secilen === sunucudanDonen.sorular[sira].cevap) {
            puan++;
        }
    }
    sira++;

    if (sira < sunucudanDonen.sorular.length) {
        soruGetir();
    }
    else {
        sonucAlani.innerHTML = `
            <h2>Toplamda ${puan}/${sunucudanDonen.sorular.length} başarı sağladınız.</h2>
        `

        gonderButonu.setAttribute("onclick", "location.reload()");
        gonderButonu.innerHTML("Yeniden  Başla");
    }
})
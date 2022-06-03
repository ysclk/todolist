const notekleButton = document.getElementsByClassName("noteklebutonu")[0];
const acilirForm = document.querySelector(".form");
const form = acilirForm.querySelector("form");
const yeninoteklediv = acilirForm.querySelector(".yeninoteklediv")
const baslikK = yeninoteklediv.querySelector(".baslik");
const kapatDugme = baslikK.querySelector("span");
const notyigini = document.getElementsByClassName("notyigini")[0];
const baslikInput = document.getElementById("baslikId");//form.querySelector('input[type="text"]');
const inputDate = document.getElementById("yapilacaktarihId");
const notyigininoteklediv = document.querySelector(".notyigininoteklediv");
//console.log(baslikInput);
const ekleSubmit = form.querySelector('input[type="submit"]');
const yapilacakTarih = form.querySelector('input[type="date"]');

const aciklamaTextarea = form.querySelector("textarea");
const buton = form.querySelector("button");

var bugun = "";

const today = (bugun) => {
    // bugun = new Date();
    var dd = bugun.getDate();
    var mm = bugun.getMonth() + 1;
    var yyyy = bugun.getFullYear();
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    bugun = dd + "." + mm + "." + yyyy;
    return bugun;
}
const today1 = (bugun) => {
    // bugun = new Date();
    var dd = bugun.getDate();
    var mm = bugun.getMonth() + 1;
    var yyyy = bugun.getFullYear();
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    bugun = yyyy + "-" + mm + "-" + dd;
    return bugun;
}

inputDate.value = today1(new Date());

const getNotlarFromStorage = () => {
    const storage = JSON.parse(localStorage.getItem('notlar'));
    return (storage) ? storage : [];
}

const notlar = getNotlarFromStorage();

const getNotlarToPage = () => {
    notlar.forEach((not) => {
        notOlustur(not);
    });
}

const saveNotlarToStorage = (not) => {
    notlar.push(not);
    localStorage.setItem('notlar', JSON.stringify(notlar));
    notOlustur(not);

}

const guncelleNotlarToStorage = (not) => {
    notlar[guncelleId] = not;
    localStorage.setItem('notlar', JSON.stringify(notlar));
    // notOlustur(not);

}



notekleButton.addEventListener("click", () => {
    yeninoteklediv.style.visibility = "visible";
    ekleSubmit.value = "Ekle";
    baslikK.querySelector("p").textContent = "Yeni Not Ekle";
    notyigini.classList.add("golge");


    console.log(notyigini.firstChild);


});

kapatDugme.addEventListener("click", () => {
    notyigini.classList.remove("golge");
    yeninoteklediv.style.visibility = "hidden";


});
var notId = 0;
let baslik = "", aciklama = "", tarih = "";


const notOlustur = (not) => {


    const div = document.createElement("div");
    console.log("notlar" + notlar);
    //tarih({ dateFormat: 'yy-mm-dd' });

    div.className = "noteklendidiv";
    div.innerHTML =
        `   <p class='pbaslik'>${not.baslik}</p>
            <textarea name="aciklama" id="aciklamaId" cols="30" rows="10" disabled="disabled">${not.aciklama}</textarea>            
            <div class="silDegistir">
                <p>${not.tarih}</p >
                <div class="siledit">
                    <span class="sil" onclick='notSil(${notlar.indexOf(not)})'><i class="fa-solid fa-trash-can"></i></span>
                    <span class="degistir" onclick="notDegistir(${notlar.indexOf(not)}, '${(not.baslik)}', '${not.aciklama}')"><i class="fa-solid fa-pencil"></i></span>
                    <span class="tamamlandi" onclick="notYapildi(this)"><i class="fa-solid fa-check"></i></span>
                </div>
            </div > `;

    notyigini.appendChild(div);
}

let guncelleId;
let guncellesinMi = false;


ekleSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    baslik = baslikInput.value.trim();
    aciklama = aciklamaTextarea.value.trim();
    var tarih1 = new Date(yapilacakTarih.value);

    tarih = today(tarih1);

    let not = { baslik, aciklama, tarih };
    if (!guncellesinMi) {
        if (baslik != "" && aciklama != "" && tarih != "") {
            saveNotlarToStorage(not);
        }
        else {
            alert("Bos yerleri doldurunuz!");
        }

    } else {
        guncellesinMi = false;
        guncelleNotlarToStorage(not);
        if (!notlar) return;
        document.querySelectorAll(".noteklendidiv").forEach(div => div.remove());
        getNotlarToPage();

    }


    baslikInput.value = "";
    aciklamaTextarea.value = "";
    inputDate.value = today1(new Date());
    //localStorage.removeItem("notlar");

});



function notDegistir(index, baslik, aciklama) {
    guncellesinMi = true;
    notekleButton.click();
    guncelleId = index;
    baslikK.querySelector("p").textContent = "Notu Degistir";
    aciklamaTextarea.value = aciklama;
    baslikInput.value = baslik;
    ekleSubmit.value = "Güncelle"


}

window.addEventListener('load', () => {
    getNotlarToPage();
});

const notSil = (index) => {
    console.log("index " + index);
    if (index > -1) {
        notlar.splice(index, 1);
        localStorage.setItem('notlar', JSON.stringify(notlar));
    }
    if (!notlar) return;
    document.querySelectorAll(".noteklendidiv").forEach(div => div.remove());
    getNotlarToPage();

}


function notYapildi(index) {
    console.log(index);
    index.parentElement.parentElement.parentElement.classList.add('goster');


}

//${new Date().toLocaleDateString("tr", { year: "2-digit", month: "2-digit", day: "2-digit" })}
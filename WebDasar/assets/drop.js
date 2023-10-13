// const Name = prompt("Siapa nama anda?");
// alert("Selamat datang " + Name);

function DropFunction() {
    //get id and show when user toggle the button
    document.getElementById("DropdownID").classList.toggle("show");
}  

window.onclick = function(event) {
    if (!event.target.matches('.dropbutton')) {
        //get content by class name
      var dropdowncon = document.getElementsByClassName("dropdown-content");
      var d;
      for (d = 0; d < dropdowncon.length; d++) {
        // open dropdown konten
        var openDropdowncon = dropdowncon[d];
        if (openDropdowncon.classList.contains('show')) {
            // alert("maaf, fitur masih dalam tahap pengembangan.");
            openDropdowncon.classList.remove('show');
        }
      }
    }
}



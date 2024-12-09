// Așteaptă până când pagina este încărcată complet
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM complet încărcat"); // Ar trebui să apară în consolă
  // Fetch API pentru a obține datele din PHP
  fetch("php/api.php")
    .then((response) => response.json()) // Convertim răspunsul în JSON
    .then((data) => {
      displayProducts(data); // Afiseaza produsele
    })
    .catch((error) =>
      console.error("Eroare la preluarea prajiturilor:", error)
    );

  fetch("php/pachete.php")
    .then((response) => response.json())
    .then((data) => {
      displayPachete(data); //Afiseaza pachetele
    })
    .catch((error) => console.error("Eroare la preluarea pachetelor:", error));

  // Functie de afisare a prajiturilor
  function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = ""; // Goleste continutul existent

    const product_title = `<h1 class="text-center mb-4">Prăjituri Delicioase</h1>`;
    container.innerHTML += product_title; // Afisare titlu

    products.forEach((product) => {
      const productCard = `
                    <div class="col-12 col-sm-6 col-md-4 mb-4">
                        <div class="card">
                            <img src="img/${product.imagine}" class="card-img-top" alt="${product.nume}">
                            <div class="card-descriere">                            
                                <h5 class="card-title">${product.nume}</h5>
                                <p class="card-text">${product.descriere}</p>
                                <a href="#" class="button2 btn">Comandă acum</a>
                            </div>
                        </div>
                    </div>`;
      container.innerHTML += productCard; // Afisare carduri preluate din baza de date
    });
  }

  // Functie de afisare a pachetelor
  function displayPachete(pachete) {
    const container = document.getElementById("pachete-container");
    container.innerHTML = ""; // Goleste continutul existent

    const product_title = `<h1 class="text-center mb-4">Pachetele noastre</h1>`;
    container.innerHTML += product_title; // Afisare titlu

    pachete.forEach((pachet) => {
      const pachetCard = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="img/${pachet.imagine_pachet}" class="card-img-top" alt="${pachet.nume_pachet}">
                        <div class="card-body">
                            <h5 class="card-title">${pachet.nume_pachet}</h5>
                            <p class="card-text">${pachet.componenta}</p>
                            <p class="card-text"><strong>${pachet.pret} RON/kg</strong></p>
                        </div>
                    </div>
                </div>`;
      container.innerHTML += pachetCard;
    });
  }

  // Validare formular de contact
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Oprește trimiterea tradițională a formularului
      console.log("Formular trimis");

      // Validare manuală
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !phone || !message) {
        alert("Toate câmpurile sunt obligatorii!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Te rugăm să introduci o adresă de email validă!");
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        alert("Te rugăm să introduci un număr de telefon valid (10 cifre)!");
        return;
      }

      console.log("Validare trecută. Se trimite prin AJAX...");

      // Pregătire și trimitere AJAX
      const formData = new FormData(contactForm);

      fetch("php/contact.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Răspuns de la server:", data);
          // Selectăm elementele pentru mesaj
          const responseMessage = document.getElementById("response-message");
          const messageContent = document.getElementById("message-content");

          if (responseMessage && messageContent) {
            messageContent.textContent = data; // Setăm conținutul mesajului
            responseMessage.style.display = "block"; // Afișăm containerul

            // Ascundem mesajul automat după 5 secunde
            setTimeout(() => {
              responseMessage.style.display = "none";
            }, 3000);
          }

          contactForm.reset(); // Golește câmpurile formularului
        })
        .catch((error) => {
          console.error("Eroare la trimiterea formularului:", error);
          // Afișăm mesajul de eroare în caz de eșec
          const responseMessage = document.getElementById("response-message");
          const messageContent = document.getElementById("message-content");

          if (responseMessage && messageContent) {
            messageContent.textContent =
              "A apărut o eroare. Te rugăm să încerci din nou.";
            responseMessage.style.display = "block";

            // Ascundem mesajul automat după 5 secunde
            setTimeout(() => {
              responseMessage.style.display = "none";
            }, 5000);
          }
        });
    });
  }
});

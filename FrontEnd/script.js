document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    
    login();
});

async function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Veuillez renseigner votre adresse e-mail et votre mot de passe.");
    } else {
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                // Stocker le token dans le local storage
                localStorage.setItem("token", token);

                // Rediriger vers la page index.html
                window.location.href = "index.html";
            } else {
                if (response.status === 404) {
                    alert("Adresse e-mail introuvable.");
                } else if (response.status === 401) {
                    alert("Mot de passe incorrect.");
                } else {
                    alert("Une erreur s'est produite lors de la connexion.");
                }
            }
        } catch (error) {
            console.log("Une erreur s'est produite lors de la connexion :", error);
            alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
        }
    }
}




fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const galerie = document.getElementById('galerie');
    galerie.innerHTML = '';

    data.forEach(projet => {
      const projetElement = document.createElement('div');
      projetElement.textContent = projet.titre;
      galerie.appendChild(projetElement);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des projets :', error);
  });

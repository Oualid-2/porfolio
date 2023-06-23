// Fonction pour charger les images dans la section du portfolio
function loadImages() {
    const gallery = document.getElementById('gallery');
  
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(images => {
        images.forEach((image) => {
          // Créer un conteneur <div> pour chaque image
          const imageContainer = document.createElement('div');
          imageContainer.className = 'image-container';
          imageContainer.style.marginTop = '7px'; // Ajout de la marge inférieure de 7px
  
          // Créer un élément <img> pour l'image
          const imgElement = document.createElement('img');
          imgElement.src = image.imageUrl;
          imgElement.alt = image.title;
  
          // Créer un élément <p> pour le titre de l'image
          const titleElement = document.createElement('p');
          titleElement.textContent = image.title;
  
          // Ajouter l'image et le titre au conteneur
          imageContainer.appendChild(imgElement);
          imageContainer.appendChild(titleElement);
  
          // Ajouter le conteneur à la galerie
          gallery.appendChild(imageContainer);
  
          // Ajouter les classes de filtre en fonction de la catégorie de l'image
          if (image.category.name === 'Objets') {
            imageContainer.classList.add('filter-objects');
          } else if (image.category.name === 'Appartements') {
            imageContainer.classList.add('filter-apartments');
          } else if (image.category.name === 'Hotels & restaurants') {
            imageContainer.classList.add('filter-hotels');
          }
        });
  
        // Ajouter les écouteurs d'événements aux boutons de filtre
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
          button.addEventListener('click', function() {
            const category = button.dataset.category;
            filterImages(category);
          });
        });
      })
      .catch(error => {
        console.log("Une erreur s'est produite lors du chargement des images :", error);
        alert("Une erreur s'est produite lors du chargement des images. Veuillez réessayer plus tard.");
      });
  }
  
  // Appeler la fonction pour charger les images au chargement de la page
  window.addEventListener('load', function() {
    // Vérifier si l'URL de la page est index.html
    if (window.location.pathname.includes('index.html')) {
      // Appeler la fonction pour charger les images uniquement sur la page index.html
      loadImages();
    }
  });
  
// La soumission du formulaire de connexion
if (window.location.pathname.includes('login.html')) {
    document.getElementById("form").addEventListener("submit", function(event) {
      event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
      login();
    });
  }
  
  // Fonction de connexion
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
  
  // Fonction de filtrage des images
  function filterImages(category) {
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
      container.style.display = 'none'; // Masquer toutes les images
  
      if (category === 'all') {
        container.style.display = 'block'; // Afficher toutes les images pour le bouton "Tout"
      } else if (container.classList.contains(`filter-${category}`)) {
        container.style.display = 'block'; // Afficher les images correspondant à la catégorie du bouton cliqué
      }
    });
  }
  
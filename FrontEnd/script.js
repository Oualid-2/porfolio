// Tableau d'objets représentant les images
const images = [
    {
      "id": 1,
      "title": "Abajour Tahina",
      "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
      "categoryId": 1,
      "userId": 1,
      "category": {
        "id": 1,
        "name": "Objets"
      }
    },
    {
      "id": 2,
      "title": "Appartement Paris V",
      "imageUrl": "http://localhost:5678/images/appartement-paris-v1651287270508.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 3,
      "title": "Restaurant Sushisen - Londres",
      "imageUrl": "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png",
      "categoryId": 3,
      "userId": 1,
      "category": {
        "id": 3,
        "name": "Hotels & restaurants"
      }
    },
    {
      "id": 4,
      "title": "Villa “La Balisiere” - Port Louis",
      "imageUrl": "http://localhost:5678/images/la-balisiere1651287350102.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 5,
      "title": "Structures Thermopolis",
      "imageUrl": "http://localhost:5678/images/structures-thermopolis1651287380258.png",
      "categoryId": 1,
      "userId": 1,
      "category": {
        "id": 1,
        "name": "Objets"
      }
    },
    {
      "id": 6,
      "title": "Appartement Paris X",
      "imageUrl": "http://localhost:5678/images/appartement-paris-x1651287435459.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 7,
      "title": "Pavillon “Le coteau” - Cassis",
      "imageUrl": "http://localhost:5678/images/le-coteau-cassis1651287469876.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 8,
      "title": "Villa Ferneze - Isola d’Elba",
      "imageUrl": "http://localhost:5678/images/villa-ferneze1651287511604.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 9,
      "title": "Appartement Paris XVIII",
      "imageUrl": "http://localhost:5678/images/appartement-paris-xviii1651287541053.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 10,
      "title": "Bar “Lullaby” - Paris",
      "imageUrl": "http://localhost:5678/images/bar-lullaby-paris1651287567130.png",
      "categoryId": 3,
      "userId": 1,
      "category": {
        "id": 3,
        "name": "Hotels & restaurants"
      }
    },
    {
      "id": 11,
      "title": "Hotel First Arte - New Delhi",
      "imageUrl": "http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png",
      "categoryId": 3,
      "userId": 1,
      "category": {
        "id": 3,
        "name": "Hotels & restaurants"
      }
    }
  ];
  
  // Fonction pour charger les images dans la section du portfolio
  function loadImages() {
    const gallery = document.getElementById('gallery');
  
    // Parcourir le tableau d'images
    images.forEach((image) => {
      // Créer un élément <img> pour chaque image
      const imgElement = document.createElement('img');
      imgElement.src = image.imageUrl;
      imgElement.alt = image.title;
  
      // Ajouter l'image à la galerie
      gallery.appendChild(imgElement);
    });
  }
  
  // Appeler la fonction pour charger les images au chargement de la page
  window.addEventListener('load', loadImages);
  
  // Écouteur d'événement pour la soumission du formulaire de connexion
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    login();
  });
  
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
  
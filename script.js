// Script pour le défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const cards = document.querySelectorAll(".car-card");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    let index = 0;
    const totalCards = cards.length;
    const visibleCards = 2; // On affiche 2 cartes

    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${index * (105 / visibleCards)}%)`;
    }

    nextButton.addEventListener("click", function () {
        if (index < totalCards - visibleCards) {
            index++;
        } else {
            index = 0; // Retour au début si on atteint la fin
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", function () {
        if (index > 0) {
            index--;
        } else {
            index = totalCards - visibleCards; // Revenir à la fin si on est au début
        }
        updateCarousel();
    });
});

document.querySelectorAll('.car-image').forEach(image => {
    image.addEventListener('click', function() {
        // Ouvrir la modale
        const modal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
        const additionalImagesContainer = document.getElementById("additionalImages");

        // Identifier la voiture sur laquelle l'utilisateur a cliqué
        const carFolder = this.getAttribute('data-car'); // Récupère l'attribut 'data-car' (par exemple "001", "002", etc.)

                // Cacher temporairement l'image principale
        modalImage.style.opacity = "0";

        // Charger la nouvelle image et attendre qu'elle soit complètement chargée
        const newImage = new Image();
        newImage.src = `images/${carFolder}/${carFolder}.1.jpg`;
        newImage.onload = function() {
            modalImage.src = newImage.src;
            modalImage.style.opacity = "1"; // Réafficher l'image une fois chargée
        };



        // Définir l'image principale dans la modale (la première image du dossier)
        modalImage.src = `images/${carFolder}/${carFolder}.1.jpg`;

        // Vider le conteneur des images supplémentaires
        additionalImagesContainer.innerHTML = '';

        // Charger les images supplémentaires du dossier
        let additionalImages = [];
        for (let i = 1; i <= 7; i++) {
            // On récupère les images du dossier correspondant à la voiture
            additionalImages.push(`images/${carFolder}/${carFolder}.${i}.jpg`);
        }

        // Ajouter les images supplémentaires dans le conteneur
        additionalImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Additional Image ${src}`;
            img.classList.add('additional-image');
            additionalImagesContainer.appendChild(img);

            // Changer l'image principale au clic sur une image supplémentaire
            img.addEventListener('click', function() {
                modalImage.src = this.src;
            });
        });

        // Afficher la modale
        modal.style.display = "block";
    });
});

// Fermer la modale
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById("imageModal").style.display = "none";
});

// Fermer la modale si l'utilisateur clique en dehors de l'image
window.onclick = function(event) {
    if (event.target == document.getElementById("imageModal")) {
        document.getElementById("imageModal").style.display = "none";
    }
}

// Fonction pour changer la langue
function changeLanguage(language) {
    // Sauvegarder la langue sélectionnée dans le stockage local
    localStorage.setItem('language', language);

    // Appliquer la langue
    setLanguage(language);
}

// Fonction pour appliquer la langue
function setLanguage(language) {
    // Les textes traduits dans chaque langue
    const translations = {
        "fr": {
            "title": "Indecent",
            "nav-home": "Accueil",
            "nav-collection": "Collection",
            "nav-about": "À propos",
            "nav-contact": "Contact",
            "home-text": "Être vulgaire est facile. Restez classe. Juste un peu INDECENT.",
            "collection-heading": "Collection",
            "supported-vehicles-heading": "Véhicules actuellement supportés",
            "about-title": "À Propos de nous",
            "about-text1": "Indecent a été créé pour revitaliser les passionnés de Porsche en offrant une transformation complète des Porsche 911 refroidies par eau.",
            "about-text2": "Conçu avec l'intention de repousser les limites de la forme originale de la Porsche tout en préservant sa beauté et son esthétique. La vision de moderniser la Porsche 911 bien-aimée est l'objectif ultime.",
            "about-text3": "Produit en Pologne, le design d'Indecent prend vie grâce à des artisans manuels de génération en génération ainsi qu'avec la technologie moderne. Le travail impliqué pour créer un véhicule Indecent nécessite le remplacement, la liaison et le moulage de chaque panneau de carrosserie à l'exception du capot, du toit et des portes. Une attention particulière est portée pour garantir une finition de qualité OEM.",
            "about-text4": "Créer une Indecent 911 amène le propriétaire à travers un voyage spécial : processus de conception, spécifications des options, transport/sourcing du véhicule, processus de construction, et finalisé par un numéro de série unique.",
            "contact-heading": "Contact",
            "contact-text": "Veuillez contacter l'un de nos constructeurs officiels si vous souhaitez démarrer le processus de votre propre Indecent 911!",
            "footer": "&copy; 2025 Indecent | Fabricant du kit carrosserie large Porsche 911 997.",
            // Informations sur les voitures
            "car-1-title": "Indecent 001",
            "car-1-power": "Puissance : 391 HP",
            "car-1-torque": "Couple : 420 Nm",
            "car-1-wheels": "Jantes : Rotiform FUC",
            "car-1-suspension": "Suspension : SHOW",
            "car-1-option": "Option : Ducktail (optionnel)",
            "car-1-release": "Sortie : Juillet 2022",
            "car-2-title": "Indecent 002",
            "car-2-power": "Puissance : 500 HP",
            "car-2-torque": "Couple : 620 Nm",
            "car-2-wheels": "Jantes : Rotiform USF",
            "car-2-suspension": "Suspension : STREET",
            "car-2-option": "Option : Aileron (optionnel)",
            "car-2-release": "Sortie : Novembre 2022",
            "car-3-title": "Indecent 003",
            "car-3-power": "Puissance : 391 HP",
            "car-3-torque": "Couple : 420 Nm",
            "car-3-wheels": "Jantes : Rotiform FUC",
            "car-3-suspension": "Suspension : SHOW",
            "car-3-option": "Option : Becquet (optionnel)",
            "car-3-release": "Sortie : Juin 2023",
            "car-4-title": "Indecent 004",
            "car-4-power": "Puissance : 500 HP",
            "car-4-torque": "Couple : 620 Nm",
            "car-4-wheels": "Jantes : Rotiform USF",
            "car-4-suspension": "Suspension : SHOW",
            "car-4-option": "Option : Aileron (optionnel)",
            "car-4-release": "Sortie : Mai 2024",
            "car-5-title": "Indecent 005",
            "car-5-power": "Puissance : 400 HP",
            "car-5-torque": "Couple : 440 Nm",
            "car-5-wheels": "Jantes : Rotiform USF",
            "car-5-suspension": "Suspension : RACE",
            "car-5-option": "Option : Aileron (optionnel)",
            "car-5-release": "Sortie : Avril 2024",
        },
        "en": {
            "title": "Indecent",
            "nav-home": "Home",
            "nav-collection": "Collection",
            "nav-about": "About",
            "nav-contact": "Contact",
            "home-text": "Being vulgar is easy. Stay classy. Just a bit INDECENT.",
            "collection-heading": "Collection",
            "supported-vehicles-heading": "Currently Supported Vehicles",
            "about-title": "About Us",
            "about-text1": "Indecent was created to reinvigorate Porsche enthusiasts by offering a full-service transformation of water-cooled 911’s.",
            "about-text2": "Designed with intentions to push the limit of Porsche's original shape and lines while maintaining its beauty and aesthetics. The vision of modernizing the beloved Porsche 911 is the ultimate goal.",
            "about-text3": "Produced in Poland, the Indecent design is brought to life by generational handcrafted artisans along with modern advanced technology. The work involved to create an indecent vehicle requires replacement, bonding and molding of every body panel with the exception of the hood, roof and doors. Extra attention is paid to ensure a quality OEM finish.",
            "about-text4": "Creating an Indecent 911 takes the owner through a special journey: design process, option specifications, vehicle transportation/sourcing, construction process, and finalized by a unique serial number.",
            "contact-heading": "Contact",
            "contact-text": "Please reach out to one of our official builders if you'd like to start the process of your very own Indecent 911!",
            "footer": "&copy; 2025 Indecent | Manufacturer of Porsche 911 997 widebody kit.",
            // Informations sur les voitures
            "car-1-title": "Indecent 001",
            "car-1-power": "Power: 391 HP",
            "car-1-torque": "Torque: 420 Nm",
            "car-1-wheels": "Wheels: Rotiform FUC",
            "car-1-suspension": "Suspension: SHOW",
            "car-1-option": "Option: Ducktail (optional)",
            "car-1-release": "Release: July 2022",
            "car-2-title": "Indecent 002",
            "car-2-power": "Power: 500 HP",
            "car-2-torque": "Torque: 620 Nm",
            "car-2-wheels": "Wheels: Rotiform USF",
            "car-2-suspension": "Suspension: STREET",
            "car-2-option": "Option: Spoiler (optional)",
            "car-2-release": "Release: November 2022",
            "car-3-title": "Indecent 003",
            "car-3-power": "Power: 391 HP",
            "car-3-torque": "Torque: 420 Nm",
            "car-3-wheels": "Wheels: Rotiform FUC",
            "car-3-suspension": "Suspension: SHOW",
            "car-3-option": "Option: Spoiler (optional)",
            "car-3-release": "Release: June 2023",
            "car-4-title": "Indecent 004",
            "car-4-power": "Power: 500 HP",
            "car-4-torque": "Torque: 620 Nm",
            "car-4-wheels": "Wheels: Rotiform USF",
            "car-4-suspension": "Suspension: SHOW",
            "car-4-option": "Option: Spoiler (optional)",
            "car-4-release": "Release: May 2024",
            "car-5-title": "Indecent 005",
            "car-5-power": "Power: 400 HP",
            "car-5-torque": "Torque: 440 Nm",
            "car-5-wheels": "Wheels: Rotiform USF",
            "car-5-suspension": "Suspension: RACE",
            "car-5-option": "Option: Spoiler (optional)",
            "car-5-release": "Release: April 2024",
        },
        "pl": {
            "title": "Indecent",
            "nav-home": "Strona Główna",
            "nav-collection": "Kolekcja",
            "nav-about": "O nas",
            "nav-contact": "Kontakt",
            "home-text": "Bycie wulgarnym jest łatwe. Bądź stylowy. Tylko trochę INDECENT.",
            "collection-heading": "Kolekcja",
            "supported-vehicles-heading": "Obecnie obsługiwane pojazdy",
            "about-title": "O nas",
            "about-text1": "Indecent zostało stworzone, aby ożywić pasjonatów Porsche, oferując kompleksową transformację Porsche 911 z chłodzeniem wodnym.",
            "about-text2": "Zaprojakoane z zamiarem przesunięcia granic oryginalnego kształtu Porsche, zachowując jego piękno i estetykę. Celem jest modernizacja ukochanej Porsche 911.",
            "about-text3": "Produkowane w Polsce, projekt Indecent ożywia ręcznie robieni artyści wraz z nowoczesną technologią. Praca, która wiąże się z tworzeniem pojazdu Indecent, wymaga wymiany, klejenia i formowania każdego panelu nadwozia, z wyjątkiem maski, dachu i drzwi. Szczególna uwaga poświęcana jest zapewnieniu wysokiej jakości wykończenia OEM.",
            "about-text4": "Tworzenie Indecent 911 to wyjątkowa podróż dla właściciela: proces projektowania, specyfikacja opcji, transport/sourcing pojazdu, proces budowy i finalizacja unikalnym numerem seryjnym.",
            "contact-heading": "Kontakt",
            "contact-text": "Skontaktuj się z jednym z naszych oficjalnych budowniczych, jeśli chcesz rozpocząć proces tworzenia swojego własnego Indecent 911!",
            "footer": "&copy; 2025 Indecent | Producent szerokiego zestawu nadwozia Porsche 911 997.",
            // Informations sur les voitures
            "car-1-title": "Indecent 001",
            "car-1-power": "Moc: 391 HP",
            "car-1-torque": "Moment obrotowy: 420 Nm",
            "car-1-wheels": "Felgi: Rotiform FUC",
            "car-1-suspension": "Zawieszenie: SHOW",
            "car-1-option": "Opcja: Ducktail (opcjonalnie)",
            "car-1-release": "Wydanie: lipiec 2022",
            "car-2-title": "Indecent 002",
            "car-2-power": "Moc: 500 HP",
            "car-2-torque": "Moment obrotowy: 620 Nm",
            "car-2-wheels": "Felgi: Rotiform USF",
            "car-2-suspension": "Zawieszenie: STREET",
            "car-2-option": "Opcja: Spoiler (opcjonalnie)",
            "car-2-release": "Wydanie: listopad 2022",
            "car-3-title": "Indecent 003",
            "car-3-power": "Moc: 391 HP",
            "car-3-torque": "Moment obrotowy: 420 Nm",
            "car-3-wheels": "Felgi: Rotiform FUC",
            "car-3-suspension": "Zawieszenie: SHOW",
            "car-3-option": "Opcja: Spoiler (opcjonalnie)",
            "car-3-release": "Wydanie: czerwiec 2023",
            "car-4-title": "Indecent 004",
            "car-4-power": "Moc: 500 HP",
            "car-4-torque": "Moment obrotowy: 620 Nm",
            "car-4-wheels": "Felgi: Rotiform USF",
            "car-4-suspension": "Zawieszenie: SHOW",
            "car-4-option": "Opcja: Spoiler (opcjonalnie)",
            "car-4-release": "Wydanie: maj 2024",
            "car-5-title": "Indecent 005",
            "car-5-power": "Moc: 400 HP",
            "car-5-torque": "Moment obrotowy: 440 Nm",
            "car-5-wheels": "Felgi: Rotiform USF",
            "car-5-suspension": "Zawieszenie: RACE",
            "car-5-option": "Opcja: Spoiler (opcjonalnie)",
            "car-5-release": "Wydanie: kwiecień 2024",
        }
    };

    // Mettre à jour les éléments du site avec la langue choisie
    document.title = translations[language].title;
    document.getElementById("nav-accueil").textContent = translations[language]["nav-home"];
    document.getElementById("nav-collection").textContent = translations[language]["nav-collection"];
    document.getElementById("nav-about").textContent = translations[language]["nav-about"];
    document.getElementById("nav-contact").textContent = translations[language]["nav-contact"];
    document.querySelector(".accueil-texte p").textContent = translations[language]["home-text"];
    document.querySelector(".collection h2").textContent = translations[language]["collection-heading"];
    document.querySelector(".supported-vehicles h3").textContent = translations[language]["supported-vehicles-heading"];
    document.querySelector(".about h2").textContent = translations[language]["about-title"];
    document.querySelectorAll(".about p")[0].textContent = translations[language]["about-text1"];
    document.querySelectorAll(".about p")[1].textContent = translations[language]["about-text2"];
    document.querySelectorAll(".about p")[2].textContent = translations[language]["about-text3"];
    document.querySelectorAll(".about p")[3].textContent = translations[language]["about-text4"];
    document.querySelector(".contact h2").textContent = translations[language]["contact-heading"];
    document.querySelector(".contact p").textContent = translations[language]["contact-text"];
    document.querySelector("footer p").innerHTML = translations[language]["footer"];

    // Mettre à jour les caractéristiques des voitures
    document.querySelector("#car-1-title").textContent = translations[language]["car-1-title"];
    document.querySelector("#car-1-power").textContent = translations[language]["car-1-power"];
    document.querySelector("#car-1-torque").textContent = translations[language]["car-1-torque"];
    document.querySelector("#car-1-wheels").textContent = translations[language]["car-1-wheels"];
    document.querySelector("#car-1-suspension").textContent = translations[language]["car-1-suspension"];
    document.querySelector("#car-1-option").textContent = translations[language]["car-1-option"];
    document.querySelector("#car-1-release").textContent = translations[language]["car-1-release"];

    document.querySelector("#car-2-title").textContent = translations[language]["car-2-title"];
    document.querySelector("#car-2-power").textContent = translations[language]["car-2-power"];
    document.querySelector("#car-2-torque").textContent = translations[language]["car-2-torque"];
    document.querySelector("#car-2-wheels").textContent = translations[language]["car-2-wheels"];
    document.querySelector("#car-2-suspension").textContent = translations[language]["car-2-suspension"];
    document.querySelector("#car-2-option").textContent = translations[language]["car-2-option"];
    document.querySelector("#car-2-release").textContent = translations[language]["car-2-release"];
    
    document.querySelector("#car-3-title").textContent = translations[language]["car-3-title"];
    document.querySelector("#car-3-power").textContent = translations[language]["car-3-power"];
    document.querySelector("#car-3-torque").textContent = translations[language]["car-3-torque"];
    document.querySelector("#car-3-wheels").textContent = translations[language]["car-3-wheels"];
    document.querySelector("#car-3-suspension").textContent = translations[language]["car-3-suspension"];
    document.querySelector("#car-3-option").textContent = translations[language]["car-3-option"];
    document.querySelector("#car-3-release").textContent = translations[language]["car-3-release"];

    document.querySelector("#car-4-title").textContent = translations[language]["car-4-title"];
    document.querySelector("#car-4-power").textContent = translations[language]["car-4-power"];
    document.querySelector("#car-4-torque").textContent = translations[language]["car-4-torque"];
    document.querySelector("#car-4-wheels").textContent = translations[language]["car-4-wheels"];
    document.querySelector("#car-4-suspension").textContent = translations[language]["car-4-suspension"];
    document.querySelector("#car-4-option").textContent = translations[language]["car-4-option"];
    document.querySelector("#car-4-release").textContent = translations[language]["car-4-release"];

    document.querySelector("#car-5-title").textContent = translations[language]["car-5-title"];
    document.querySelector("#car-5-power").textContent = translations[language]["car-5-power"];
    document.querySelector("#car-5-torque").textContent = translations[language]["car-5-torque"];
    document.querySelector("#car-5-wheels").textContent = translations[language]["car-5-wheels"];
    document.querySelector("#car-5-suspension").textContent = translations[language]["car-5-suspension"];
    document.querySelector("#car-5-option").textContent = translations[language]["car-5-option"];
    document.querySelector("#car-5-release").textContent = translations[language]["car-5-release"];
}

// Vérifier la langue sauvegardée et appliquer
window.onload = function() {
    const language = localStorage.getItem('language') || 'fr'; // Par défaut, français
    setLanguage(language);
};

// Langue par défaut au chargement de la page (anglais)
changeLanguage('en');
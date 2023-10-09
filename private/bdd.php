<?php
class bdd {
    private $serveur;
    private $utilisateur;
    private $motDePasse;
    private $baseDeDonnees;
    private $connexion;

    public function __construct() {
        $this->serveur = "127.0.0.1";
        $this->utilisateur = "root";
        $this->motDePasse = "";
        $this->baseDeDonnees = "workshop-i1";

        $this->connexion = new mysqli($this->serveur, $this->utilisateur, $this->motDePasse, $this->baseDeDonnees);

        if ($this->connexion->connect_error) {
            die("La connexion a échoué : " . $this->connexion->connect_error);
        }
    }

    public function exec($requete) {
        $resultat = $this->connexion->query($requete);

        if ($resultat) {
            return $resultat;
        } else {
            die("Erreur lors de l'exécution de la requête : " . $this->connexion->error);
        }
    }

    public function close() {
        $this->connexion->close();
    }
}
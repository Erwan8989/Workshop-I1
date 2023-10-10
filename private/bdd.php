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

    public function insert($table, $donnees) {
        $colonnes = implode(", ", array_keys($donnees));
        $valeurs = "'" . implode("', '", $donnees) . "'";

        $requete = "INSERT INTO $table ($colonnes) VALUES ($valeurs)";

        $resultat = $this->connexion->query($requete);

        if ($resultat) {
            return $this->connexion->insert_id;
        } else {
            die("Erreur lors de l'insertion : " . $this->connexion->error);
        }
    }
    
    public function close() {
        $this->connexion->close();
    }
}
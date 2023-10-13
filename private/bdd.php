<?php

class bdd
{
    private $serveur;
    private $utilisateur;
    private $motDePasse;
    private $baseDeDonnees;
    private $connexion;

    public function __construct()
    {
        $this->serveur = "localhost";
        $this->utilisateur = "id21394024_root";
        $this->motDePasse = "Knwoqpdk2002&";
        $this->baseDeDonnees = "id21394024_workshop";

        $this->connexion = new mysqli($this->serveur, $this->utilisateur, $this->motDePasse, $this->baseDeDonnees);

        if ($this->connexion->connect_error) {
            die("La connexion a échoué : " . $this->connexion->connect_error);
        }
    }

    public function getQuestions()
    {
        $reponse = $this->connexion->query("SELECT * FROM questions ORDER BY RAND() LIMIT 12;");

        if ($reponse->num_rows > 0) {
            $result = array();
            while ($row = $reponse->fetch_assoc()) {
                $result[] = $row;
            }
            return $result;
        } else {
            return array();
        }
    }

    public function insert($table, $donnees)
    {
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

    public function close()
    {
        $this->connexion->close();
    }
}
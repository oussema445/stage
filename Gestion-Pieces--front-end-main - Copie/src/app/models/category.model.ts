import { CategGeneral } from "./CategGeneral.model";

export class Category {
  id!: number; // Identifiant unique de la catégorie
  name!: string; // Nom de la catégorie
  isActive!: boolean; // Statut actif/inactif
  categGeneral?: CategGeneral;
      imageCategs?: any[]; // Liste des images associées (relation OneToMany)
}

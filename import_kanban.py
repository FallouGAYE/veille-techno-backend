
#!/usr/bin/env python3
"""Importer les tickets CSV dans GitHub Issues et GitHub Projects."""

import argparse
import csv
import json
import subprocess
import sys
from pathlib import Path


# Configuration du projet
OWNER = "FallouGAYE"
REPO = "FallouGAYE/veille-techno-backend"
PROJECT_NUMBER = "5"
CSV_FILE = "backlog-kanban-suivi.csv"


# Description et critères d'acceptation de chaque ticket
DETAILS = {
    "Initialisation du projet": (
        "Installer NestJS, configurer PostgreSQL et Prisma, "
        "préparer les variables d'environnement et démarrer l'API.",
        "Le serveur démarre correctement et la connexion "
        "à la base de données fonctionne.",
    ),

    "Mise en place de Swagger": (
        "Configurer Swagger/OpenAPI sur /api et "
        "la sécurité Bearer JWT.",
        "La documentation est accessible sur /api "
        "et permet de tester les routes.",
    ),

    "Inscription d'un utilisateur": (
        "POST /api/auth/register : enregistrer un utilisateur, "
        "hacher son mot de passe et ne jamais exposer celui-ci.",
        "201 : utilisateur créé sans mot de passe ; "
        "400 : données invalides ; "
        "409 : adresse e-mail déjà utilisée.",
    ),

    "Connexion d'un utilisateur": (
        "POST /api/auth/login : authentifier un utilisateur "
        "et renvoyer un JWT contenant sub et exp.",
        "200 : accessToken ; "
        "401 : identifiants inconnus ou incorrects.",
    ),

    "Consulter l'utilisateur connecté": (
        "GET /api/users/me : retourner le profil "
        "de l'utilisateur authentifié.",
        "200 : profil sans mot de passe ; "
        "401 : JWT absent, invalide ou expiré.",
    ),

    "Modifier un utilisateur et ses droits": (
        "PATCH /api/users/{id} : permettre la modification "
        "du profil. Seul un administrateur peut modifier "
        "les droits ou un autre utilisateur.",
        "200 : modification autorisée ; "
        "400 : données invalides ; "
        "403 : droits insuffisants ; "
        "404 : utilisateur introuvable.",
    ),

    "Lister mes listes": (
        "GET /api/lists : récupérer uniquement "
        "les listes de l'utilisateur connecté.",
        "200 : seules les listes du propriétaire sont retournées ; "
        "401 : utilisateur non authentifié.",
    ),

    "Créer une liste": (
        "POST /api/lists : créer une liste associée "
        "à l'utilisateur connecté.",
        "201 : liste créée avec le bon ownerId ; "
        "400 : titre absent ou vide ; "
        "401 : utilisateur non authentifié.",
    ),

    "Modifier une liste": (
        "PATCH /api/lists/{id} : modifier une liste "
        "dont l'utilisateur est propriétaire.",
        "200 : liste modifiée ; "
        "400 : données invalides ; "
        "403 : autre propriétaire ; "
        "404 : liste introuvable.",
    ),

    "Supprimer une liste": (
        "DELETE /api/lists/{id} : supprimer une liste "
        "appartenant à l'utilisateur et documenter "
        "le comportement des cartes associées.",
        "204 : liste supprimée ; "
        "401 : non authentifié ; "
        "403 : autre propriétaire ; "
        "404 : liste introuvable.",
    ),

    "Lister les cartes d'une liste": (
        "GET /api/lists/{listId}/cards : récupérer "
        "les cartes d'une liste possédée.",
        "200 : cartes retournées ; "
        "403 : autre propriétaire ; "
        "404 : liste introuvable.",
    ),

    "Créer une carte": (
        "POST /api/lists/{listId}/cards : créer "
        "une carte dans une liste possédée.",
        "201 : carte créée ; "
        "400 : titre absent ; "
        "403 : autre propriétaire ; "
        "404 : liste introuvable.",
    ),

    "Consulter une carte": (
        "GET /api/cards/{id} : consulter une carte "
        "appartenant à l'une de ses listes.",
        "200 : carte retournée ; "
        "403 : autre propriétaire ; "
        "404 : carte introuvable.",
    ),

    "Modifier ou déplacer une carte": (
        "PATCH /api/cards/{id} : modifier le titre, "
        "la description ou la position d'une carte. "
        "Le déplacement est autorisé uniquement "
        "vers une autre liste possédée.",
        "200 : carte modifiée ; "
        "400 : données invalides ; "
        "403 : liste source ou destination non possédée ; "
        "404 : carte ou liste cible introuvable.",
    ),

    "Supprimer une carte": (
        "DELETE /api/cards/{id} : supprimer une carte "
        "appartenant à l'une de ses listes.",
        "204 : carte supprimée ; "
        "401 : non authentifié ; "
        "403 : autre propriétaire ; "
        "404 : carte introuvable.",
    ),

    "Rapport de veille technologique": (
        "Rédiger le rapport de veille technologique : "
        "présenter NestJS, Symfony et Spring Boot, "
        "puis justifier le choix du framework.",
        "Rapport finalisé, sources citées "
        "et choix technologique argumenté.",
    ),

    "README détaillé du projet": (
        "Documenter l'installation, le lancement, "
        "les variables d'environnement, "
        "les décisions d'implémentation et Swagger.",
        "Un lecteur peut installer, lancer "
        "et tester l'API grâce au README.",
    ),

    "Mise en place des tests (fixtures)": (
        "Préparer des scénarios de test reproductibles, "
        "notamment avec deux utilisateurs distincts "
        "pour vérifier les erreurs de propriété 403.",
        "Tests automatisés réussis, "
        "erreurs applicables vérifiées "
        "et couverture conforme à la Definition of Done.",
    ),

    "Tests d'API automatisés avancés": (
        "Ajouter des tests d'API complémentaires "
        "au-delà des exigences obligatoires.",
        "Tests supplémentaires reproductibles "
        "et documentés.",
    ),

    "API GraphQL en complément du REST": (
        "Étudier et éventuellement développer "
        "une API GraphQL complémentaire.",
        "Bonus documenté et démontrable si réalisé.",
    ),

    "Étude de performance / optimisation": (
        "Mesurer les performances de l'API "
        "et documenter les optimisations possibles.",
        "Méthode, mesures et résultats documentés.",
    ),
}


def gh(*arguments):
    """Exécuter une commande GitHub CLI."""

    command = ["gh", *arguments]

    result = subprocess.run(
        command,
        text=True,
        capture_output=True,
    )

    if result.returncode != 0:
        message = (
            result.stderr.strip()
            or result.stdout.strip()
        )

        raise RuntimeError(message)

    return result.stdout.strip()


def gh_json(*arguments):
    """Exécuter une commande GitHub retournant du JSON."""

    output = gh(*arguments)

    return json.loads(output)


def get_option_id(field, value):
    """Trouver une option d'un champ Single select."""

    for option in field.get("options", []):
        if option["name"].casefold() == value.casefold():
            return option["id"]

    available = [
        option["name"]
        for option in field.get("options", [])
    ]

    raise RuntimeError(
        f"Option '{value}' introuvable "
        f"dans le champ '{field['name']}'. "
        f"Options disponibles : {available}"
    )


def get_project_fields():
    """Récupérer les champs du GitHub Project."""

    result = gh_json(
        "project",
        "field-list",
        PROJECT_NUMBER,
        "--owner",
        OWNER,
        "--format",
        "json",
    )

    return {
        field["name"].casefold(): field
        for field in result.get("fields", [])
    }


def get_existing_issues():
    """Récupérer les Issues existantes du dépôt."""

    issues = gh_json(
        "issue",
        "list",
        "--repo",
        REPO,
        "--state",
        "all",
        "--limit",
        "1000",
        "--json",
        "title,url",
    )

    return {
        issue["title"].casefold(): issue["url"]
        for issue in issues
    }


def get_existing_project_items():
    """Récupérer les tickets déjà présents dans le Project."""

    result = gh_json(
        "project",
        "item-list",
        PROJECT_NUMBER,
        "--owner",
        OWNER,
        "--limit",
        "1000",
        "--format",
        "json",
    )

    items_by_title = {}

    for item in result.get("items", []):
        title = item.get("title")

        if title:
            items_by_title[title.casefold()] = item["id"]

    return items_by_title


def get_project_id():
    """Récupérer l'identifiant GraphQL du Project."""

    result = gh_json(
        "project",
        "view",
        PROJECT_NUMBER,
        "--owner",
        OWNER,
        "--format",
        "json",
    )

    return result["id"]


def build_issue_body(row):
    """Construire la description complète d'une Issue."""

    title = row["Title"]

    description, acceptance = DETAILS[title]

    return (
        "## Objectif\n\n"
        f"{description}\n\n"

        "## Critères d'acceptation\n\n"
        f"{acceptance}\n\n"

        "## Informations du ticket\n\n"
        f"- Type : {row['Type de ticket']}\n"
        f"- Domaine : {row['Domaine']}\n"
        f"- Priorité : {row['Priorité']}\n"
        f"- Estimation : {row['Estimation']} points\n\n"

        "## Definition of Done\n\n"
        "- [ ] Fonctionnalité vérifiée\n"
        "- [ ] Tests nominaux et erreurs applicables\n"
        "- [ ] Swagger à jour\n"
        "- [ ] Couverture de tests conforme\n"
        "- [ ] Revue terminée\n\n"

        "Consulter `TICKETS.md` et "
        "`DEFINITION_OF_DONE.md` "
        "pour les exigences détaillées.\n"
    )


def update_project_fields(
    item_id,
    project_id,
    fields,
    row,
):
    """Renseigner les champs personnalisés d'un ticket."""

    field_names = [
        "Status",
        "Type de ticket",
        "Domaine",
        "Priorité",
        "Estimation",
    ]

    for name in field_names:
        field = fields[name.casefold()]

        command = [
            "project",
            "item-edit",
            "--id",
            item_id,
            "--project-id",
            project_id,
            "--field-id",
            field["id"],
        ]

        if name == "Estimation":
            command.extend([
                "--number",
                str(int(row[name])),
            ])

        else:
            option_id = get_option_id(
                field,
                row[name],
            )

            command.extend([
                "--single-select-option-id",
                option_id,
            ])

        gh(*command)


def main():
    parser = argparse.ArgumentParser(
        description="Importer les tickets Kanban dans GitHub."
    )

    parser.add_argument(
        "--csv",
        default=CSV_FILE,
        help="Chemin du fichier CSV",
    )

    parser.add_argument(
        "--apply",
        action="store_true",
        help="Créer réellement les Issues et les cartes",
    )

    args = parser.parse_args()

    csv_path = Path(args.csv)

    if not csv_path.is_file():
        sys.exit(
            f"CSV introuvable : {csv_path}\n"
            "Place le CSV dans le dossier du projet."
        )

    # Lecture du CSV
    with csv_path.open(
        encoding="utf-8-sig",
        newline="",
    ) as file:
        rows = list(csv.DictReader(file))

    if not rows:
        sys.exit("Le fichier CSV est vide.")

    # Vérification des champs du Project
    fields = get_project_fields()

    required_fields = [
        "Status",
        "Type de ticket",
        "Domaine",
        "Priorité",
        "Estimation",
    ]

    for name in required_fields:
        if name.casefold() not in fields:
            raise RuntimeError(
                f"Champ manquant dans GitHub Project : {name}"
            )

    # Vérification complète du CSV
    for row in rows:
        title = row["Title"]

        if title not in DETAILS:
            raise RuntimeError(
                f"Description absente pour : {title}"
            )

        for name in required_fields:
            if name == "Estimation":
                int(row[name])

            else:
                get_option_id(
                    fields[name.casefold()],
                    row[name],
                )

    print(
        f"Projet GitHub n° {PROJECT_NUMBER} : "
        f"{len(rows)} tickets vérifiés."
    )

    # Prévisualisation sans modification
    if not args.apply:
        print("\nPrévisualisation :\n")

        for row in rows:
            print(
                f"[{row['Status']}] "
                f"{row['Title']}"
            )

        print(
            "\nAucune modification effectuée.\n"
            "Pour importer : "
            "python3 import_kanban.py --apply"
        )

        return

    # Récupération de l'existant
    existing_issues = get_existing_issues()

    existing_items = get_existing_project_items()

    project_id = get_project_id()

    # Importation
    for index, row in enumerate(rows, start=1):
        title = row["Title"]

        print(
            f"\n[{index}/{len(rows)}] {title}",
            flush=True,
        )

        # Étape 1 : créer ou retrouver l'Issue
        issue_url = existing_issues.get(
            title.casefold()
        )

        if issue_url:
            print("Issue existante réutilisée.")

        else:
            issue_url = gh(
                "issue",
                "create",
                "--repo",
                REPO,
                "--title",
                title,
                "--body",
                build_issue_body(row),
            )

            existing_issues[
                title.casefold()
            ] = issue_url

            print("Issue créée.")

        # Étape 2 : retrouver ou ajouter la carte au Project
        item_id = existing_items.get(
            title.casefold()
        )

        if item_id:
            print("Carte existante réutilisée.")

        else:
            # Actualiser le Project avant de tenter l'ajout.
            # Cela évite l'erreur :
            # Content already exists in this project.
            existing_items = get_existing_project_items()

            item_id = existing_items.get(
                title.casefold()
            )

            if not item_id:
                result = gh_json(
                    "project",
                    "item-add",
                    PROJECT_NUMBER,
                    "--owner",
                    OWNER,
                    "--url",
                    issue_url,
                    "--format",
                    "json",
                )

                item_id = result["id"]

                existing_items[
                    title.casefold()
                ] = item_id

                print("Issue ajoutée au Project.")

            else:
                print("Carte retrouvée après actualisation.")

        # Étape 3 : renseigner tous les champs
        update_project_fields(
            item_id,
            project_id,
            fields,
            row,
        )

        print(
            "Statut, type, domaine, "
            "priorité et estimation renseignés."
        )

    print("\nImportation terminée avec succès !")

    print(
        f"Les {len(rows)} tickets ont été traités "
        f"dans le GitHub Project n° {PROJECT_NUMBER}."
    )


if __name__ == "__main__":
    try:
        main()

    except (
        RuntimeError,
        ValueError,
        KeyError,
    ) as error:
        sys.exit(f"\nErreur : {error}")

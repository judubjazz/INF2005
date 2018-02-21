var provincesEtTerritoires = [];
provincesEtTerritoires["ON"] = {
	nom : "Ontario",
	capitale : "Toronto",
	population : "13,448,494",
	premierMinistre : "???"
};
provincesEtTerritoires["QC"] = {
	nom : "Québec",
	capitale : "Québec",
	population : "8,164,361",
	premierMinistre : "Philippe Couillard"
};
provincesEtTerritoires["NS"] = {
	nom : "Nouvelle Écosse",
	capitale : "Halifax",
	population : "923,598",
	premierMinistre : "???"
};
provincesEtTerritoires["NB"] = {
	nom : "Nouveau Brunswick",
	capitale : "Fredericton",
	population : "747,101",
	premierMinistre : "???"
};
provincesEtTerritoires["MB"] = {
	nom : "Manitoba",
	capitale : "Winnipeg",
	population : "1,278,365",
	premierMinistre : "???"
};
provincesEtTerritoires["BC"] = {
	nom : "Colombie Britannique",
	capitale : "Victoria",
	population : "4,648,055",
	premierMinistre : "???"
};
provincesEtTerritoires["PE"] = {
	nom : "Ile du prince édouard",
	capitale : "Charlottetown",
	population : "142,907",
	premierMinistre : "???"
};
provincesEtTerritoires["SK"] = {
	nom : "Saskatchewan",
	capitale : "Regina",
	population : "1,098,352",
	premierMinistre : "???"
};
provincesEtTerritoires["AB"] = {
	nom : "Alberta",
	capitale : "Edmonton",
	population : "4,067,175",
	premierMinistre : "???"
};
provincesEtTerritoires["NL"] = {
	nom : "Terre-Neuve-et-Labrador",
	capitale : "St. John's",
	population : "519,716",
	premierMinistre : "???"
};
provincesEtTerritoires["NT"] = {
	nom : "Territoires du Nord-Ouest",
	capitale : "Yellowknife",
	population : "41,786",
	premierMinistre : "???"
};
provincesEtTerritoires["YT"] = {
	nom : "Yukon",
	capitale : "Whitehosre",
	population : "35,874",
	premierMinistre : "???"
};
provincesEtTerritoires["NU"] = {
	nom : "Nunavut",
	capitale : "Iqaluit",
	population : "35,944",
	premierMinistre : "???"
};


function remplirInfoProvince(codeProvince) {
	code = codeProvince.toUpperCase();
	if (provincesEtTerritoires[code]) {
		document.getElementById('province').value = provincesEtTerritoires[code].nom;
		document.getElementById('capitale').value = provincesEtTerritoires[code].capitale;
		document.getElementById('population').value = provincesEtTerritoires[code].population;
		document.getElementById('premierMinistre').value = provincesEtTerritoires[code].premierMinistre;
	} else {
		alert("Le code de la province (" + codeProvince + ") n'est pas un code valide.");
	}
}

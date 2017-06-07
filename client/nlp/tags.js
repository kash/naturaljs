'use strict';

import axios from "axios";

let _dictionary = [];
let processAllWords = function (callback) {
	let processTime = new Date().getTime();

	// Curated by Ken Loge of dreamsteep.com
	axios.get("/client/dictionary/words.txt").then(function (response) {
		_dictionary = response.data.split('\n');
		let processTime2 = new Date().getTime();
		callback((processTime2 - processTime) / 1000);
	});
}

let Tag = function (callback = null) {
	this.value = "";
	processAllWords(function (timeToLoad) {
		if (callback) callback(this, timeToLoad);
	}.bind(this))
}

Tag.prototype.updateValue = function (value) {
	this.value = value
}

Tag.prototype.isNumber = function () {
	return this.value.match(/^\d+$/) != null;
}

Tag.prototype.isVerb = function () {
	return this.value.match(/^[a-zA-Z]+(ing|ed)$/) != null;
}

Tag.prototype.capatalize = function () {
	if (this.value) return this.value[0].toUpperCase() + this.value.substr(1);
	return false;
}

Tag.prototype.isEnglish = function () {
	let low = 0;
	let high = _dictionary.length - 1;
	if (this.value.match(/^\w+$/)) {

		// Binary search through dictionary array
		while (low <= high) {
			let mid = parseInt((high + low) / 2);
			switch (this.value.localeCompare(_dictionary[mid])) {
				case -1:
					high = mid - 1;
					break;
				case 0:
					return true;
				case 1:
					low = mid + 1;
					break;
			}
		}
	}
	return false;
}

Tag.prototype.pluralize = function () {
	let irregular = {
		"addendum": "addenda",
		"aircraft": "aircraft",
		"alga": "algae",
		"alumna": "alumnae",
		"alumnus": "alumni",
		"amoeba": "amoebae",
		"analysis": "analyses",
		"antenna": "antennae",
		"antithesis": "antitheses",
		"apex": "apices",
		"appendix": "appendices",
		"axis": "axes",
		"bacillus": "bacilli",
		"bacterium": "bacteria",
		"barracks": "barracks",
		"basis": "bases",
		"beau": "beaux",
		"bison": "bison",
		"bureau": "bureaus",
		"cactus": "cacti",
		"calf": "calves",
		"child": "children",
		"château": "châteaus",
		"cherub": "cherubim",
		"codex": "codices",
		"concerto": "concerti",
		"corpus": "corpora",
		"crisis": "crises",
		"criterion": "criteria",
		"curriculum": "curricula",
		"datum": "data",
		"deer": "deer",
		"diagnosis": "diagnoses",
		"die": "dice",
		"dwarf": "dwarfs",
		"echo": "echoes",
		"elf": "elves",
		"elk": "elk",
		"ellipsis": "ellipses",
		"embargo": "embargoes",
		"emphasis": "emphases",
		"erratum": "errata",
		"faux pas": "faux pas",
		"fez": "fezes",
		"firmware": "firmware",
		"fish": "fish",
		"focus": "foci",
		"foot": "feet",
		"formula": "formulae",
		"fungus": "fungi",
		"gallows": "gallows",
		"genus": "genera",
		"goose": "geese",
		"graffito": "graffiti",
		"grouse": "grouse",
		"half": "halves",
		"hero": "heroes",
		"hoof": "hooves",
		"hypothesis": "hypotheses",
		"index": "indices",
		"knife": "knives",
		"larva": "larvae",
		"leaf": "leaves",
		"libretto": "libretti",
		"life": "lives",
		"loaf": "loaves",
		"locus": "loci",
		"louse": "lice",
		"man": "men",
		"matrix": "matrices",
		"means": "means",
		"medium": "media",
		"memorandum": "memoranda",
		"minutia": "minutiae",
		"moose": "moose",
		"mouse": "mice",
		"nebula": "nebulae",
		"neurosis": "neuroses",
		"news": "news",
		"nucleus": "nuclei",
		"oasis": "oases",
		"offspring": "offspring",
		"opus": "opera",
		"ovum": "ova",
		"ox": "oxen",
		"paralysis": "paralyses",
		"parenthesis": "parentheses",
		"phenomenon": "phenomena",
		"phylum": "phyla",
		"potato": "potatoes",
		"prognosis": "prognoses",
		"quiz": "quizzes",
		"radius": "radii",
		"referendum": "referenda",
		"salmon": "salmon",
		"scarf": "scarves",
		"self": "selves",
		"series": "series",
		"sheep": "sheep",
		"shelf": "shelves",
		"shrimp": "shrimp",
		"species": "species",
		"stimulus": "stimuli",
		"stratum": "strata",
		"swine": "swine",
		"syllabus": "syllabi",
		"symposium": "symposia",
		"synopsis": "synopses",
		"synthesis": "syntheses",
		"tableau": "tableaus",
		"that": "those",
		"thesis": "theses",
		"thief": "thieves",
		"tomato": "tomatoes",
		"tooth": "teeth",
		"trout": "trout",
		"tuna": "tuna",
		"vertebra": "vertebrae",
		"vertex": "vertices",
		"veto": "vetoes",
		"vita": "vitae",
		"vortex": "vortices",
		"wharf": "wharves",
		"wife": "wives",
		"wolf": "wolves",
		"woman": "women"
	}
	if (this.value.match(/^\w+$/)) {
		if (irregular[this.value] == null) {
			return this.value + "s";
		}
		return irregular[this.value];
	} else {
		return false;
	}
}

export default Tag;
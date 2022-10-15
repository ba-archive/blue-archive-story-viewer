/**
 * @namespace appliedFilter
 * @type {Object}
 * @property {String} searchString
 * @property {String} rarity
 * @property {String} club
 * @property {String} affiliation
 * @property {String} type
 * @property {String} armorType
 */

/**
 * @namespace studentNames
 * @type {Object}
 * @property {String} id
 * @property {Array} allNames
 */

/**
 * @namespace student
 * @type {Object}
 * @property {String} id
 * @property {Object} familyName
 * @property {String} familyName.cn
 * @property {String} familyName.jp
 * @property {String} familyName.en
 * @property {Object} name
 * @property {String} name.cn
 * @property {String} name.jp
 * @property {String} name.en
 * @property {Array} nickname
 * @property {String} club
 * @property {String} affiliation
 * @property {Number} rarity
 * @property {String} type
 * @property {String} armorType
 * @property {String} weapon
 * @property {Object} availability
 */

/**
 * @function filterStudents
 * @param {Object<appliedFilter>} appliedFilters
 * @param {Array<studentNames>} studentsNameList
 * @param {Array} studentsList
 */
import { distance } from "fastest-levenshtein";

function similarity(s1, s2) {
  return 1 - distance(s1, s2) / Math.max(s1.length, s2.length);
}

function isPossibleName(searchString, studentNamesList) {
  let found = false;
  const lowerCaseSearchString = searchString.toLowerCase();
  const lowercaseStudentNamesList = studentNamesList.map((name) =>
    name.toLowerCase()
  );
  lowercaseStudentNamesList.forEach((studentName) => {
    if (studentName) {
      if (
        similarity(lowerCaseSearchString, studentName) > 0.7 ||
        lowerCaseSearchString.includes(studentName) ||
        studentName.includes(lowerCaseSearchString) ||
        studentName.startsWith(lowerCaseSearchString) ||
        studentName.endsWith(lowerCaseSearchString) ||
        "" === lowerCaseSearchString
      ) {
        found = true;
      }
    }
  });
  return found;
}

function filterStudentsByProperty(property, criteria, initialList) {
  return initialList.filter((student) => criteria.includes(student[property]));
}

function filterStudents(appliedFilters, studentsNameList, studentsList) {
  if (
    "" === appliedFilters.searchString &&
    0 === appliedFilters.rarity.length &&
    0 === appliedFilters.club.length &&
    0 === appliedFilters.affiliation.length &&
    0 === appliedFilters.type.length &&
    0 === appliedFilters.armorType.length
  ) {
    return studentsList.map((student) => student.id);
  }
  let result = studentsList;
  if (appliedFilters.searchString) {
    const listFilteredByString = [];
    studentsList.forEach((student) => {
      if (
        isPossibleName(
          appliedFilters.searchString,
          studentsNameList.find((s) => s.id === student.id).allNames
        )
      ) {
        listFilteredByString.push(student);
      }
    });
    result = listFilteredByString;
  }
  if (0 !== appliedFilters.rarity.length) {
    result = filterStudentsByProperty("rarity", appliedFilters.rarity, result);
  }
  if (0 !== appliedFilters.club.length) {
    result = filterStudentsByProperty("club", appliedFilters.club, result);
  }
  if (0 !== appliedFilters.affiliation.length) {
    result = filterStudentsByProperty(
      "affiliation",
      appliedFilters.affiliation,
      result
    );
  }
  if (0 !== appliedFilters.type.length) {
    result = filterStudentsByProperty("type", appliedFilters.type, result);
  }
  if (0 !== appliedFilters.armorType.length) {
    result = filterStudentsByProperty(
      "armorType",
      appliedFilters.armorType,
      result
    );
  }

  return result.map((student) => student.id);
}

export { filterStudents };

export const titleToSlug = (title) => {
  title = title.replace(/^\s+|\s+$/g, ""); // trim
  title = title.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from =
    "àáảãạăằắẳẵặâấầẫẩậäâèéẻẽẹêềếểễệëêìíỉĩịïîòóỏõọôồốổỗộơờớởỡợöôùúủũụưừứửữựüûñç·/_,:;";
  var to =
    "aaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeeiiiiiiiooooooooooooooooooouuuuuuuuuuuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    title = title.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  title = title
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return title;
};

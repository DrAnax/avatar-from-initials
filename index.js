import uiAvatarSvg from "ui-avatar-svg";
import stc from "string-to-color";

// Generate initials from string
// Based on https://stackoverflow.com/a/33076482/180243
const getInitials = (str) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
  let initials = [...str.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
  ).toUpperCase();
  return initials;
};

// Generate white/black text color
// Based on https://stackoverflow.com/a/3943023/180243
const getTextColor = (hexColor) => {
  if (hexColor.indexOf("#") === 0) {
    hexColor = hexColor.slice(1);
  }

  // convert 3-digit hex to 6-digits.
  if (hexColor.length === 3) {
    hexColor =
      hexColor[0] +
      hexColor[0] +
      hexColor[1] +
      hexColor[1] +
      hexColor[2] +
      hexColor[2];
  }

  // Silently return white if color is invalid
  if (hexColor.length !== 6) {
    return "#fff";
  }

  // invert color components
  var r = parseInt(hexColor.slice(0, 2), 16),
    g = parseInt(hexColor.slice(2, 4), 16),
    b = parseInt(hexColor.slice(4, 6), 16);

  const colors = [r, g, b];
  colors.forEach((c, index, array) => {
    c /= 255.0;
    if (c <= 0.04045) {
      c /= 12.92;
    } else {
      c = Math.pow((c + 0.055) / 1.055, 2.4);
    }
    array[index] = c;
  });
  const L = 0.2126 * colors[0] + 0.7152 * colors[1] + 0.0722 * colors[2];
  if (L > 0.179) {
    return "#000";
  } else {
    return "#fff";
  }
};

const avatarFromInitials = (str, size = 64) => {
  const initials = getInitials(str);
  const bgColor = stc(initials);
  const fgColor = getTextColor(bgColor);
  const svg = new uiAvatarSvg()
    .text(initials)
    .size(size)
    .bgColor(bgColor)
    .textColor(fgColor)
    .generate();

  return svg;
};

export default avatarFromInitials;

$(document).ready(() => {
  let carousel = document.getElementById("carousel");
  let i = 1;
  carousel.style.backgroundImage = "url('../images/carousel" + i + ".jpg')";
  setInterval(() => {
    // i=(i==3)?1:i++;
    if (i == 3) {
      i = 1;
    } else {
      i++;
    }
    carousel.style.backgroundImage = "url('../images/carousel" + i + ".jpg')";
  }, 3000);
});

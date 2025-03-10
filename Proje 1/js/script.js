document.addEventListener("DOMContentLoaded", function() {
    const heartEmoji = document.getElementById("heart-emoji");
    const favoriteBtn = document.getElementById("favorite-btn");

    favoriteBtn.addEventListener("click", function() {
        if (heartEmoji.textContent === "❤️") {
            heartEmoji.textContent = "💖";
            alert("Favorilere eklendi!");
        } else {
            heartEmoji.textContent = "❤️";
            alert("Favorilerden çıkarıldı!");
        }
    });
});
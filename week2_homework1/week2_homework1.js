const user = {
    name: prompt("Adınız nedir?"),
    job: prompt("Mesleğiniz nedir?"),
    age: null
};

while (true) {
    let ageInput = prompt("Yaşınız kaç?");
    let age = parseInt(ageInput);

    if (!isNaN(age) && age > 0) {
        user.age = age;
        break;
    } else {
        alert("Lütfen geçerli bir yaş giriniz!");
    }
}

console.log("Kullanıcı Bilgileri:", user);

let cart = [];

while (true) {
    let product = prompt("Sepete eklemek istediğiniz ürünü yazın (Çıkmak için 'q', ürün çıkarmak için 'remove' yazın):");

    if (!product) continue;

    if (product.toLowerCase() === "q") {
        break;
    } else if (product.toLowerCase() === "remove") {
        let removeItem = prompt("Çıkarmak istediğiniz ürünün adını yazın:");
        if (removeItem) {
            cart = cart.filter(item => item.name.toLowerCase() !== removeItem.toLowerCase());
            console.log(`${removeItem} sepetten çıkarıldı.`);
        }
        continue;
    }

    let price;
    while (true) {
        let priceInput = prompt("Ürünün fiyatını girin:");
        price = parseFloat(priceInput);

        if (!isNaN(price) && price > 0) {
            break;
        } else {
            alert("Lütfen geçerli bir fiyat giriniz!");
        }
    }

    cart.push({ name: product, price });

    console.log(`${product} ürünü sepete eklendi. Fiyat: ${price} TL`);
}

const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

console.log("Sepetiniz:", cart);
console.log("Toplam Fiyat:", totalPrice, "TL");

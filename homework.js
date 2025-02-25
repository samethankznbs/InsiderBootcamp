const user = {
    name: prompt("Adınız nedir?"),
    age: parseInt(prompt("Yaşınız kaç?")),
    job: prompt("Mesleğiniz nedir?")
};

console.log("Kullanıcı Bilgileri:", user);

let cart = [];

while (true) {
    let product = prompt("Sepete eklemek istediğiniz ürünü yazın (Çıkmak için 'q', ürün çıkarmak için 'remove' yazın):");

    if (product.toLowerCase() === "q") {
        break;
    } else if (product.toLowerCase() === "remove") {
        let removeItem = prompt("Çıkarmak istediğiniz ürünün adını yazın:");
        cart = cart.filter(item => item.name.toLowerCase() !== removeItem.toLowerCase());
        console.log(`${removeItem} sepetten çıkarıldı.`);
        continue;
    }

    let price = parseFloat(prompt("Ürünün fiyatını girin:"));
    cart.push({ name: product, price });

    console.log(`${product} ürünü sepete eklendi. Fiyat: ${price} TL`);
}

const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

console.log("Sepetiniz:", cart);
console.log("Toplam Fiyat:", totalPrice, "TL");

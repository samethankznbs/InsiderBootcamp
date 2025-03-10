function applyHoverEffect() {
    $('.product-image').hover(
        function() {
            $(this).siblings('h3, p, .buttons').css({
                'opacity': '0',
                'transition': 'opacity 0.3s ease-in-out'
            });
            $(this).css({
                'transform': 'scale(1.5)',
                'transform-origin': 'center',
                'transition': 'transform 0.3s ease-in-out'
            });
        },
        function() {
            $(this).siblings('h3, p, .buttons').css({
                'opacity': '1',
                'transition': 'opacity 0.3s ease-in-out'
            });
            $(this).css({
                'transform': 'scale(1)',
                'transform-origin': 'center',
                'transition': 'transform 0.3s ease-in-out'
            });
        }
    );
}

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    $('.favorite').children(':not(span)').remove();
    
    if (favorites.length === 0) {
        $('.favorite').append('<p class="no-favorites">Favori ürününüz bulunmamaktadır.</p>');
        $('.no-favorites').css({
            'color': '#575e58',
            'font-size': '18px',
            'text-align': 'center',
            'margin-top': '20px',
            'font-weight': 'bold',
            'background': '#f5f5f5',
            'padding': '10px',
            'border-radius': '8px'
        });
    
    } else {
        favorites.forEach(product => {
            let clonedCard = $('.products .product-card:first').clone();
            clonedCard.attr('product-id', product.id);
            clonedCard.attr('product-title', product.title);
            clonedCard.attr('product-price', product.price);
            clonedCard.attr('product-image', product.image);
            clonedCard.attr('product-category', product.category);
            clonedCard.attr('product-description', product.description);
            clonedCard.attr('product-rating', product.rating);
            
            clonedCard.find('.product-title').text(product.title);
            clonedCard.find('.product-image').attr('src', product.image);
            clonedCard.find('.price').text(product.price + ' $');
            clonedCard.find('.rating').text('⭐ ' + product.rating);
            
            clonedCard.find('.add-to-favorite').replaceWith('<button class="remove-from-favorite">Favorilerden Çıkar</button>');
            $('.favorite').append(clonedCard);
        });
    }
}
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    $('.cart').children(':not(span)').remove();
    
    if (cart.length === 0) {
        $('.purchase').append('<p class="no-cart">Sepetinizde ürün bulunmamaktadır.</p>');
        $('.no-cart').css({
            'color': '#575e58',
            'font-size': '18px',
            'text-align': 'center',
            'margin-top': '20px',
            'font-weight': 'bold',
            'background': '#f5f5f5',
            'padding': '10px',
            'border-radius': '8px'
        });

    
    
    } else {
        cart.forEach(product => {
            let clonedCard = $('.products .product-card:first').clone();
            clonedCard.attr('product-id', product.id);
            clonedCard.attr('product-title', product.title);
            clonedCard.attr('product-price', product.price);
            clonedCard.attr('product-image', product.image);
            clonedCard.attr('product-category', product.category);
            clonedCard.attr('product-description', product.description);
            clonedCard.attr('product-rating', product.rating);
            
            clonedCard.find('.product-title').text(product.title);
            clonedCard.find('.product-image').attr('src', product.image);
            clonedCard.find('.price').text(product.price + ' $');
            clonedCard.find('.rating').text('⭐ ' + product.rating);
            
            clonedCard.find('.add-to-cart').replaceWith('<button class="remove-from-cart">Sepetten Çıkar</button>');
            $('.purchase').append(clonedCard);
        });
        calculateTotalPrice();
    }
}

function calculateTotalPrice() {
    let cards = $('.purchase').find('.product-card');
    let totalPrice = 0;
    for (let i = 0; i < cards.length; i++) {
        let price = parseFloat($(cards[i]).attr('product-price'));
        totalPrice += price;
    }
    let shippingCost = 5;
    let grandTotal = totalPrice + shippingCost;

    let cartSummaryHTML = `
        <div class="cart-summary">
            <h3>Ücret Detayları</h3>
            <p>Ürün Ücretleri: <span>${totalPrice.toFixed(2)} $</span></p>
            <p>Kargo Ücreti: <span>${shippingCost.toFixed(2)} $</span></p>
            <p><strong>Toplam Ücret: <span>${grandTotal.toFixed(2)} $</span></strong></p>
            <button class="checkout-btn">Ödeme Yap</button>
            <button class="clear-cart-btn">Sepeti Boşalt</button>
        </div>
    `;
    $('.purchase').append(cartSummaryHTML);

    $('.cart-summary').css({
        'background': '#f5f5f5',
        'padding': '15px',
        'border-radius': '8px',
        'margin-top': '20px',
        'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)'
    });

    $('.cart-summary p').css({
        'font-size': '16px',
        'color': '#333',
        'margin-bottom': '10px'
    });

    $('.cart-summary button').css({
        'background': '#575e58',
        'color': 'white',
        'border': 'none',
        'cursor': 'pointer',
        'padding': '10px 20px',
        'font-size': '16px',
        'margin': '5px',
        'border-radius': '5px',
        'transition': 'background 0.3s ease-in-out'
    });

    $('.cart-summary button:hover').css({
        'background': '#adb8ad'
    });
}
$(document).on('click', '.clear-cart-btn', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.length = 0; 
    localStorage.setItem('cart', JSON.stringify(cart));    
    $('.purchase .product-card').remove();
    $('.purchase .cart-summary').remove();
    loadCart();
    updateButtons();
});

$(document).on('click', '.checkout-btn', function() {
    alert('Ödeme işlemi başlatılıyor...');
});

function updateButtons() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    $('.product-card').each(function() {
        let productId = $(this).attr('product-id');

        let isInCart = cart.some(item => item.id === productId);
        let isInFavorite = favorites.some(item => item.id === productId);

        $(this).find('.buttons').empty();

        if (isInCart) {
            $(this).find('.buttons').append('<button class="remove-from-cart">Sepetten Çıkar</button>');
        } else {
            $(this).find('.buttons').append('<button class="add-to-cart">Sepete Ekle</button>');
        }

        if (isInFavorite) {
            $(this).find('.buttons').append('<button class="remove-from-favorite">Favorilerden Çıkar</button>');
        } else {
            $(this).find('.buttons').append('<button class="add-to-favorite">Favorilere Ekle</button>');
        }

        $(this).find('.buttons').append('<button class="show-detail">Detay Göster</button>');
    });
}

$(document).ready(function() {
    
    $.ajax({
        url: 'https://fakestoreapi.com/products?limit=19',
        dataType: 'json',
        success: function(data) {
            $('.slider').empty();
            $('.products').empty();

            data.forEach((product, index) => {
                let profileCard = `<div class="product-card" 
                    product-id="${product.id}" 
                    product-title="${product.title}" 
                    product-price="${product.price}" 
                    product-image="${product.image}"
                    product-category="${product.category}"
                    product-description="${product.description}"
                    product-rating="${product.rating.rate}"
                    product-rating-count="${product.rating.count}">
                    
                    <h3 class="product-title">${product.title}</h3>

                    <img src="${product.image}" alt="Product Picture" class="product-image">

                    <p class="rating">⭐ ${product.rating.rate} / ${product.rating.count}</p>

                    <p class="price">${product.price} $</p>
                    <div class="buttons"></div>
                </div>`;

                if (index < 19) {
                    $('.products').append(profileCard);
                    $('.slider').append(profileCard);
                    $('.slider .product-card:last').addClass('slider-card');
                } 
            });
            

            $('.slider').slick({
                slidesToShow: 3,  
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: true,
                prevArrow: '<button class="slick-prev">❮</button>',
                nextArrow: '<button class="slick-next">❯</button>',
            });
            applyHoverEffect();

           
            updateButtons();
            loadFavorites();
            loadCart();

            
        },
        error: function(xhr, status, error) {
            console.error("API Hatası:", error);
        }
    });

    $(document).on('mouseenter', '.product-image', function() {
        applyHoverEffect();
    });
    $(document).on('click', '.add-to-favorite', function() {
        let parentCard = $(this).closest('.product-card');
        let productId = parentCard.attr('product-id');
        let productTitle = parentCard.attr('product-title');
        let productPrice = parentCard.attr('product-price');
        let productImage = parentCard.attr('product-image');
        let productCategory = parentCard.attr('product-category');
        let productDescription = parentCard.attr('product-description');
        let productRating = parentCard.attr('product-rating');
    
        let product = {
            id: productId,
            title: productTitle,
            price: productPrice,
            image: productImage,
            category: productCategory,
            description: productDescription,
            rating: productRating
        };
    
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.some(item => item.id === productId)) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
    
            let clonedCard;
            if ($('.products .product-card[product-id="' + productId + '"]').length > 0) {
                
                clonedCard = $('.products .product-card[product-id="' + productId + '"]').clone();
            } else {
                clonedCard = $('<div class="product-card"></div>');
                clonedCard.attr('product-id', productId);
                clonedCard.attr('product-title', productTitle);
                clonedCard.attr('product-price', productPrice);
                clonedCard.attr('product-image', productImage);
                clonedCard.attr('product-category', productCategory);
                clonedCard.attr('product-description', productDescription);
                clonedCard.attr('product-rating', productRating);
                
                clonedCard.append(`<h3 class="product-title">${productTitle}</h3>`);
                clonedCard.append(`<img class="product-image" src="${productImage}" alt="${productTitle}">`);
                clonedCard.append(`<p class="price">${productPrice} $</p>`);
                clonedCard.append(`<p class="rating">⭐ ${productRating}</p>`);
                clonedCard.append('<div class="buttons"></div>');
            }
    
            clonedCard.find('.buttons').empty();
            clonedCard.find('.buttons').append('<button class="remove-from-favorite">Favorilerden Çıkar</button>');
            clonedCard.find('.buttons').append('<button class="add-to-cart">Sepete Ekle</button>');
            clonedCard.find('.buttons').append('<button class="show-detail">Detay Göster</button>');
            
            $('.favorite').children('p').remove();
    
            clonedCard.css({
                'position': 'relative',
                'right': '-100%',
                'opacity': '1'
            });
    
            $('.favorite').append(clonedCard);
    
            clonedCard.animate({
                'right': '0',
                'opacity': '1'
            }, 500);
        }
    
        updateButtons();
    });
    
    $(document).on('click', '.remove-from-favorite', function() {
        let parentCard = $(this).closest('.product-card');
        let productId = parentCard.attr('product-id');
    
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(item => item.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    
        $('.favorite .product-card[product-id="'+ productId +'"]').animate({
            'right': '-100%',
            'opacity': '0'
        }, 500, function() {
            $(this).remove();
    
            if (favorites.length === 0) {
                $('.favorite').append('<p class="no-favorites">Favori ürününüz bulunmamaktadır.</p>');
                $('.no-favorites').css({
                    'color': '#575e58',
                    'font-size': '18px',
                    'text-align': 'center',
                    'margin-top': '20px',
                    'font-weight': 'bold',
                    'background': '#f5f5f5',
                    'padding': '10px',
                    'border-radius': '8px'
                });
            }
    
            updateButtons();
        });
    });
    

    $(document).on('click', '.add-to-cart', function() {
        let parentCard = $(this).closest('.product-card');
        let productId = parentCard.attr('product-id');
        let productTitle = parentCard.attr('product-title');
        let productPrice = parentCard.attr('product-price');
        let productImage = parentCard.attr('product-image');
        let productCategory = parentCard.attr('product-category');
        let productDescription = parentCard.attr('product-description');
        let productRating = parentCard.attr('product-rating');
    
        let product = {
            id: productId,
            title: productTitle,
            price: productPrice,
            image: productImage,
            category: productCategory,
            description: productDescription,
            rating: productRating
        };
    
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        if (!cart.some(item => item.id === productId)) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
    
            let clonedCard;
            if ($('.products .product-card[product-id="' + productId + '"]').length > 0) {
               
                clonedCard = $('.products .product-card[product-id="' + productId + '"]').clone();
            } else {
                
                clonedCard = $('<div class="product-card"></div>');
                clonedCard.attr('product-id', productId);
                clonedCard.attr('product-title', productTitle);
                clonedCard.attr('product-price', productPrice);
                clonedCard.attr('product-image', productImage);
                clonedCard.attr('product-category', productCategory);
                clonedCard.attr('product-description', productDescription);
                clonedCard.attr('product-rating', productRating);
                
                clonedCard.append(`<h3 class="product-title">${productTitle}</h3>`);
                clonedCard.append(`<img class="product-image" src="${productImage}" alt="${productTitle}">`);
                clonedCard.append(`<p class="price">${productPrice} $</p>`);
                clonedCard.append(`<p class="rating">⭐ ${productRating}</p>`);
                clonedCard.append('<div class="buttons"></div>');
            }
    
            clonedCard.find('.buttons').empty();
            clonedCard.find('.buttons').append('<button class="remove-from-cart">Sepetten Çıkar</button>');
            clonedCard.find('.buttons').append('<button class="add-to-favorite">Favorilere Ekle</button>');
            clonedCard.find('.buttons').append('<button class="show-detail">Detay Göster</button>');
            
            $('.purchase').children('p').remove();
    
            clonedCard.css({
                'position': 'relative',
                'left': '-100%',
                'opacity': '1'
            });
    
            $('.purchase').append(clonedCard);
    
            clonedCard.animate({
                'left': '0',
                'opacity': '1'
            }, 500);
    
            $('.purchase .cart-summary').remove();
            calculateTotalPrice();
        }
    
        updateButtons();
    });

    $(document).on('click', '.remove-from-cart', function() {
        let parentCard = $(this).closest('.product-card');
        let productId = parentCard.attr('product-id');
    
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    
        $('.purchase .product-card[product-id="'+ productId +'"]').animate({
            'left': '-100%',
            'opacity': '0'
        }, 500, function() {
            $(this).remove();
            $('.purchase .cart-summary').remove();
            calculateTotalPrice();
    
            if (cart.length === 0) {
                $('.purchase .cart-summary').remove();
                $('.purchase').append('<p class="no-cart">Sepetinizde Ürün Bulunmamaktadır.</p>');
                $('.no-cart').css({
                    'color': '#575e58',
                    'font-size': '18px',
                    'text-align': 'center',
                    'margin-top': '20px',
                    'font-weight': 'bold',
                    'background': '#f5f5f5',
                    'padding': '10px',
                    'border-radius': '8px'
                });
            }
    
            updateButtons();
        });
    });
    

    $(document).on('click', '.show-detail', function() {
        let parentCard = $(this).closest('.product-card');

        $('#modal-title').text(parentCard.attr('product-title'));
        $('#modal-image').attr('src', parentCard.attr('product-image'));
        $('#modal-description').text(parentCard.attr('product-description'));
        $('#modal-category').text(parentCard.attr('product-category'));
        $('#modal-price').text(parentCard.attr('product-price'));
        $('#modal-rating').text(`⭐${parentCard.attr('product-rating')} / ${parentCard.attr('product-rating-count')}`);

        $('#product-modal').fadeIn();
    });

    $(document).on('click', '.close-modal', function() {
        $('#product-modal').fadeOut();
    });

    $(window).on('click', function(event) {
        if ($(event.target).is('#product-modal')) {
            $('#product-modal').fadeOut();
        }
    });

    function debounce(func, delay) {
        let timer;
        return function() {
            let context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(context, args), delay);
        };
    }
    
    $('.search-button').on('click', debounce(function() {
        $(this).effect("shake", { times: 3 }, 300);
        let searchId = $('#search-id').val().trim();
    
        if (searchId === '') {
            alert("Lütfen bir ID girin!");
            return;
        }
    
        $('.products').empty(); 
        $('.not-found').remove();
    
        $.ajax({
            url: `https://fakestoreapi.com/products/${searchId}`,
            method: "GET",
            dataType: "json",
            success: function(product) {
                let productCard = `
                    <div class="product-card"
                        product-id="${product.id}"
                        product-title="${product.title}"
                        product-price="${product.price}"
                        product-image="${product.image}"
                        product-category="${product.category}"
                        product-description="${product.description}"
                        product-rating="${product.rating.rate}">
                        
                        <h3 class="product-title">${product.title}</h3>
                        <img src="${product.image}" alt="Product Picture" class="product-image">
                        <p class="rating">⭐ ${product.rating.rate} / ${product.rating.count}</p>
                        <p class="price">${product.price} $</p>
                        <div class="buttons">
                            <button class="add-to-cart">Sepete Ekle</button>
                            <button class="add-to-favorite">Favorilere Ekle</button>
                            <button class="show-detail">Detay Göster</button>
                        </div>
                    </div>
                `;
    
                $('.products').append(productCard);
                $('.products .product-card img').css({
                    'width': '100%',
                    'height': '250px',
                    'object-fit': 'contain',
                    'border-radius': '8px'
                });
            },
            error: function() {
                $('.products').append('<p class="not-found">Aradığınız ürün bulunmamaktadır.</p>');
                $('.not-found').css({
                    'color': '#575e58',
                    'width': '100%',
                    'font-size': '18px',
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'background': '#f5f5f5',
                    'padding': '10px',
                    'border-radius': '8px',
                    'display': 'block'
                });
            }
        });
    }, 500));  
    
    $('#reset-search').on('click', function() {
        $('#search-id').val('');
        location.reload(); 
    });

    $('#sort-options').on('change', function() {
        if ($('.products .product-card').length === 0)
            return;
            
        let sortBy = $(this).val();
        let products = $('.products .product-card').toArray();

        products.sort(function(a, b) {
            let valueA, valueB;
            if (sortBy.includes('title')) {
                valueA = $(a).attr('product-title').toLowerCase();
                valueB = $(b).attr('product-title').toLowerCase();
            } else if (sortBy.includes('price')) {
                valueA = parseFloat($(a).attr('product-price'));
                valueB = parseFloat($(b).attr('product-price'));
            } else if (sortBy.includes('rating')) {
                valueA = parseFloat($(a).attr('product-rating'));
                valueB = parseFloat($(b).attr('product-rating'));
            }

            if (sortBy.endsWith('asc')) {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });

        $('.products').empty().append(products);
    });
});

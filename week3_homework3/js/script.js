$(document).ready(function() {
    $('#loadProfiles').click(function() {
        $(this).effect("shake");
        $.ajax({
            url: 'https://randomuser.me/api/?results=10', 
            dataType: 'json',
            success: function(data) {
                $('#profilesContainer').empty(); 
                $('#sliderContainer').empty(); 

                data.results.forEach((user, index) => {
                    let profileCard = `<div class="profile-card" 
                        data-name="${user.name.first} ${user.name.last}" 
                        data-email="${user.email}" 
                        data-phone="${user.phone}" 
                        data-location="${user.location.city}, ${user.location.country}" 
                        data-dob="${new Date(user.dob.date).toLocaleDateString()}" 
                        data-picture="${user.picture.large}">
                        
                        <img src="${user.picture.large}" alt="Profile Picture">
                        <h3>${user.name.first} ${user.name.last}</h3>
                        <p>Email: ${user.email}</p>
                        <p>Country: ${user.location.country}</p>
                    </div>`;

                    if (index < 5) {
                        let $card = $(profileCard).hide().appendTo('#profilesContainer');
                        $card.slideDown(1000);
                    } else {
                        let sliderItem = `<div class="slider-item">${profileCard}</div>`;
                        $('#sliderContainer').append(sliderItem);
                    }
                });

                $('#sliderContainer').slick({
                    slidesToShow: 1,  
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: true,
                    prevArrow: '<button class="slick-prev">❮</button>',
                    nextArrow: '<button class="slick-next">❯</button>',
                    centerMode: true, 
                });
            }
        });
    });

    $(document).on('click', '.profile-card', function() {
        let name = $(this).data('name');
        let email = $(this).data('email');
        let phone = $(this).data('phone');
        let location = $(this).data('location');
        let dob = $(this).data('dob');
        let picture = $(this).data('picture');

        let modalContent = `
            <div class="modal-content">
                <img src="${picture}" alt="Profile Picture" style="width: 100px; border-radius: 50%;">
                <h2>${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Date of Birth:</strong> ${dob}</p>
            </div>
        `;
        $.fancybox.open({
            src: modalContent,
            type: 'html'
        });
    });
});

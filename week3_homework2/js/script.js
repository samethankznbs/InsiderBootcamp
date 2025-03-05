$(document).ready(function () {
    let start = 0;
    const limit = 10;
    const postList = $('#postList');
    const loading = $('#loading');
    const loadingOverlay = $('#loadingOverlay');
    let isLoading = false;

    function loadPosts() {
        if (isLoading) return;
        isLoading = true;
        loadingOverlay.show();
        loading.show();

        setTimeout(() => { 
            $.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
                .done(function (data) {
                    data.forEach(post => {
                        postList.append(`<li><strong>${post.title}</strong><p>${post.body}</p></li>`);
                    });
                    start += limit;
                })
                .fail(function () {
                    alert('Postlar yüklenirken bir hata oluştu.');
                })
                .always(function () {
                    loading.hide();
                    loadingOverlay.hide();
                    isLoading = false;
                });
        }, 1000); 
    }

    loadPosts();

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            loadPosts();
        }
    });
});

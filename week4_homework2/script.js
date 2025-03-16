const appendLocation = ".ins-container-users"; 
const userContainer = document.querySelector(appendLocation);
if (!userContainer) {
    console.error(`Hata: '${appendLocation}' elementi bulunamadı. HTML içinde mevcut mu kontrol edin.`);
} else {
    console.log("Kullanıcılar buraya eklenecek: ", userContainer);
}

const apiUrl = "https://jsonplaceholder.typicode.com/users";
const storageKey = "usersData";
const sessionFlag = "sessionUsed";
const expireTime = 24 * 60 * 60 * 1000;

const style = document.createElement('style');
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
        background-color: #f4f4f4;
    }
    h1 {
        color: #333;
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        display: block;
    }
    .ins-api-users {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
    }
    .user-card {
        border: 1px solid #ddd;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #fff;
        width: 100%;
        text-align: center;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    button {
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;
        transition: 0.3s;
    }
    button:hover {
        background-color: darkred;
    }
`;
document.head.appendChild(style);

async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("API'den veri alınamadı");
        }
        const users = await response.json();
        const limitedUsers = users.slice(0, 10); 
        const dataWithTimestamp = { data: limitedUsers, timestamp: Date.now() };
        localStorage.setItem(storageKey, JSON.stringify(dataWithTimestamp)); 
        displayUsers(limitedUsers);
    } catch (error) {
        console.error("Veri çekme hatası:", error);
        userContainer.innerHTML = "<p style='color:red;'>Veri yüklenirken hata oluştu.</p>";
    }
}

function displayUsers(users) {
    if (!Array.isArray(users)) {
        console.error("Hata: Kullanıcı verisi beklenen formatta değil.", users);
        return;
    }
    userContainer.innerHTML = "";
    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");

        userCard.innerHTML = `
            <p><strong>Ad:</strong> ${user.name}</p>
            <p><strong>E-posta:</strong> ${user.email}</p>
            <p><strong>Adres:</strong> ${user.address.street}, ${user.address.city}</p>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Sil";
        deleteButton.onclick = () => deleteUser(user.id);

        userCard.appendChild(deleteButton);
        userContainer.appendChild(userCard);
    });

    if (userContainer.children.length === 0 && !sessionStorage.getItem(sessionFlag)) {
        showSessionStorageButton();
    }
}

function getUsersFromStorage() {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            if (Date.now() - parsedData.timestamp < expireTime) {
                return parsedData.data;
            }
        } catch (error) {
            console.error("LocalStorage verisi bozulmuş veya hatalı:", error);
            return null;
        }
    }
    return null;
}

function deleteUser(userId) {
    let users = getUsersFromStorage();
    if (!users) {
        console.warn("Silme işlemi sırasında kullanıcı verisi bulunamadı, tekrar yükleniyor.");
        fetchUsers(); 
        return;
    }
    users = users.filter(user => user.id !== userId);
    localStorage.setItem(storageKey, JSON.stringify({ data: users, timestamp: Date.now() }));
    displayUsers(users);
}

function showSessionStorageButton() {
    if (document.querySelector("#reload-button")) return;

    const sessionButton = document.createElement("button");
    sessionButton.textContent = "Kullanıcıları Yeniden Yükle";
    sessionButton.id = "reload-button"; 
    sessionButton.onclick = () => {
        if (!sessionStorage.getItem(sessionFlag)) {
            sessionStorage.setItem(sessionFlag, "true");
            alert("SessionStorage ayarlandı. Buton artık kullanılamaz.");
            sessionButton.disabled = true;
            fetchUsers(); 
            sessionButton.remove();
        }
    };
    document.body.appendChild(sessionButton);

    if (sessionStorage.getItem(sessionFlag)) {
        sessionButton.disabled = true;
    }
}

const observer = new MutationObserver(() => {
    if (userContainer.children.length === 0 && !sessionStorage.getItem(sessionFlag)) {
        showSessionStorageButton(); 
    }
});

observer.observe(userContainer, { childList: true });

const storedUsers = getUsersFromStorage();
if (storedUsers && storedUsers.length > 0) {
    displayUsers(storedUsers);
} else {
    fetchUsers(); 
}

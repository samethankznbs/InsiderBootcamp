document.addEventListener("DOMContentLoaded", () => {
    const userContainer = document.querySelector(".ins-api-users");
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    const storageKey = "usersData";

    const style = document.createElement("style");
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
            localStorage.setItem(storageKey, JSON.stringify({ data: users, timestamp: Date.now() }));
            displayUsers(users);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
            userContainer.innerHTML = "<p style='color:red;'>Veri yüklenirken hata oluştu.</p>";
        }
    }

    function displayUsers(users) {
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
    }

    function getUsersFromStorage() {
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                const oneDay = 24 * 60 * 60 * 1000;
                if (Date.now() - parsedData.timestamp < oneDay) {
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
            fetchUsers(); 
            return;
        }
        users = users.filter(user => user.id !== userId);
        localStorage.setItem(storageKey, JSON.stringify({ data: users, timestamp: Date.now() }));
        displayUsers(users);
    }

    const storedUsers = getUsersFromStorage();
    if (storedUsers && storedUsers.length > 0) {
        displayUsers(storedUsers);
    } else {
        fetchUsers(); 
    }
});
document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    const buttons = document.querySelector(".buttons"),
        output = document.querySelector(".output"),
        strong = document.getElementById("strong"),
        section = document.querySelector(".section");


    const userData = function(){
        return JSON.parse(localStorage.getItem("userData")) || localStorage.setItem("userData", JSON.stringify([]));
    };
    userData();

    const getTime = () => {
        let dateUserReg = new Date(),
            time = dateUserReg.toLocaleTimeString("ru"),
            date = dateUserReg.toLocaleDateString("ru");
        const dateNow = [date, time].join("г., ");
        return dateNow;
    };

    const regUser = (user, password, login) => {
        const time = getTime();
        while (user, login, password === ""){
            user = prompt("You did not specify the user's name, username or password").split(" ");
            login = prompt("Login");
            password = prompt("Password");
        }
        if (password, login == null) { return };
        return {
            time,
            login,
            password,
            name : user[0],
            lastName : user[1]
        };
    };

    const registrationUser = () => {
        try {
            const user = prompt("Enter the user's First and Last name separated by a space").split(" "),
                login = prompt("Enter your Username"),
                password = prompt("Enter the Password");

            const data = userData(),
            userUs = regUser(user, password, login);
            data.push(userUs);
            localStorage.setItem("userData", JSON.stringify(data));
            render();
        } catch {
            return;
        }
    };

    const render = () => {
        output.innerHTML = "";
        const dataUserStorage = JSON.parse(localStorage.getItem("userData"));

        dataUserStorage.forEach((item, i) => {
            if (item.lastName === undefined || item.lastName === "") {
                item.lastName = "unspecified";
            }
            const newUser = `<li data-id=${i}>Name: ${item.name}, Surname: ${item.lastName}, Registered: ${item.time} <button data-id="${i}" id="btn-close">Delete</button></li> `
            output.insertAdjacentHTML("beforeend", newUser);
        });

    };
    render();

    const closeLi = (elem) => {
        let data = userData();
        data.splice(elem, 1);
        localStorage.setItem("userData", JSON.stringify(data));
        render();
    };

    const userLogIn = (log, pass) => {
        while (log, pass === "") {
            log = prompt("Enter logIn");
            pass = prompt("Enter password");
        }
        return { log, pass};
    };

    const loginUse = () => {
        const login = prompt("Enter logIn"),
            password = prompt("Enter password");
        if (login, password == null) { return }
        const data = userData();
        const logIn = userLogIn(login, password);
        data.forEach(elem => {
            if (logIn.log === elem.login && logIn.pass === elem.password) {
                strong.textContent = elem.name;
            } else {
                alert("Incorrect login or password")
            }
        });
    };

    section.addEventListener("click", event => {
        let target = event.target;
        if (target.matches("#btn-close")) {
            closeLi(+target.closest("li").dataset.id);
        }
    });

    buttons.addEventListener("click", event => {
        let target = event.target;
        if (target.matches("#registration")) {
            registrationUser();
        } else if (target.matches("#login")) {
            loginUse();
        }
    });
});

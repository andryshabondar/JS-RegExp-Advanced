const getS = selector => document.querySelector(selector);

let loginExp = /^[a-zA-Z]{4,16}$/;
let passExp = /^[a-zA-Z0-9 \_\-\.]{4,16}$/;
let emailExp = /^[a-zA-Z0-9 \-\.]+@[a-zA-Z]+\.[a-zA-Z]+$/

function checkAddUser(){
    let testLogin = loginExp.test(getS('.login').value);
    let testPass = passExp.test(getS('.password').value);
    let testEmail = emailExp.test(getS('.email').value);
    if (testLogin == false){
        alert(`Помилка Login. Логін може бути слово англійською з великої або маленької букви від 4 до 16 символів.`)
    }
    else if (testPass == false){
        alert(`Помилка Password. В паролі можуть бути букви, цифри, символ нижнього підкреслювання(_), тире(-) та символ крапки(.) від 4 до 16 символів`)
    }
    else if(testEmail == false){
        alert(`Помилка Email. Усі букви повинні бути англійською. Загальні вимоги наступні(будь-яка кількість букв, цифр, тире і крапок@будьяка кількість букв.( net.ua, org.ua, gmail.com. і т.д.)). `)
    }
    else if(testLogin && testPass && testEmail){
        addUser()
    }
}

let masUser = [];

function addUser() {
    let objUser = {
        login: getS('.login').value,
        password: getS('.password').value,
        email: getS('.email').value
    }

    masUser.push(objUser);
    getS('.login').value = '';
    getS('.password').value = '';
    getS('.email').value = '';

    render()
}

function render() {
    getS('.tbody').innerHTML = "";
    for (let i = 0; i <= masUser.length; i++) {
        getS('.tbody').insertAdjacentHTML('beforeend',
            `<tr>
            <td>${i + 1}</td>
            <td>${masUser[i].login}</td>
            <td>${masUser[i].password}</td>
            <td>${masUser[i].email}</td>
            <td><input class="edit_button" onclick="editUser(${i})" type="button" value="Edit"></td>
            <td><input class="delete_button" onclick="deleteUser(${i})" type="button" value="Delete"></td>
        </tr>`
        )
    }
}

function deleteUser(i) {
    event.target.parentElement.parentElement.remove();
    masUser.splice(i, 1);
    render()
}


let userIndex = 0;

function editUser(i) {
    getS('.login').value = masUser[i].login;
    getS('.password').value = masUser[i].password;
    getS('.email').value = masUser[i].email;

    userIndex = i;

    getS('.addButton').style.display = 'none';
    getS('.editUser').style.display = 'block';
}

function saveEditUser() {
    let objUser2 = {
        login: getS('.login').value,
        password: getS('.password').value,
        email: getS('.email').value
    }

    masUser[userIndex] = objUser2;

    getS('.login').value = '';
    getS('.password').value = '';
    getS('.email').value = '';

    getS('.addButton').style.display = 'block';
    getS('.editUser').style.display = 'none';

    render()
}


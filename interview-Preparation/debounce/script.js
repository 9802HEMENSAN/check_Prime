

const users = document.querySelector('.user-list');
const userName = document.querySelector("#search"); 

const userArr = [];

const getUserData = async() => {
    try {

        const res = await fetch('https://api.github.com/users');
        const data = await res.json();
        // console.log(data);

        if(data){
            users.innerHTML = ""
        }

        data.map((user) => {
            const li = document.createElement('li');

            userArr.push(li);

            li.insertAdjacentHTML('afterbegin', 
                `
                <div class="user-data">
                    <img src=${user.avatar_url} alt=${user.avatar_url} srcset="">
                    <div>
                        <p>${user.login}</p>
                        <a href=${user.html_url} target="_blank">${user.html_url}</a>
                    </div>
                 </div>
                `
            )

            users.appendChild(li);

        })
        
    } catch (error) {
        console.log(error);
    }
}

// userName.addEventListener('input', (e) => {
//     const val = e.target.value;
//     console.log(val);

//     userArr.filter((curElem) => {
//        curElem.innerText.toLowerCase().includes(val.toLowerCase()) ?
//         curElem.classList.remove('hide') :
//         curElem.classList.add('hide')
//     })
// })

const getUser=(query)=>{
    console.log(query)
    userArr.filter((curElem) => {
        console.log(curElem)
        curElem.innerText.toLowerCase().includes(query.toLowerCase()) ?
         curElem.classList.remove('hide') :
         curElem.classList.add('hide')
     })
}

const debounce=(func,timeout)=>{
    let timer;

    return (...args)=>{
        clearTimeout(timer);
        timer=setTimeout(()=>{
               func.apply(this,args)
        },timeout)
    }
}


const debouncedgetData= debounce(getUser,500)

userName.addEventListener("keyup", (event)=>{
    debouncedgetData(event.target.value);
})
getUserData();
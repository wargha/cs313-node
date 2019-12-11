function loadBucket() {
    var userId = document.getElementById('get-id').innerText;
    var response = fetch(`/getList`, {
        method: 'POST',
        body: JSON.stringify({
            id: userId
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    response.then(async res => {
        var list = await res.json();
        document.getElementById('fill-list').innerHTML = '';
        if (list.length > 0) {            
            list.forEach((item, index) => {
                document.getElementById('fill-list').insertAdjacentHTML('beforeend',
                    `
                    <div class="container row single-item">
                    <h4>${index + 1}</h4>
                    <p>${item.bucket_name}</p>
                    <div onclick="removeItem(${item.id})" class="button remove">
                      <span> Remove </span>
                    </div>
                  </div>
                `)
            })

        }
    })
}

          // <div onclick="editItem(${item.id}, this)" class="button edit">
                    //   <span> Edit </span>
                    // </div>
function removeItem(id) { 
    console.log(id);

    var response = fetch(`/removeItem`, {
        method: 'POST',
        body: JSON.stringify({
            id: id
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    response.then(async res => {
        var list = await res.json();
        loadBucket();
    });
}

function addItem() { 
    var content = document.getElementById('item-to-add').value;
    var userId = document.getElementById('get-id').innerText;
    var response = fetch(`/addItem`, {
        method: 'POST',
        body: JSON.stringify({
            content: content,
            id: userId
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    
    response.then(async (res) => { 
      loadBucket();
      document.getElementById('item-to-add').value = '';
    })

}

// function editItem(itemId, el) { 
//    el.removeChild(el)
// }

// function sendUpdateItem(itemid) { 
//     console.log('here');
//     var response = fetch(`/editItem`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             id: itemId
//         }),
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//     });
    
//     response.then(async (res) => { 
//       loadBucket();
//     //   document.getElementById('item-to-add').value = '';
//     })
// }
    function home() {
        $("#createFormProduct").hide()
        $("#createFormCategory").hide()
        $("#searchCategory").hide()
    }

    window.onload = home
    //Category
    function displayCategoryList(page){
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            type: "GET",
            url: "http://localhost:8080/categories?page=" + page + "&size=3",
            success(data){

                displayCategory(data.content)
                displayCategoryPage(data)
                if (data.pageable.pageNumber === 0) {
                    document.getElementById("backup").hidden = true
                }
                //điều kiện bỏ nút next
                if (data.pageable.pageNumber + 1 === data.totalPages) {
                    document.getElementById("next").hidden = true
                }
                $("#showCategory").show()
                $("#product").hide()
                $("#category").show()
                $("#createFormCategory").show()
            }
        })
    }
    function displayCategory(data){
        let context = `<div class="container">
                            <h2 style="text-align: center">List Category</h2>
                            <table class="table table-striped-columns">
                            <thead>
                                <tr>
                                  <th>STT</th>                                                      
                                  <th>Name</th>                                                    
                                  <th colspan="2" style="text-align: center">Action</th>
                                </tr>
                            </thead>
                           <tbody>`
        for (let i = 0; i < data.length; i++){
            context+= `<tr>
                           <td>${i+1}</td>
                           <td>${data[i].name}</td>
                           <td><button class="btn btn-warning" onclick="updateFormCategory(${data[i].id})">Update</button></td>
                           <td><button class="btn btn-danger" onclick="deleteCategory(${data[i].id})">Delete</button></td>
                       </tr>`
        }
        context+= `</tbody> </table> </div>`
        document.getElementById("showCategory").innerHTML = context
    }
    function displayCategoryPage(data){
        let content = `<button class="btn btn-primary" id="backup" onclick="isPreviousCategory(${data.pageable.pageNumber})">Previous</button>
    <span>${data.pageable.pageNumber+1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNextCategory(${data.pageable.pageNumber})">Next</button>`
        document.getElementById('pageCategory').innerHTML = content;
    }
    //hàm lùi page
    function isPreviousCategory(pageNumber) {
        displayCategoryList(pageNumber-1)
    }

    //hàm tiến page
    function isNextCategory(pageNumber) {
        displayCategoryList(pageNumber+1)
    }
    function createFormCategory(){
        $("#nameCategory").val("")
        document.getElementById("titleCategory").innerHTML = "CREATE"
        document.getElementById("actionCategory").setAttribute("onclick", "createCategory()")
        document.getElementById("actionCategory").innerHTML = "Create"
        $("#categoryForm").show()
        $("#menuProduct").hide()
        $("#createFormCategory").hide()
        $("#category").hide()
        $("#product").hide()
    }
    function backToCategory(){
        $("#categoryForm").hide()
        $("#menuCategory").show()
        $("#menuProduct").show()
        $("#category").show()
        $("#createFormCategory").show()
        event.preventDefault()
    }
    function createCategory(){
        let category = {
            name : $("#nameCategory").val(),
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/categories/save",
            type: "POST",
            data: JSON.stringify(category),
            success() {
                alert("Success!")
                document.getElementById("categoryForm").reset()
                displayCategoryList(0)
            }
        })
        event.preventDefault()
    }
    function updateFormCategory(id){
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            url : `http://localhost:8080/categories/${id}`,
            type: "GET",
            success(data) {
                $("#nameCategory").val(data.name)
                document.getElementById("titleCategory").innerHTML = "UPDATE"
                document.getElementById("actionCategory").setAttribute("onclick", `updateCategory(${id})`)
                document.getElementById("actionCategory").innerHTML = "Update"
                $("#categoryForm").show()
                $("#menuProduct").hide()
                $("#createFormCategory").hide()
                $("#category").hide()
                $("#product").hide()
            }
        })
    }
    function updateCategory(id){
        let category = {
            id: id,
            name : $("#nameCategory").val(),
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            contentType: false,
            processData: false,
            url: "http://localhost:8080/categories/save",
            type: "POST",
            data: JSON.stringify(category),
            success() {
                alert("Success!")
                document.getElementById("categoryForm").reset()
                displayCategoryList(0)
            }
        })
        event.preventDefault()
    }
    function deleteCategory(id){
        if (confirm("Do you want to delete ?")){
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                url: `http://localhost:8080/categories/delete/${id}`,
                type: "DELETE",

                success() {
                    alert("Delete successfully!")
                    displayCategoryList(0)
                }
            })
        }
        event.preventDefault()
    }

    //Product
    function displayProductList(page){
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            type: "GET",
            url: "http://localhost:8080/products?page=" + page + "&size=3",
            success(data){
                console.log(data)
                displayProduct(data.content)
                displayProductPage(data)
                if (data.pageable.pageNumber === 0) {
                    document.getElementById("backup").hidden = true
                }
                //điều kiện bỏ nút next
                if (data.pageable.pageNumber + 1 === data.totalPages) {
                    document.getElementById("next").hidden = true
                }
                $("#category").hide()
                $("#product").show()
                $("#createFormCategory").hide()
                $("#createFormProduct").show()
                $("#productForm").hide()
                $("#searchCategory").show()
            }
        })
    }
    function displayProduct(data){
        let context = `<div class="container">
                            <h2 style="text-align: center">List Product</h2>
                            <table class="table table-striped">
                            <thead>
                                <tr>
                                  <th colspan="2" style="text-align: center" >Action</th>     
                                  <th>STT</th>                                                      
                                  <th>Image</th>                                                      
                                  <th>Name</th>                                                    
                                  <th>Price</th>                                                    
                                  <th>Quantity</th>                                                    
                                  <th>Category</th>                                                                                     
                                </tr>
                            </thead>
                           <tbody>`
        for (let i = 0; i < data.length; i++){
            context+= `<tr>
                           <td><button class="btn btn-warning" onclick="updateFormProduct(${data[i].id})">Update</button></td>
                           <td><button class="btn btn-danger" onclick="deleteProduct(${data[i].id})">Delete</button></td>
                           <td>${i+1}</td>
                           <td><img src="${data[i].imagePath}" style="width: 100px; height: 100px" alt="Picture"></td>
                           <td>${data[i].name}</td>
                           <td>${data[i].price}</td>
                           <td>${data[i].quantity}</td>
                           <td>${data[i].category.name}</td
                       </tr>`
        }
        context+= `</tbody> </table> </div>`
        document.getElementById("showProduct").innerHTML = context
    }
    function displayProductPage(data){
        let content = `<button class="btn btn-primary" id="backup" onclick="isPreviousProduct(${data.pageable.pageNumber})">Previous</button>
    <span>${data.pageable.pageNumber+1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNextProduct(${data.pageable.pageNumber})">Next</button>`
        document.getElementById('pageProduct').innerHTML = content;
    }
    //hàm lùi page
    function isPreviousProduct(pageNumber) {
        displayProductList(pageNumber-1)
    }

    //hàm tiến page
    function isNextProduct(pageNumber) {
        displayProductList(pageNumber+1)
    }
    function getCategory(){
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            url : "http://localhost:8080/categories/list",
            type: "GET",
            success(data){
                console.log(data)
                let context = `<label for="categories" class="form-label">Category</label><br>
                                        <select id="categories" class="form-control"  style="width: 25%">`
                for (let i =0; i <data.length; i++){
                    context+=`<option value="${data[i].id}">${data[i].name}</option>`
                }
                context += `</select>`
                document.getElementById("categoryOption").innerHTML = context
            },
        })
    }
    function createFormProduct(){
        document.getElementById("productForm").reset()
        document.getElementById("titleProduct").innerHTML = "CREATE"
        document.getElementById("actionProduct").setAttribute("onclick", "createProduct()")
        document.getElementById("actionProduct").innerHTML = "Create"
        getCategory()
        $("#menuProduct").hide()
        $("#menuCategory").hide()
        $("#product").hide()
        $("#productForm").show()
        $("#searchCategory").hide()
    }
    function createProduct(){
        let category = {
            name : $("#nameProduct").val(),
            price: $("#price").val(),
            quantity: $("#quantity").val(),
            category :{
                id: $("#categories").val()
            },
            imagePath : "",
        }
        let formData = new FormData();
        formData.append("file", $('#file')[0].files[0])
        formData.append("product",
            new Blob([JSON.stringify(category)], {type: 'application/json'}))
        console.log(formData)
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            contentType: false,
            processData: false,
            url: "http://localhost:8080/products/save",
            type: "POST",
            data: formData,
            success() {
                alert("Success!")
                document.getElementById("productForm").reset()
                displayProductList(0)
            }
        })
        event.preventDefault()
    }
    function backToProduct(){
        $("#menuProduct").show()
        $("#menuCategory").show()
        $("#product").show()
        $("#productForm").hide()
        $("#searchCategory").show()
    }
    function updateFormProduct(id){
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            url : `http://localhost:8080/products/${id}`,
            type: "GET",
            success(data) {
                $("#nameProduct").val(data.name)
                $("#price").val(data.price)
                $("#quantity").val(data.quantity)
                getCategory()
                document.getElementById("titleProduct").innerHTML = "UPDATE"
                document.getElementById("actionProduct").setAttribute("onclick", `updateProduct(${id})`)
                document.getElementById("actionProduct").innerHTML = "Update"
                $("#menuProduct").hide()
                $("#menuCategory").hide()
                $("#product").hide()
                $("#productForm").show()
                $("#searchCategory").hide()
            }
        })
    }
    function updateProduct(id){
        let product ={
            id : id,
            name: $("#nameProduct").val(),
            price: $("#price").val(),
            quantity: $("#quantity").val(),
            category: {
                id: $("#categories").val()
            }
        }
        let formData = new FormData();
        formData.append("file", $('#file')[0].files[0])
        formData.append("product",
            new Blob([JSON.stringify(product)], {type: 'application/json'}))
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            contentType: false,
            processData: false,
            url: "http://localhost:8080/products/save",
            type: "POST",
            data: formData,
            success() {
                alert("Success!")
                document.getElementById("productForm").reset()
                displayProductList(0)
            }
        })
        event.preventDefault()
    }
    function deleteProduct(id){
        if (confirm("Do you want to delete ?")){
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                url: `http://localhost:8080/products/delete/${id}`,
                type: "DELETE",

                success() {
                    alert("Delete successfully!")
                    displayProductList(0)
                }
            })
        }
        event.preventDefault()
    }



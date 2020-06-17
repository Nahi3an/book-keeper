
//Book class
class Book{

  constructor(title,author,isbn,issueDate){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.issueDate = issueDate;
    
  }


}

//UI class
class UI{



  alertMessage(msg,className){

    const div = document.createElement('div');

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(msg));

    const parent = document.querySelector('.card-body');

    let beforeSec;

    if(className === 'error'){
       beforeSec = document.querySelector('#form-section');
    }
    else{
       beforeSec = document.querySelector('#table-section');
    }
    

    parent.insertBefore(div,beforeSec);

    setTimeout(function(){
      
      div.remove()

    },3000);


  }



  addBookToTable(book,id){

   const list = document.createElement('tr');
   

   list.className = 'row mx-auto delete';

   
   list.innerHTML =
  `<td class="col-1">${id}</td>
   <td class="col-3">${book.title}</td>
   <td class="col-3">${book.author}</td>
   <td class="col-2">${book.issueDate}</td>
   <td class="col-2">${book.isbn}</td>
   <td class="col-1"><a href="#!"><span class="material-icons">
   remove_circle_outline
   </span></a></td>`;

   
  //  console.log(book.issueDate);

   const tableBody = document.querySelector('#table-body');

   tableBody.appendChild(list);
  
  }

  
  
  clearForm(){
   
    document.querySelector('#title').value = '';
    document.querySelector('#author').value ='';
    document.querySelector('#isbn').value = '';
    document.querySelector('#issue-date').value = ''

  }

  deleteBookFromTable(target){

    const parent = target.parentElement.parentElement.parentElement;
    let length;

    if(parent.classList.contains('delete')){
     

     const node = document.querySelector('#table-body').children;
    
     const array = Array.from(node);
    
     const index = array.indexOf(parent);


    for(let i = index+1; i<array.length;i++){

     let idTxt = array[i].firstChild.textContent;

     const idNum = parseInt(idTxt) - 1;
   
     idTxt =  idNum.toString();

     array[i].firstChild.textContent = idTxt;

    }

     parent.remove();

     length = array.length-1;
     
     
    
    }

    return length;

   
  }

}
let id = 0;
function increase(id){

  let add = id+1;
  return add;

  
}


class LStorage{

  constructor(id){

    this.id = id;
    
  }
  getItemFromLS(){

    let books ;

    if(localStorage.getItem('books')=== null){

      books = [];

    }
    else{

      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;

  }

  addItemToLS(book){

    const books = this.getItemFromLS();

    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));
  }

  displayBooks(){

    const books = this.getItemFromLS();

    books.forEach(function(book){

      const ui = new UI();
      id = increase(id);
      ui.addBookToTable(book,id);
      
  
    })
  }

  removeBooksFromLS(target){

    const books = this.getItemFromLS();
    const isbn = target.parentElement.parentElement.previousElementSibling.textContent;
   
    books.forEach(function(book,index){

      if(book.isbn === isbn){

      console.log(book,index);

      books.splice(index,1);

      } 

    localStorage.setItem('books',JSON.stringify(books));
   
    })

  }

}




document.addEventListener('DOMContentLoaded',function(){


  const local = new LStorage();
  local.displayBooks();

});



const bookFrom = document.querySelector('#book-form');
bookFrom.addEventListener('submit',getBookInfo);
function getBookInfo(e){

  e.preventDefault();

  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value,
        issueDate = document.querySelector('#issue-date').value;
  
  const book = new Book(title,author,isbn,issueDate);

  const ui = new UI();
  const local = new LStorage();


  
  
  if(title===''||author===''||isbn===''||issueDate===''){

    ui.alertMessage('Please Fill Up All The Fields!','error');

  }
  else{
    

    id = increase(id);

    ui.alertMessage('Book Added To The List!','success');
    ui.addBookToTable(book, id);
    ui.clearForm(book);
    local.addItemToLS(book);

    console.log(id);
    

  }

  

}






const tableBody = document.querySelector('#table-body');

tableBody.addEventListener('click',function(e){


const ui = new UI();
const local = new LStorage();

  ui.alertMessage('Item Deleted!','deleted')
  const length = ui.deleteBookFromTable(e.target);  
  id = length;

  local.removeBooksFromLS(e.target);
 
  
})
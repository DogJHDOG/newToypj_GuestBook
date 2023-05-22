const container = document.getElementById('list_things');
const url = 'http://likelion.p-e.kr:8000/guestBook/'; // 수정된 요청 URL

const modal = document.getElementById('modalContainer');
const modalCloseButton = document.getElementById('modalCloseButton');
const modalOpenButton = document.getElementById('btn');

getPostList();

async function getPostList() {

  let deleteList = new Array();

  fetch(url+"postList",{method:'GET'})
    .then(response =>{

       console.log(response)
       return response.json();

       })
    .then(data =>{

      container.innerHTML = '';

      console.log(data.data)
      
      data.data.map((datas,i)=>{
      


        const link_div  = document.createElement('div');
        link_div.id = 'list';

        const delete_btn = document.createElement('button');
        delete_btn.id = 'delete_btn'
        delete_btn.innerText='삭제'
        
        const touch_div  = document.createElement('div');
        touch_div.id = 'touch_list';


        const text_div = document.createElement('div');
        text_div.id = 'text_content';
        
        const title_text = document.createElement('h3');
        title_text.innerText = datas.postName;
        
        const detail_div = document.createElement('div');
        detail_div.id = "detail_list";
        detail_div.style.display = "none";




        text_div.appendChild(title_text);
        



        const author_div = document.createElement('div');
        author_div.id = 'author_content';
        author_div.innerText = datas.authorName;



        const detailTouch_div  = document.createElement('div');
        detailTouch_div.id = 'detail_touch_list';
        
        const detailText_div = document.createElement('div');
        detailText_div.id = 'text_content';
        

        const detailNote_text = document.createElement('div');
        if(datas.postContent!="")detailNote_text.innerText = "note : " + datas.postContent;

        const detailTime_text = document.createElement('div');
        detailTime_text.innerText = "date : " + datas.dateCreated

        detailTouch_div.appendChild(detailText_div);

        // const date = new Date();

        // const year = date.getFullYear();
        // const month = ('0' + (date.getMonth() + 1)).slice(-2);
        // const day = ('0' + date.getDate()).slice(-2);

        // const hours = ('0' + date.getHours()).slice(-2);
        // const minutes = ('0' + date.getMinutes()).slice(-2);
        // const seconds = ('0' + date.getSeconds()).slice(-2);

        // const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        detail_div.appendChild(detailTouch_div);
        detail_div.appendChild(detailNote_text);
        detail_div.appendChild(detailTime_text);        


        touch_div.appendChild(text_div);
        touch_div.appendChild(author_div);
        link_div.appendChild(touch_div);
        link_div.appendChild(delete_btn);
        

        
        container.appendChild(link_div);
        container.appendChild(detail_div);


        deleteList[i] = datas.postId;

        delete_btn.addEventListener('click',()=>{
          deletePostList(deleteList[i]);
        })

        touch_div.addEventListener('click',()=>{
          if(detail_div.style.display=="none"){
            detail_div.style.display = "block";
            touch_div.style.background = "Gainsboro"
          }
          else{
            detail_div.style.display = "none";
            touch_div.style.background = "white"
          }
        })


      })

    })
    .catch(error => {
      // 요청에 실패한 경우 에러 처리
      console.error('Error:', error);
    });



}

async function postCreatePost(){

  const Title_text = document.getElementById('modal_Title').value;
  const author_text = document.getElementById('modal_author').value;
  const content_text = document.getElementById('modal_note').value;

  if(Title_text==""){
    alert("제목을 적어주세요.");
  }
  else if(author_text==""){
    alert("작성자를 적어주세요");
  }
  else{
    fetch(url+'createPost',{method:'POST',
      body: JSON.stringify({
        "authorId":1,
        "authorName":author_text,
        "postName":Title_text,
        "postContent":content_text,
      })
    })

  modal.classList.add('hidden');
  window.location.reload();

  }

}

function deletePostList(i){
    
  console.log(1)
    fetch(url+"posts/"+i, {
        method: 'DELETE',
    })
    .then(response =>{
      console.log(response);
      getPostList();
    })

    
}



modalOpenButton.addEventListener('click',()=>{
  modal.classList.remove('hidden');
})

modalCloseButton.addEventListener('click',()=>{
  modal.classList.add('hidden');
})

